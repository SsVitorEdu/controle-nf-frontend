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
            <cv-text-input label="Protocolo da nota" v-model.trim="nfModel.protocolo" placeholder="Digite o protocolo" />
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
            <cv-text-input label="Valor da nota" v-model.trim="nfModel.valor" placeholder="Digite o valor da nota" />
          </cv-column>
        </cv-row>
        
        <cv-row>
          <cv-column :lg="3">
            <cv-text-input label="Número da nota" v-model.trim="nfModel.numero" placeholder="Digite o número da nota" />
          </cv-column>
          <cv-column :lg="3">
            <cv-date-picker
              date-label="Data da nota"
              placeholder="mm/dd/yyyy"
              v-model="nfModel.dataNota"
            />
          </cv-column>
          <cv-column :lg="3">
             <cv-text-input label="Número do Processo" v-model.trim="nfModel.processoId" placeholder="Digite o número do processo" />
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
// (Vamos precisar do ProcessoService se o 'Número do Processo' for um ID)
// import ProcessoService from '@/services/ProcessoService';

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
  CvButton,
  CvDataTable,
  CvPagination,
  CvLink
} from '@carbon/vue';

// Estado inicial do formulário
const getInitialNFModel = () => ({
  id: '',
  protocolo: '',
  dataProtocolo: '',
  dataChegada: '',
  valor: '',
  numero: '',
  dataNota: '',
  processoId: '' // ID do processo
});

export default {
  name: 'NotaFiscalView',
  // Registrando TODOS os componentes
  components: {
    Add, Clean, TrashCan, Edit, ArrowLeft, // CORRIGIDO
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
      colunasTabela: [
        { key: 'idNF', label: 'ID' },
        { key: 'dataChegada', label: 'Data de chegada' },
        { key: 'protocolo', label: 'Protocolo da Nota' },
        { key: 'dataProtocolo', label: 'Data do Protocolo' },
        { key: 'numero', label: 'Número da nota' },
        { key: 'valor', label: 'Valor da nota' },
        { key: 'dataNota', label: 'Data da nota' },
        { key: 'numeroProcesso', label: 'Número Processo' },
      ],
      totalDeItens: 0,
      tamanhoPagina: 100
    };
  },
  methods: {
    // Métodos para buscar dados do backend
    async buscarNotasFiscais() {
      try {
        const response = await NFService.buscarTodas();
        this.notasFiscais = response.data.map(nf => ({
          ...nf,
          idNF: nf.idNF,
          // Mapeia o objeto 'processo' para a coluna da tabela
          numeroProcesso: nf.processo ? nf.processo.numeroProcesso : 'N/A'
        }));
        this.totalDeItens = this.notasFiscais.length;
      } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
      }
    },
    
    // Ações dos Botões
    async salvar() {
      try {
        const dadosParaEnviar = {
           protocolo: this.nfModel.protocolo,
           dataProtocolo: this.nfModel.dataProtocolo,
           dataChegada: this.nfModel.dataChegada,
           valor: parseFloat(this.nfModel.valor), // Converter valor para número
           numero: this.nfModel.numero,
           dataNota: this.nfModel.dataNota,
           // Assumindo que o backend espera o objeto de processo
           processo: { idProcesso: parseInt(this.nfModel.processoId) } // Converter ID para número
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
      // (Lógica para o futuro)
    },

    // Ações da Tabela
    handleRowClick(event) {
      const linhaData = event.detail.row;
      this.nfModel = {
        id: linhaData.idNF,
        protocolo: linhaData.protocolo,
        dataProtocolo: linhaData.dataProtocolo,
        dataChegada: linhaData.dataChegada,
        valor: linhaData.valor,
        numero: linhaData.numero,
        dataNota: linhaData.dataNota,
        processoId: linhaData.processo ? linhaData.processo.idProcesso : ''
      };
    },
    handlePageChange(event) {
      console.log('Paginação alterada:', event);
    }
  },
  // 'created' é chamado quando o componente é carregado
  created() {
    this.buscarNotasFiscais();
    // (Se o 'Número do Processo' fosse um dropdown, chamaríamos o buscarProcessos() aqui)
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