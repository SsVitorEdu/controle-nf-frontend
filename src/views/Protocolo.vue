<template>
  <div class="page-container-blue">
    <div class="content-box">
      
      <div class="header-container">
        <h1 class="page-title">Cadastro de Protocolo</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid>
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Número do Protocolo" v-model.trim="protocoloModel.numeroProtocolo" placeholder="Digite o número" />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data do Protocolo"
              placeholder="dd/MM/yyyy"
              v-model="protocoloModel.dataProtocolo"
            />
          </cv-column>
          <cv-column :lg="2">
            <cv-text-input label="ID do Ofício" v-model.trim="protocoloModel.idOficio" placeholder="ID (opcional)" />
          </cv-column>
          <cv-column :lg="2">
            <cv-text-input label="ID do Processo" v-model.trim="protocoloModel.idProcesso" placeholder="ID (opcional)" />
          </cv-column>
           <cv-column :lg="2">
            <cv-text-input label="ID da Nota" v-model.trim="protocoloModel.idNota" placeholder="ID (opcional)" />
          </cv-column>
        </cv-row>
         <cv-row>
           <cv-column :lg="3">
            <cv-text-input label="ID" v-model="protocoloModel.idProtocolo" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
         </cv-row>
      </cv-grid>

     <cv-grid class="button-grid">
        <cv-row>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Inserir <Add class="btn-icon-tertiary" />
            </cv-button>
          </cv-column>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
              Limpar <Clean class="btn-icon-tertiary" /> </cv-button>
          </cv-column>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="ghost" @click="deletar">
              Deletar <TrashCan class="btn-icon" />
            </cv-button>
          </cv-column>
        </cv-row>
      </cv-grid>

      <div class="table-container">
        <h2>Protocolos</h2>
        <p>Nesta tabela estão todos os protocolos cadastrados</p>
        
        <cv-data-table
          :columns="colunasTabela"
          :data="protocolos"
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
import ProtocoloService from '@/services/ProtocoloService';
import Add from '@carbon/icons-vue/es/add/32';
import Clean from '@carbon/icons-vue/es/clean/32';
import TrashCan from '@carbon/icons-vue/es/trash-can/32';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/32';

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
const getInitialProtocoloModel = () => ({
  idProtocolo: '',
  numeroProtocolo: '',
  dataProtocolo: '',
  idProcesso: '',
  idOficio: '',
  idNota: ''
});

export default {
  name: 'ProtocoloView',
  components: {
    Add, Clean, TrashCan, ArrowLeft,
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
      protocoloModel: getInitialProtocoloModel(),
      protocolos: [],
      colunasTabela: [
        { key: 'idProtocolo', label: 'ID' },
        { key: 'numeroProtocolo', label: 'Número' },
        { key: 'dataProtocolo', label: 'Data' },
        { key: 'idOficio', label: 'ID Ofício' },
        { key: 'idProcesso', label: 'ID Processo' },
        { key: 'idNota', label: 'ID Nota' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100 
    };
  },
  methods: {
    async buscarProtocolos() {
      try {
        const response = await ProtocoloService.buscarTodos();
        this.protocolos = response.data;
        this.totalDeItens = this.protocolos.length;
      } catch (error) {
        console.error('Erro ao buscar protocolos:', error);
      }
    },
    
    async salvar() {
      try {
        const dadosParaEnviar = {
           numeroProtocolo: parseInt(this.protocoloModel.numeroProtocolo) || null,
           dataProtocolo: this.protocoloModel.dataProtocolo || null,
           idProcesso: parseInt(this.protocoloModel.idProcesso) || null,
           idOficio: parseInt(this.protocoloModel.idOficio) || null,
           idNota: parseInt(this.protocoloModel.idNota) || null
        };
        
        await ProtocoloService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarProtocolos();
      } catch(error) {
        console.error("Erro ao salvar protocolo:", error);
      }
    },
    limpar() {
      this.protocoloModel = getInitialProtocoloModel();
    },
    async deletar() {
      if (!this.protocoloModel.idProtocolo) {
        alert('Selecione um protocolo na tabela para deletar.');
        return;
      }
      try {
        await ProtocoloService.deletar(this.protocoloModel.idProtocolo);
        this.limpar();
        this.buscarProtocolos();
      } catch(error) {
        console.error("Erro ao deletar protocolo:", error);
      }
    },

    handleRowClick(event) {
      const linhaData = event.detail.row;
      this.protocoloModel = {
        idProtocolo: linhaData.idProtocolo,
        numeroProtocolo: linhaData.numeroProtocolo,
        dataProtocolo: linhaData.dataProtocolo,
        idProcesso: linhaData.idProcesso,
        idOficio: linhaData.idOficio,
        idNota: linhaData.idNota
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  created() {
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