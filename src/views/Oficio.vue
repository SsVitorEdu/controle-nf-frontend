<template>
  <div class="page-container-blue">
    <div class="content-box">
      
      <div class="header-container">
        <h1 class="page-title">Cadastro de Ofício</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid>
        <cv-row>
          <cv-column :lg="4">
             <cv-select label="Protocolo" v-model="oficioModel.idProtocolo">
              <cv-select-option disabled selected hidden value="">
                Selecione um protocolo
              </cv-select-option>
              <cv-select-option v-for="proto in protocolos" :key="proto.idProtocolo" :value="proto.idProtocolo">
                {{ proto.numeroProtocolo }}
              </cv-select-option>
            </cv-select>
          </cv-column>
          
          <cv-column :lg="4">
            <cv-text-input label="Número do ofício" v-model.trim="oficioModel.numeroOficio" placeholder="Digite o número do ofício" />
          </cv-column>
          <cv-column :lg="4">
            <cv-date-picker
              date-label="Data"
              placeholder="dd/MM/yyyy"
              v-model="oficioModel.dataOficio" 
            />
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column :lg="4">
            <cv-text-input label="Descrição" v-model.trim="oficioModel.descricao" placeholder="Digite a descrição" />
          </cv-column>
          <cv-column :lg="4">
            <cv-select label="Secretaria" v-model="oficioModel.idSecretaria">
              <cv-select-option disabled selected hidden value="">
                Selecione uma secretaria
              </cv-select-option>
              <cv-select-option v-for="sec in secretarias" :key="sec.idSecretaria" :value="sec.idSecretaria">
                {{ sec.nomeSecretaria }} </cv-select-option>
            </cv-select>
          </cv-column>
          <cv-column :lg="4">
            <cv-text-input label="ID" v-model="oficioModel.id" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
        </cv-row>
      </cv-grid>

     <cv-grid class="button-grid">
        <cv-row>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="primary" @click="salvar">
              Inserir <Add class="btn-icon" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="primary" @click="limpar">
              Limpar <Clean class="btn-icon" /> </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="ghost" disabled>
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
        <h2>Ofícios</h2>
        <p>Nesta tabela estão todos os ofícios cadastrados</p>
        
        <cv-data-table
          :columns="colunasTabela"
          :data="oficios"
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
import OficioService from '@/services/OficioService';
import SecretariaService from '@/services/SecretariaService';
import ProtocoloService from '@/services/ProtocoloService';
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

const getInitialOficioModel = () => ({
  id: '',
  idProtocolo: '',
  numeroOficio: '',
  dataOficio: '',
  descricao: '',
  idSecretaria: '' 
});

export default {
  name: 'OficioView',
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
      oficioModel: getInitialOficioModel(),
      oficios: [],
      colunasTabela: [
        { key: 'idOficio', label: 'ID' },
        { key: 'idProtocolo', label: 'ID Protocolo' },
        { key: 'dataOficio', label: 'Data' },
        { key: 'numeroOficio', label: 'Número' },
        { key: 'idSecretaria', label: 'ID Secretaria' }, 
        { key: 'descricao', label: 'Descrição' },
      ],
      secretarias: [],
      protocolos: [],
      totalDeItens: 0,
      tamanhoPagina: 100 
    };
  },
  methods: {
    async buscarOficios() {
      try {
        const response = await OficioService.buscarTodos();
        this.oficios = response.data;
        this.totalDeItens = this.oficios.length;
      } catch (error) {
        console.error('Erro ao buscar ofícios:', error);
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
    
    async buscarProtocolos() {
      try {
        const response = await ProtocoloService.buscarTodos();
        this.protocolos = response.data;
      } catch (error) {
        console.error('Erro ao buscar protocolos:', error);
      }
    },
    
    async salvar() {
      try {
        if (!this.oficioModel.idProtocolo) {
          alert('O campo "Protocolo" é obrigatório.');
          return; 
        }
        if (!this.oficioModel.numeroOficio) {
          alert('O campo "Número do ofício" é obrigatório.');
          return; 
        }
        if (!this.oficioModel.dataOficio) {
          alert('O campo "Data" é obrigatório.');
          return; 
        }
        if (!this.oficioModel.descricao) {
          alert('O campo "Descrição" é obrigatório.');
          return; 
        }
        if (!this.oficioModel.idSecretaria) {
          alert('O campo "Secretaria" é obrigatório.');
          return; 
        }

        const dadosParaEnviar = {
           idProtocolo: parseInt(this.oficioModel.idProtocolo) || null,
           numeroOficio: parseInt(this.oficioModel.numeroOficio) || null,
           dataOficio: this.oficioModel.dataOficio || null,
           descricao: this.oficioModel.descricao,
           idSecretaria: parseInt(this.oficioModel.idSecretaria) || null
        };
        
        await OficioService.inserir(dadosParaEnviar);
        alert('Ofício inserido com sucesso!');
        this.limpar();
        this.buscarOficios();
      } catch(error) {
        console.error("Erro ao salvar ofício:", error);
        if (error.response) {
            alert(`Não foi possível salvar. O servidor retornou um erro ${error.response.status}.`);
        } else {
            alert('Não foi possível salvar. Verifique sua conexão com o servidor.');
        }
      }
    },
    
    limpar() {
      this.oficioModel = getInitialOficioModel();
    },
    async deletar() {
    },

    handleRowClick(event) {
      const linhaData = event.detail.row;
      this.oficioModel = {
        id: linhaData.idOficio,
        idProtocolo: linhaData.idProtocolo,
        numeroOficio: linhaData.numeroOficio,
        dataOficio: linhaData.dataOficio,
        descricao: linhaData.descricao,
        idSecretaria: linhaData.idSecretaria
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  created() {
    this.buscarOficios();
    this.buscarSecretarias();
    this.buscarProtocolos(); 
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
  border-bottom: 1px solid #e0e0eC;
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
</style>