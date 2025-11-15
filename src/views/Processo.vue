<template>
  <div class="page-container-blue">
    <div class="content-box">
      
      <div class="header-container">
        <h1 class="page-title">Cadastro de Processo</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid>
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Protocolo do ofício" v-model.trim="processoModel.idProtocolo" placeholder="Digite o ID do protocolo" />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data do processo"
              placeholder="dd/MM/yyyy"
              v-model="processoModel.dataSaidaCompras"
            />
          </cv-column>
          <cv-column :lg="3">
            <cv-select label="Secretaria" v-model="processoModel.secretariaId">
              <cv-select-option disabled selected hidden value="">
                Selecione uma secretaria
              </cv-select-option>
              <cv-select-option v-for="sec in secretarias" :key="sec.idSecretaria" :value="sec.idSecretaria">
                {{ sec.nomeSecretaria }}
              </cv-select-option>
            </cv-select>
          </cv-column>
          <cv-column :lg="3">
            <cv-select label="Fornecedor" v-model="processoModel.idFornecedor">
              <cv-select-option disabled selected hidden value="">
                Selecione um fornecedor
              </cv-select-option>
              <cv-select-option v-for="forn in fornecedores" :key="forn.idFornecedor" :value="forn.idFornecedor">
                {{ forn.nomeEmpresa }}
              </cv-select-option>
            </cv-select>
          </cv-column>
        </cv-row>
        
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Número do ofício" v-model.trim="processoModel.numeroOficio" placeholder="Digite o número do ofício" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="Número do Processo" v-model.trim="processoModel.numeroProcesso" placeholder="Digite o número do processo" />
          </cv-column>
          <cv-column :lg="3">
             <cv-text-input label="Descrição" v-model.trim="processoModel.descricao" placeholder="A descrição aparecerá aqui" />
          </cv-column>
          <cv-column :lg="3">
             <cv-select label="Tipo" v-model="processoModel.tipoProcesso">
              <cv-select-option disabled selected hidden value="">
                Selecione um tipo
              </cv-select-option>
              <cv-select-option value="Tipo 1">Tipo 1</cv-select-option>
              <cv-select-option value="Tipo 2">Tipo 2</cv-select-option>
            </cv-select>
          </cv-column>
        </cv-row>
      </cv-grid>

      <cv-grid class="button-grid">
        <cv-row>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Inserir <Add class="btn-icon" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
              Limpar <Clean class="btn-icon" /> </cv-button>
          </cv-column>
          <cv-column :lg="3">
             <cv-button class="btn-full-width deletar" kind="ghost" @click="deletar" disabled>
              Deletar <TrashCan class="btn-icon alterar" />
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
        <h2 class="titulo">Processos</h2>
        <p class="frase">Nesta tabela estão todos os processos cadastrados</p>
        
        <cv-data-table
          :columns="colunasTabela"
          :data="processos"
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

import ProcessoService from '@/services/ProcessoService';
import SecretariaService from '@/services/SecretariaService';
import FornecedorService from '@/services/FornecedorService';
import Add from '@carbon/icons-vue/es/add/20';
import Clean from '@carbon/icons-vue/es/clean/20';
import TrashCan from '@carbon/icons-vue/es/trash-can/20';
import Edit from '@carbon/icons-vue/es/edit/20';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/16';

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

const getInitialProcessoModel = () => ({
  id: '',
  idProtocolo: '',
  dataSaidaCompras: '',
  secretariaId: '',
  idFornecedor: '',
  numeroOficio: '',
  numeroProcesso: '',
  descricao: '',
  tipoProcesso: '',
  idOficio: '' 
});

