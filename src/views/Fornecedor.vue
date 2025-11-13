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

      <cv-grid class="bx--no-gutter" full-width>
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="CNPJ" v-model.trim="fornecedorModel.cnpj" placeholder="Digite o CNPJ da empresa" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="Nome da empresa" v-model.trim="fornecedorModel.nomeEmpresa" placeholder="Digite o nome da empresa" />
          </cv-column>
          <cv-column :lg="3">
            <cv-text-input label="ID" v-model="fornecedorModel.id" disabled placeholder="O ID aparecerá aqui" />
          </cv-column>
        </cv-row>
      </cv-grid>

      <cv-grid class="button-grid bx--no-gutter" full-width>
        <cv-row>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="salvar">
              Cadastrar <Add class="btn-icon-tertiary" />
            </cv-button>
          </cv-column>
          <cv-column :lg="3">
            <cv-button class="btn-full-width" kind="tertiary" @click="limpar">
             Limpar <Clean class="btn-icon-tertiary" />
           </cv-button>
          </cv-column>
          <cv-column :lg="4">
            <cv-button class="btn-full-width deletar" kind="ghost" disabled>
              Deletar <TrashCan class="btn-icon" />
            </cv-button>
          </cv-column>
        </cv-row>
      </cv-grid>

      <div class="table-container">
        <h2 class="textoFornecedores">Fornecedores</h2>
        <p class="descricao">Nesta tabela estão todos os fornecedores cadastrados</p>
        
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
import Add from '@carbon/icons-vue/es/add/16';
import Clean from '@carbon/icons-vue/es/clean/16';
import TrashCan from '@carbon/icons-vue/es/trash-can/16';
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/20';

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

const getInitialFornecedorModel = () => ({
  id: '',
  cnpj: '',
  nomeEmpresa: ''
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
        { key: 'nomeEmpresa', label: 'Nome da empresa' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100,
      carregandoCNPJ: false
    };
  },

  watch:{
    'fornecedorModel.cnpj': function(novoValor) {
      if (!novoValor) return;

      const cnpjLimpo = novoValor.replace(/\D/g, '');

      if(cnpjLimpo.length ===14){
        this.buscarDadosCNPJ(cnpjLimpo);
      }
    }
  },
  methods: {

    async buscarFornecedores() {
      try {
        const response = await FornecedorService.buscarTodos();
        this.fornecedores = response.data;
        this.totalDeItens = this.fornecedores.length;
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    },

    async buscarDadosCNPJ(cnpjLimpo) {
      this.carregandoCNPJ = true;
      try{
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);

        if(!response.ok) throw new Error('CNPJ inválido ou erro na API');
          const dados = await response.json();

        this.fornecedorModel.nomeEmpresa = dados.razao_social;

      }catch(error){
        console.warn('Não foi possível buscar o CNPJ automaticamente', error);
      }finally {
        this.carregandoCNPJ = false;
      }
    },
    
    // Ações dos Botões
    async salvar() {

      if(this.fornecedorModel.nomeEmpresa.length < 14) {
        alert('Campo CNPJ vazio');
      }
      try {
        const dadosParaEnviar = {
           nomeEmpresa: this.fornecedorModel.nomeEmpresa,
           cnpj: this.fornecedorModel.cnpj,
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
        nomeEmpresa: linhaData.nomeEmpresa
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
  font-family: "IBM Plex Sans", sans-serif;
  padding: 32px 32px;
  width: 1376px;
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

cv-text-input{
  width: 288px;
}

.btn-icon-tertiary {
  margin-left: 64px;
  margin-right: 0;
  fill: #0f62fe;
  transition: fill 0.1s ease-in-out;
}

.btn-full-width:disabled{
  border: 1px solid #C6C6C6;
}

.deletar:enabled{
  border: 1px solid #0f62fe;
}

.btn-full-width:hover .btn-icon-tertiary {
  fill: #FFFFFF;
}

cv-grid{
  margin-top: 0;
}

.back-link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.back-icon {
  margin-left: 0.5rem;
  fill: #0f62fe;
}

cv-row {
  margin-bottom: 0;
}

.button-grid {
  margin-top: 40px;
  margin-bottom: 0;
}

.btn-full-width {
  width: 410.66px;
  height: 48px;
  margin-right: 40px;
}

.btn-icon {
  margin-left: 0;
}


.btn-icon-tertiary {
  margin-left: 0;
  fill: #0f62fe;
}

.table-container {
  margin-top: 40px;
}

cv-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.textoFornecedores, .descricao{
  background-color: #F4F4F4;
  margin-bottom: 0;
}

.textoFornecedores {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px
}

.descricao {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}
</style>