<template>
  <div class="page-container-blue">
    <div class="content-box">
      
      <div class="header-container">
        <h1 class="page-title">Cadastro de Fornecedor</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid>
        <cv-row>
          <cv-column :lg="4">
            <cv-text-input label="CNPJ" v-model.trim="fornecedorModel.cnpj" placeholder="Digite o CNPJ da empresa" />
          </cv-column>
          <cv-column :lg="4">
            <cv-text-input label="Nome da empresa" v-model.trim="fornecedorModel.nome" placeholder="Digite o nome da empresa" />
          </cv-column>
          <cv-column :lg="4">
            <cv-text-input label="ID" v-model="fornecedorModel.id" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
        </cv-row>
      </cv-grid>

      <cv-grid class="button-grid">
        <cv-row>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Cadastrar <Add class="btn-icon-tertiary" />
            </cv-button>
          </cv-column>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
             Limpar <Clean class="btn-icon-tertiary" />
           </cv-button>
          </cv-column>
          <cv-column :lg="4">
            <cv-button class="btn-full-width" kind="ghost" disabled>
              Deletar <TrashCan class="btn-icon" />
            </cv-button>
          </cv-column>
        </cv-row>
      </cv-grid>

      <div class="table-container">
        <h2>Fornecedores</h2>
        <p>Nesta tabela estão todos os fornecedores cadastrados</p>
        
        <cv-data-table
          :columns="colunasTabela"
          :data="fornecedores"
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
import FornecedorService from '@/services/FornecedorService';

// Importando Ícones
import Add from '@carbon/icons-vue/es/add/32';
import Clean from '@carbon/icons-vue/es/clean/32';
import TrashCan from '@carbon/icons-vue/es/trash-can/32';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/32';

// Importando TODOS os componentes Carbon que usamos
import {
  CvGrid,
  CvRow,
  CvColumn,
  CvTextInput,
  CvButton,
  CvDataTable,
  CvPagination,
  CvLink
} from '@carbon/vue';

// Estado inicial do formulário
const getInitialFornecedorModel = () => ({
  id: '',
  cnpj: '',
  nome: ''
});

export default {
  name: 'FornecedorView',
  // Registrando TODOS os componentes
  components: {
    Add, Clean, TrashCan, ArrowLeft,
    CvGrid,
    CvRow,
    CvColumn,
    CvTextInput,
    CvButton,
    CvDataTable,
    CvPagination,
    CvLink
  },
  data() {
    return {
      fornecedorModel: getInitialFornecedorModel(),
      fornecedores: [],
      colunasTabela: [
        { key: 'idFornecedor', label: 'ID' },
        { key: 'cnpj', label: 'CNPJ' },
        { key: 'nome', label: 'Nome da empresa' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    // Métodos para buscar dados do backend
    async buscarFornecedores() {
      try {
        const response = await FornecedorService.buscarTodos();
        this.fornecedores = response.data;
        this.totalDeItens = this.fornecedores.length;
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    },
    
    // Ações dos Botões
    async salvar() {
      try {
        const dadosParaEnviar = {
           cnpj: this.fornecedorModel.cnpj,
           nome: this.fornecedorModel.nome,
        };
        
        await FornecedorService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarFornecedores();
      } catch(error) {
        console.error("Erro ao salvar fornecedor:", error);
      }
    },
    limpar() {
      this.fornecedorModel = getInitialFornecedorModel();
    },
    async deletar() {
      // (Lógica para o futuro, já que o botão está desabilitado)
    },

    // Ações da Tabela
    handleRowClick(event) {
      const linhaData = event.detail.row;
      this.fornecedorModel = {
        id: linhaData.idFornecedor,
        cnpj: linhaData.cnpj,
        nome: linhaData.nome
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  // 'created' é chamado quando o componente é carregado
  created() {
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