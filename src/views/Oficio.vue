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
            <cv-text-input label="Protocolo" v-model.trim="oficioModel.idProtocolo" placeholder="Digite o ID do protocolo" />
          </cv-column>
          <cv-column :lg="4">
            <cv-text-input label="Número do ofício" v-model.trim="oficioModel.numeroOficio" placeholder="Digite o número do ofício" />
          </cv-column>
          <cv-column :lg="4">
            <cv-date-picker
              date-label="Data"
              placeholder="mm/dd/yyyy"
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
                {{ sec.nomeSecretaria }}
              </cv-select-option>
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
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Inserir <Add class="btn-icon-tertiary" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
              Limpar <Clean class="btn-icon-tertiary" /> </cv-button>
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
// Importando os Serviços
import OficioService from '@/services/OficioService';
import SecretariaService from '@/services/SecretariaService';

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
  CvSelect,
  CvSelectOption,
  CvButton,
  CvDataTable,
  CvPagination,
  CvLink
} from '@carbon/vue';

// Estado inicial do formulário (CORRIGIDO para bater com Oficio.java)
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
  // Registrando TODOS os componentes
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
      // CORREÇÃO: colunas para bater com Oficio.java
      colunasTabela: [
        { key: 'idOficio', label: 'ID' },
        { key: 'idProtocolo', label: 'ID Protocolo' },
        { key: 'dataOficio', label: 'Data' },
        { key: 'numeroOficio', label: 'Número' },
        { key: 'idSecretaria', label: 'ID Secretaria' }, 
        { key: 'descricao', label: 'Descrição' },
      ],
      secretarias: [],
      totalDeItens: 0,
      tamanhoPagina: 100 
    };
  },
  methods: {
    async buscarOficios() {
      try {
        const response = await OficioService.buscarTodos();
        // CORREÇÃO: Removido o '.map()' que quebrava
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
    
    async salvar() {
      try {
        // CORREÇÃO: Este JSON agora bate 100% com o seu Oficio.java
        const dadosParaEnviar = {
           idProtocolo: parseInt(this.oficioModel.idProtocolo) || null,
           numeroOficio: parseInt(this.oficioModel.numeroOficio) || null,
           dataOficio: this.oficioModel.dataOficio || null,
           descricao: this.oficioModel.descricao,
           idSecretaria: parseInt(this.oficioModel.idSecretaria) || null
        };
        
        await OficioService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarOficios();
      } catch(error) {
        console.error("Erro ao salvar ofício:", error);
      }
    },
    limpar() {
      this.oficioModel = getInitialOficioModel();
    },
    async deletar() {
      // (Lógica para o futuro)
    },

    handleRowClick(event) {
      const linhaData = event.detail.row;
      console.log("Linha clicada:", linhaData);
      
      // CORREÇÃO: Mapeamento simples para bater com o backend
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
  }
};
</script>

<style scoped>
/* 4. Estilos do Figma (Fundo Azul e Caixa Branca) */
.page-container-blue {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinhar no topo */
  min-height: 100vh;
  padding: 2rem;
  background: #0f62fe; /* Fundo azul IBM Carbon */
  box-sizing: border-box; /* Garantir que o padding não estoure a tela */
}

.content-box {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1400px; /* Mais largo para o CRUD */
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

/* Espaçamento entre as linhas da grid */
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
  /* A tabela não fica dentro de uma caixa branca no Figma */
}

cv-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

/* Estilo específico para ícones em botões tertiary (azuis) */
.btn-icon-tertiary {
  margin-left: 0.5rem;
  fill: #0f62fe; /* Azul IBM Carbon */
}
</style>