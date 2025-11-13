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
            <cv-text-input label="Protocolo do ofício" v-model.trim="processoModel.protocoloOficio" placeholder="Digite o protocolo" />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data do processo"
              placeholder="mm/dd/yyyy"
              v-model="processoModel.dataProcesso"
            />
          </cv-column>
          <cv-column :lg="3">
            <cv-select label="Secretaria" v-model="processoModel.secretariaId">
              <cv-select-option disabled selected hidden value="">
                Selecione uma secretaria
              </cv-select-option>
              <cv-select-option v-for="sec in secretarias" :key="sec.idSecretaria" :value="sec.idSecretaria">
                {{ sec.nome }}
              </cv-select-option>
            </cv-select>
          </cv-column>
          <cv-column :lg="3">
            <cv-select label="Fornecedor" v-model="processoModel.fornecedorId">
              <cv-select-option disabled selected hidden value="">
                Selecione um fornecedor
              </cv-select-option>
              <cv-select-option v-for="forn in fornecedores" :key="forn.idFornecedor" :value="forn.idFornecedor">
                {{ forn.nome }}
              </cv-select-option>
            </cv-select>
          </cv-column>
        </cv-row>
        
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Número do ofício" v-model.trim="processoModel.numeroOficio" placeholder="Digite o número do ofício" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="Número do Processo" v-model.trim="processoModel.numeroProcesso" placeholder="Digite a descrição" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="Descrição" v-model.trim="processoModel.descricao" placeholder="A descrição aparecerá aqui" />
          </cv-column>
          <cv-column :lg="3">
            <cv-select label="Tipo" v-model="processoModel.tipo">
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
import Clean from '@carbon/icons-vue/es/clean/32'; // CORRIGIDO
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

// Estado inicial do formulário
const getInitialProcessoModel = () => ({
  id: '',
  protocoloOficio: '',
  dataProcesso: '',
  secretariaId: '',
  fornecedorId: '',
  numeroOficio: '',
  numeroProcesso: '',
  descricao: '',
  tipo: ''
});

export default {
  name: 'ProcessoView',
  // Registrando TODOS os componentes
  components: {
    Add, Clean, TrashCan, Edit, ArrowLeft, // CORRIGIDO
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
        { key: 'protocolo', label: 'Protocolo' },
        { key: 'numeroOficio', label: 'Número do ofício' },
        { key: 'numeroProcesso', label: 'Número do processo' },
        { key: 'dataProcesso', label: 'Data' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'secretariaNome', label: 'Secretaria' },
        { key: 'descricao', label: 'Descrição' },
        { key: 'fornecedorNome', label: 'Fornecedor' },
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
        this.processos = response.data.map(proc => ({
          ...proc,
          protocolo: proc.oficio ? proc.oficio.protocolo : 'N/A',
          numeroOficio: proc.oficio ? proc.oficio.numero : 'N/A',
          secretariaNome: proc.secretaria ? proc.secretaria.nome : 'N/A',
          fornecedorNome: proc.fornecedor ? proc.fornecedor.nome : 'N/A'
        }));
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
        const dadosParaEnviar = {
           // (Precisamos confirmar os nomes dos campos com o DTO do backend)
           dataProcesso: this.processoModel.dataProcesso,
           numeroProcesso: this.processoModel.numeroProcesso,
           descricao: this.processoModel.descricao,
           tipo: this.processoModel.tipo,
           // Assumindo que o backend espera os objetos de relação
           secretaria: { idSecretaria: this.processoModel.secretariaId },
           fornecedor: { idFornecedor: this.processoModel.fornecedorId },
           // (Ainda precisamos de um 'Oficio'. Por enquanto, vamos omitir)
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
      this.processoModel = {
        id: linhaData.idProcesso,
        protocoloOficio: linhaData.protocolo,
        dataProcesso: linhaData.dataProcesso,
        secretariaId: linhaData.secretaria ? linhaData.secretaria.idSecretaria : '',
        fornecedorId: linhaData.fornecedor ? linhaData.fornecedor.idFornecedor : '',
        numeroOficio: linhaData.numeroOficio,
        numeroProcesso: linhaData.numeroProcesso,
        descricao: linhaData.descricao,
        tipo: linhaData.tipo
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