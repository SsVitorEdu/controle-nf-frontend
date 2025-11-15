<template>
  <div class="page-container-blue">
    <div class="content-box">

      <div class="header-container">
        <h1 class="page-title">Cadastro de Secretaria</h1>
        <router-link to="/home" class="back-link">
          <cv-link>
            Voltar <ArrowLeft class="back-icon" />
          </cv-link>
        </router-link>
      </div>

      <cv-grid class="bx--no-gutter">
        <cv-row>
          <cv-column :lg="4">
            <cv-text-input label="Nome da secretaria" v-model.trim="secretariaModel.nome" placeholder="Digite o nome da secretaria" />
          </cv-column>
          <cv-column :lg="4">
            <cv-text-input label="ID" v-model="secretariaModel.id" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
        </cv-row>
      </cv-grid>

      <cv-grid class="button-grid bx--no-gutter">
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
            <cv-button class="btn-full-width deletar" kind="ghost" @click="deletar" disabled>
              Deletar <TrashCan class="btn-icon" />
            </cv-button>
          </cv-column>
        </cv-row>
      </cv-grid>

      <div class="table-container">
        <h2 class="titulo">Secretarias</h2>
        <p class="frase">Nesta tabela estão todas as secretarias cadastrados</p>

        <cv-data-table
            :columns="colunasTabela"
            :data="secretarias"
            @select-row="handleRowSelect" >
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
import SecretariaService from '@/services/SecretariaService';

// Importando Ícones
import Add from '@carbon/icons-vue/es/add/20';
import Clean from '@carbon/icons-vue/es/clean/20';
import TrashCan from '@carbon/icons-vue/es/trash-can/20';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/16';

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
const getInitialSecretariaModel = () => ({
  id: '',
  nome: ''
});

export default {
  name: 'SecretariaView',
  // Registrando TODOS os componentes (ERRO DE SINTAXE CORRIGIDO)
  components: {
    Add, Clean, TrashCan, ArrowLeft, // 'Undo' foi removido
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
      secretariaModel: getInitialSecretariaModel(),
      secretarias: [],
      // MAPA DA TABELA (CORRIGIDO)
      colunasTabela: [
        { key: 'idSecretaria', label: 'ID' },
        { key: 'nomeSecretaria', label: 'Nome da secretaria' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    async buscarSecretarias() {
      try {
        const response = await SecretariaService.buscarTodas();
        this.secretarias = response.data;
        this.totalDeItens = this.secretarias.length;
      } catch (error) {
        console.error('Erro ao buscar secretarias:', error);
      }
    },

    async salvar() {
      try {
        const dadosParaEnviar = {
          nomeSecretaria: this.secretariaModel.nome,
        };

        await SecretariaService.inserir(dadosParaEnviar);
        this.limpar();
        this.buscarSecretarias();
      } catch(error) {
        console.error("Erro ao salvar secretaria:", error);
      }
    },

    limpar() {
      this.secretariaModel = getInitialSecretariaModel();
    },

    async deletar() {
      if (!this.secretariaModel.id) {
        alert('Por favor, clique em uma secretaria na tabela para deletar.');
        return;
      }
      try {
        await SecretariaService.deletar(this.secretariaModel.id);
        this.limpar();
        this.buscarSecretarias();
      } catch(error) {
        console.error("Erro ao deletar secretaria:", error);
      }
    },

    // MAPA DO CLIQUE (CORRIGIDO)
    handleRowSelect(event) {
      const linhaData = event.detail.row;
      console.log("Linha selecionada:", linhaData);
      this.secretariaModel = {
        id: linhaData.idSecretaria,
        nome: linhaData.nomeSecretaria // Corrigido de 'nome'
      };
    },

    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  created() {
    this.buscarSecretarias();
  }
}
</script>

<style scoped>
/* Estilos do Figma */
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

.deletar:enabled {
  border: 1px solid #0f62fe;
}

.btn-full-width:hover .btn-icon-tertiary {
  fill: #FFFFFF;
}

.btn-full-width:disabled{
  border: 1px solid #C6C6C6;
}
</style>