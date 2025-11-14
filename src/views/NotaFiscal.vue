<template>
  <div class="page-container-blue">
    <div class="content-box">
      
      <div class="header-container">
        <h1 class="page-title">Cadastro de Nota fiscal</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid>
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="ID do Protocolo" v-model.trim="nfModel.idProtocolo" placeholder="Digite o ID do protocolo" />
          </cv-column>
          <cv-column :lg="3">
             <cv-date-picker
              date-label="Data do protocolo"
              placeholder="dd/MM/yyyy"
              v-model="nfModel.dataProtocolo"
              disabled 
            />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data de chegada"
              placeholder="dd/MM/yyyy"
              v-model="nfModel.dataChegada"
            />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="Valor da nota" v-model.trim="nfModel.valorNota" placeholder="Digite o valor da nota" />
          </cv-column>
        </cv-row>
        
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Número da nota" v-model.trim="nfModel.numeroNota" placeholder="Digite o número da nota" />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data da nota (Emissão)"
              placeholder="dd/MM/yyyy"
              v-model="nfModel.dataEmissao"
            />
          </cv-column>
          <cv-column :lg="3">
             <cv-select label="Processo" v-model="nfModel.idProcesso">
              <cv-select-option disabled selected hidden value="">
                Selecione um processo
              </cv-select-option>
              <cv-select-option v-for="proc in processos" :key="proc.idProcesso" :value="proc.idProcesso">
                {{ proc.numeroProcesso }} </cv-select-option>
            </cv-select>
          </cv-column>
          <cv-column :lg="3">
             <cv-text-input label="ID do Fornecedor" v-model.trim="nfModel.idFornecedor" placeholder="Digite o ID do fornecedor" />
          </cv-column>
        </cv-row>
        
        <cv-row>
           <cv-column :lg="3">
            <cv-text-input label="ID da Nota Fiscal" v-model="nfModel.id" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
        </cv-row>
        </cv-grid>

      <cv-grid class="button-grid">
        <cv-row>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Inserir <Add class="btn-icon-tertiary" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
              Limpar <Clean class="btn-icon-tertiary" /> </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="ghost" @click="deletar">
              Deletar <TrashCan class="btn-icon" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="ghost" disabled>
              Alterar <Edit class="btn-icon" />
            </cv-button>
          </cv-column>
        </cv-row>
      </cv-grid>

      <div class="table-container">
        <h2>Notas Fiscais Cadastradas</h2>
        <p>Nesta tabela estão todas as notas fiscais cadastrados</p>
        
        <cv-data-table
          :columns="colunasTabela"
          :data="notasFiscais"
          @row-click="handleRowClick"
        >
        </cv-data-table>
        
        <cv-pagination
          :number-of-items="totalDeItens"
          :page-size-options="[100]"
          :page-sizes="[100]"
          :value="1"
          v-model:page-size="tamanhoPagina"
          @change="handlePageChange"
        >
        </cv-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import NFService from '@/services/NFService';
import ProcessoService from '@/services/ProcessoService';
import Add from '@carbon/icons-vue/es/add/32';
import Clean from '@carbon/icons-vue/es/clean/32';
import TrashCan from '@carbon/icons-vue/es/trash-can/32';
import Edit from '@carbon/icons-vue/es/edit/32';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/32';
import {
  CvGrid,
  CvRow,
  CvColumn,
  CvTextInput,
  CvDatePicker,
  CvSelect,         
  CvSelectOption,   
  CvButton,
  CvDataTable,
  CvPagination,
  CvLink
} from '@carbon/vue';
const getInitialNFModel = () => ({
  id: '',
  idProtocolo: '',
  dataProtocolo: '', 
  dataChegada: '',
  valorNota: '',
  numeroNota: '',
  dataEmissao: '',
  idProcesso: '',
  idFornecedor: '' 
});