export default {
  name: 'ProcessoView',
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
      processoModel: getInitialProcessoModel(),
      processos: [],
      colunasTabela: [
        { key: 'protocolo', label: 'Id Protocolo' },
        { key: 'numeroOficio', label: 'Número do ofício' },
        { key: 'numeroProcesso', label: 'Número do processo' },
        { key: 'data', label: 'Data' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'fornecedor', label: 'Fornecedor' },
      ],
      secretarias: [],
      fornecedores: [],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    // Em methods:
    async buscarProcessos() {
      try {
        const response = await ProcessoService.buscarTodos();
        const processosApi = response.data; // Array de objetos 'proc'

        // 1. Criar o mapa de Fornecedores (ID -> Nome da Empresa)
        // Isso agora funciona, pois o created() foi corrigido
        const mapaFornecedores = this.fornecedores.reduce((acc, forn) => {
          acc[forn.idFornecedor] = forn.nomeEmpresa;
          return acc;
        }, {});

        // 2. Mapear os processos para a tabela
        this.processos = processosApi.map(proc => {
          const idForn = proc.idFornecedor;

          return {

            protocolo: proc.idProtocolo,
            numeroOficio: proc.numeroOficio,
            numeroProcesso: proc.numeroProcesso,
            data: proc.dataSaidaCompras,
            tipo: proc.tipoProcesso,


            fornecedor: mapaFornecedores[idForn] || `ID ${idForn} (não encontrado)`,

          };
        });

        this.totalDeItens = this.processos.length;
      } catch (error) {
        console.error('Erro ao buscar processos:', error);
      }
    },
    async buscarSecretarias() {
      try {
        const response = await SecretariaService.buscarTodas();
        this.secretarias = response.data;
      } catch (error) {
        console.error('Erro ao buscar secretarias:', error);
      }
    },
    async buscarFornecedores() {
      try {
        const response = await FornecedorService.buscarTodos();
        this.fornecedores = response.data;
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    },
    async salvar() {
      try {
        
        if (!this.processoModel.idProtocolo) {
          alert('O campo "Protocolo do ofício" é obrigatório.');
          return; 
        }
        if (!this.processoModel.dataSaidaCompras) {
          alert('O campo "Data do processo" é obrigatória.');
          return; 
        }
        if (!this.processoModel.idFornecedor) 
          alert('O campo "Fornecedor" é obrigatório.');
          return; 
        
        if (!this.processoModel.numeroOficio) {
          alert('O campo "Número do ofício" é obrigatório.');
          return; 
        }
        if (!this.processoModel.numeroProcesso) {
          alert('O campo "Número do Processo" é obrigatório.');
          return; 
        }
        if (!this.processoModel.tipoProcesso) {
          alert('O campo "Tipo" é obrigatório.');
          return; 
        }

        
        const dadosParaEnviar = {
           idProtocolo: parseInt(this.processoModel.idProtocolo) || null,
           dataSaidaCompras: this.processoModel.dataSaidaCompras || null,
           idFornecedor: parseInt(this.processoModel.idFornecedor) || null,
           numeroOficio: parseInt(this.processoModel.numeroOficio) || null,
           numeroProcesso: parseInt(this.processoModel.numeroProcesso) || null,
           tipoProcesso: this.processoModel.tipoProcesso,
           idOficio: null 
        };
        
        await ProcessoService.inserir(dadosParaEnviar);
        
        alert('Processo inserido com sucesso!'); 
        
        this.limpar();
        this.buscarProcessos();
        
      } catch(error) {
        console.error("Erro ao salvar processo:", error);
          if (error.response) {
            alert(`Não foi possível salvar. O servidor retornou um erro ${error.response.status}.`);
        } else {
            alert('Não foi possível salvar. Verifique sua conexão com o servidor.');
        }
      }
    },
    
    limpar() {
      this.processoModel = getInitialProcessoModel();
    },
    
    async deletar() {
      if (!this.processoModel.id) {
        alert('Por favor, clique em um processo na tabela para deletar.');
        return;
      }
      try {
        await ProcessoService.deletar(this.processoModel.id);
        alert('Processo deletado com sucesso!'); 
        this.limpar();
        this.buscarProcessos();
      } catch(error) {
        console.error("Erro ao deletar processo:", error);
        if (error.response) {
            alert(`Não foi possível deletar. O servidor retornou um erro ${error.response.status}.`);
        } else {
            alert('Não foi possível deletar. Verifique sua conexão com o servidor.');
        }
      }
    },

    handleRowClick(event) {
      const linhaData = event.detail.row;
      console.log("Linha clicada:", linhaData);

      this.processoModel = {
        id: linhaData.idProcesso, 
        idProtocolo: linhaData.idProtocolo,
        dataSaidaCompras: linhaData.dataSaidaCompras,
        idFornecedor: linhaData.idFornecedor,
        numeroOficio: linhaData.numeroOficio,
        numeroProcesso: linhaData.numeroProcesso,
        tipoProcesso: linhaData.tipoProcesso,
        idOficio: linhaData.idOficio,
        secretariaId: '', 
        descricao: ''
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  async created() {
    await this.buscarSecretarias();
    await this.buscarFornecedores();


    await this.buscarProcessos();
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

.table-container {
  margin-top: 3rem;
}

cv-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.titulo, .frase{
  background-color: #F4F4F4;
  margin-bottom: 0;
}

.titulo {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px
}

.frase {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

button{
  padding: 10px;
}

.deletar:enabled .alterar:enabled{
  border: 1px solid #0f62fe;
}

.btn-full-width:hover .btn-icon-tertiary {
  fill: #FFFFFF;
}

.btn-full-width:disabled{
  border: 1px solid #C6C6C6;
}
</style>