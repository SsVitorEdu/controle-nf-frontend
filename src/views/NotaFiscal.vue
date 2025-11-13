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
            <cv-text-input label="Protocolo da nota" v-model.trim="nfModel.idProtocolo" placeholder="Digite o ID do protocolo" />
          </cv-column>
          <cv-column :lg="3">
             <cv-date-picker
              date-label="Data do protocolo"
              placeholder="mm/dd/yyyy"
              v-model="nfModel.dataProtocolo"
            />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data de chegada"
              placeholder="mm/dd/yyyy"
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
              date-label="Data da nota"
              placeholder="mm/dd/yyyy"
              v-model="nfModel.dataEmissao"
            />
          </cv-column>
          <cv-column :lg="3">
             <cv-text-input label="Número do Processo" v-model.trim="nfModel.idProcesso" placeholder="Digite o ID do processo" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="ID" v-model="nfModel.id" disabled placeholder="O ID aparecerá aqui" />
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
        <h2>Processos</h2> <p>Nesta tabela estão todas as notas fiscais cadastrados</p>
        
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
// Importando os Serviços
import NFService from '@/services/NFService';

// Importando Ícones
import Add from '@carbon/icons-vue/es/add/32';
import Clean from '@carbon/icons-vue/es/clean/32';
import TrashCan from '@carbon/icons-vue/es/trash-can/32';
import Edit from '@carbon/icons-vue/es/edit/32';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/32';

// Importando TODOS os componentes Carbon que usamos
import {
  CvGrid,
  CvRow,
  CvColumn,
  CvTextInput,
  CvDatePicker,
  CvButton,
  CvDataTable,
  CvPagination,
  CvLink
} from '@carbon/vue';

// Estado inicial do formulário (Alinhado com o formulário do Figma)
const getInitialNFModel = () => ({
  id: '',
  idProtocolo: '',
  dataProtocolo: '', // (Só existe no Figma)
  dataChegada: '',
  valorNota: '',
  numeroNota: '',
  dataEmissao: '',
  idProcesso: '',
  idFornecedor: '' // (Existe no NF.java, mas não no Figma)
});

export default {
  name: 'NotaFiscalView',
  // Registrando TODOS os componentes
  components: {
    Add, Clean, TrashCan, Edit, ArrowLeft,
    CvGrid,
    CvRow,
    CvColumn,
    CvTextInput,
    CvDatePicker,
    CvButton,
    CvDataTable,
    CvPagination,
    CvLink
  },
  data() {
    return {
      nfModel: getInitialNFModel(),
      notasFiscais: [],
      // CORREÇÃO: Colunas alinhadas com os campos do NF.java
      colunasTabela: [
        { key: 'idNotaFiscal', label: 'ID' },
        { key: 'dataChegada', label: 'Data de chegada' },
        { key: 'idProtocolo', label: 'ID Protocolo' },
        { key: 'numeroNota', label: 'Número da nota' },
        { key: 'valorNota', label: 'Valor da nota' },
        { key: 'dataEmissao', label: 'Data da nota' },
        { key: 'idProcesso', label: 'ID Processo' },
        { key: 'idFornecedor', label: 'ID Fornecedor' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    // Métodos para buscar dados do backend
    async buscarNotasFiscais() {
      try {
        // CORREÇÃO: Removido o '.map()' que quebrava a lógica.
        // O backend envia os dados simples, e a tabela agora está pronta para recebê-los.
        const response = await NFService.buscarTodas();
        this.notasFiscais = response.data;
        this.totalDeItens = this.notasFiscais.length;
      } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
      }
    },
    
    // Ações dos Botões
    async salvar() {
      try {
        // O JSON deve bater EXATAMENTE com o NF.java
        const dadosParaEnviar = {
           idProtocolo: parseInt(this.nfModel.idProtocolo) || null,
           dataChegada: this.nfModel.dataChegada || null,
           valorNota: parseFloat(this.nfModel.valorNota) || null,
           numeroNota: parseInt(this.nfModel.numeroNota) || null,
           dataEmissao: this.nfModel.dataEmissao || null,
           idProcesso: parseInt(this.nfModel.idProcesso) || null,
           // O Figma não tem 'idFornecedor', então pegamos do 'nfModel'
           // (que pode ser preenchido pelo clique na tabela)
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

    // Ações da Tabela
    handleRowClick(event) {
      const linhaData = event.detail.row;
      console.log("Linha clicada:", linhaData);
      
      // CORREÇÃO: Mapeamento simplificado para ler os IDs simples do backend
      this.nfModel = {
        id: linhaData.idNotaFiscal,
        idProtocolo: linhaData.idProtocolo,
        dataChegada: linhaData.dataChegada,
        valorNota: linhaData.valorNota,
        numeroNota: linhaData.numeroNota,
        dataEmissao: linhaData.dataEmissao,
        idProcesso: linhaData.idProcesso,
        idFornecedor: linhaData.idFornecedor,
        
        // (Campos que só existem no formulário do Figma)
        dataProtocolo: ''
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  // 'created' é chamado quando o componente é carregado
  created() {
    this.buscarNotasFiscais();
  }
};
</script>

<style scoped>
/* Estilos do Figma (Idênticos ao Oficio.vue) */
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