export default {
  name: 'NotaFiscalView',
  components: {
    Add, Clean, TrashCan, Edit, ArrowLeft,
    CvGrid,
    CvRow,
    CvColumn,
    CvTextInput,
    CvDatePicker,
    CvSelect,         
    CvSelectOption,  
    CvButton,
    CvDataTable,
    CvPagination,
    CvLink
  },
  data() {
    return {
      nfModel: getInitialNFModel(),
      notasFiscais: [],
      processos: [], 
      colunasTabela: [
        { key: 'idNotaFiscal', label: 'ID' },
        { key: 'dataChegada', label: 'Data de chegada' },
        { key: 'idProtocolo', label: 'ID Protocolo' },
        { key: 'numeroNota', label: 'Número da nota' },
        { key: 'valorNota', label: 'Valor da nota' },
        { key: 'dataEmissao', label: 'Data da nota (Emissão)' },
        { key: 'idProcesso', label: 'ID Processo' },
        { key: 'idFornecedor', label: 'ID Fornecedor' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    async buscarNotasFiscais() {
      try {
        const response = await NFService.buscarTodas();
        this.notasFiscais = response.data;
        this.totalDeItens = this.notasFiscais.length;
      } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
      }
    },
    async buscarProcessos() {
      try {
        const response = await ProcessoService.buscarTodos();
        this.processos = response.data;
      } catch (error) {
        console.error('Erro ao buscar processos:', error);
      }
    }, 
    async salvar() {

      if (!this.nfModel.idProcesso || !this.nfModel.idFornecedor) {
        alert('Por favor, preencha pelo menos o ID do Processo e o ID do Fornecedor.');
        return;
      }

      try {
        const dadosParaEnviar = {
           idProtocolo: parseInt(this.nfModel.idProtocolo) || null,
           dataChegada: this.nfModel.dataChegada || null,
           valorNota: parseFloat(this.nfModel.valorNota) || null,
           numeroNota: parseInt(this.nfModel.numeroNota) || null,
           dataEmissao: this.nfModel.dataEmissao || null,
           idProcesso: parseInt(this.nfModel.idProcesso) || null,
           idFornecedor: parseInt(this.nfModel.idFornecedor) || null
        };
        
        await NFService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarNotasFiscais();
      } catch(error) {
        console.error("Erro ao salvar nota fiscal:", error);
      }
    },
    limpar() {
      this.nfModel = getInitialNFModel();
    },
    async deletar() {
      if (!this.nfModel.id) {
        alert('Por favor, clique em uma nota fiscal na tabela para deletar.');
        return;
      }
      try {
        await NFService.deletar(this.nfModel.id);
        this.limpar();
        this.buscarNotasFiscais();
      } catch(error) {
        console.error("Erro ao deletar nota fiscal:", error);
      }
    },
    handleRowClick(event) {
      const linhaData = event.detail.row;
      console.log("Linha clicada:", linhaData);

      this.nfModel = {
        id: linhaData.idNotaFiscal,
        idProtocolo: linhaData.idProtocolo,
        dataChegada: linhaData.dataChegada,
        valorNota: linhaData.valorNota,
        numeroNota: linhaData.numeroNota,
        dataEmissao: linhaData.dataEmissao,
        idProcesso: linhaData.idProcesso,
        idFornecedor: linhaData.idFornecedor,
        
        dataProtocolo: '' 
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  created() {
    this.buscarNotasFiscais();
    this.buscarProcessos();
  }
};
</script>

<style scoped>
.page-container-blue {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2rem;
  background: #0f62fe;
  box-sizing: border-box;
}

.content-box {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1400px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.page-title {
  font-weight: 400;
  color: #161616;
}

.back-link {
  text-decoration: none;
}

.back-icon {
  margin-left: 0.5rem;
  fill: #0f62fe;
}

cv-row {
  margin-bottom: 1rem;
}

.button-grid {
  margin-top: 1.5rem;
}

.btn-full-width {
  width: 100%;
}

.btn-icon {
  margin-left: 0.5rem;
}

.btn-icon-tertiary {
  margin-left: 0.5rem;
  fill: #0f62fe;
}

.table-container {
  margin-top: 3rem;
}

cv-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>