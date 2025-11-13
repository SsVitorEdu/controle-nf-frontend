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
              placeholder="mm/dd/yyyy"
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
             <cv-text-input label="Descrição (Apenas Layout)" disabled v-model.trim="processoModel.descricao" placeholder="Campo não existe no backend" />
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
        <h2>Processos</h2>
        <p>Nesta tabela estão todos os processos cadastrados</p>
        
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
// Importando os Serviços
import ProcessoService from '@/services/ProcessoService';
import SecretariaService from '@/services/SecretariaService';
import FornecedorService from '@/services/FornecedorService';

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

// Estado inicial do formulário (CORRIGIDO para bater com Processo.java)
const getInitialProcessoModel = () => ({
  id: '',
  idProtocolo: '',
  dataSaidaCompras: '',
  secretariaId: '', // (Este campo não existe no backend 'Processo.java', mas está no seu form)
  idFornecedor: '',
  numeroOficio: '',
  numeroProcesso: '',
  descricao: '', // (Este campo não existe no backend 'Processo.java', mas está no seu form)
  tipoProcesso: '',
  idOficio: '' // (Este campo existe no backend, mas não no seu form)
});

export default {
  name: 'ProcessoView',
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
      processoModel: getInitialProcessoModel(),
      processos: [],
       // CORREÇÃO: colunas para bater com Processo.java
      colunasTabela: [
        { key: 'idProcesso', label: 'ID' },
        { key: 'idProtocolo', label: 'ID Protocolo' },
        { key: 'numeroOficio', label: 'Num Ofício' },
        { key: 'numeroProcesso', label: 'Num Processo' },
        { key: 'dataSaidaCompras', label: 'Data' },
        { key: 'tipoProcesso', label: 'Tipo' },
        { key: 'idFornecedor', label: 'ID Fornecedor' },
      ],
      secretarias: [],
      fornecedores: [],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    // Métodos para buscar dados do backend
    async buscarProcessos() {
      try {
        const response = await ProcessoService.buscarTodos();
        // CORREÇÃO: Removido o '.map()' que quebrava.
        // O backend envia dados simples (IDs), e a tabela agora está pronta para eles.
        this.processos = response.data;
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
    
    // Ações dos Botões
    async salvar() {
      try {
        // CORREÇÃO: Este JSON agora bate 100% com o seu Processo.java
        const dadosParaEnviar = {
           idProtocolo: parseInt(this.processoModel.idProtocolo) || null,
           dataSaidaCompras: this.processoModel.dataSaidaCompras || null,
           idFornecedor: parseInt(this.processoModel.idFornecedor) || null,
           numeroOficio: parseInt(this.processoModel.numeroOficio) || null,
           numeroProcesso: parseInt(this.processoModel.numeroProcesso) || null,
           tipoProcesso: this.processoModel.tipoProcesso,
           
           // O seu form não tem 'idOficio', então vamos enviar null.
           idOficio: null 
           
           // 'idSecretaria' e 'descricao' não são enviados pois não existem no Processo.java
        };
        
        await ProcessoService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarProcessos();
      } catch(error) {
        console.error("Erro ao salvar processo:", error);
      }
    },
    limpar() {
      this.processoModel = getInitialProcessoModel();
    },
    async deletar() {
      // (Lógica para o futuro)
    },

    // Ações da Tabela
    handleRowClick(event) {
      const linhaData = event.detail.row;
      console.log("Linha clicada:", linhaData);

      // CORREÇÃO: Mapeamento simples para bater com o backend
      this.processoModel = {
        id: linhaData.idProcesso,
        idProtocolo: linhaData.idProtocolo,
        dataSaidaCompras: linhaData.dataSaidaCompras,
        idFornecedor: linhaData.idFornecedor,
        numeroOficio: linhaData.numeroOficio,
        numeroProcesso: linhaData.numeroProcesso,
        tipoProcesso: linhaData.tipoProcesso,
        idOficio: linhaData.idOficio,

        // Campos do form que não vêm do backend
        secretariaId: '', 
        descricao: ''
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  // 'created' é chamado quando o componente é carregado
  created() {
    this.buscarProcessos();
    this.buscarSecretarias();
    this.buscarFornecedores();
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
  background: #0f62fe; /* Fundo azul IBM Carbon */
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

/* Estilo para ícones em botões tertiary (azuis) */
.btn-icon-tertiary {
  margin-left: 0.5rem;
  fill: #0f62fe; /* Azul IBM Carbon */
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