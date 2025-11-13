<template>
  <div class="home-container">
    <div class="home-box">
      <h1 class="home-title">Início</h1>

      <cv-grid>
        <cv-row>
          <cv-column :sm="4" :md="4" :lg="4">
            <router-link to="/oficio" class="tile-link">
              <cv-tile class="nav-tile">
                Ofício <Document class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column :sm="4" :md="4" :lg="4">
            <router-link to="/processo" class="tile-link">
              <cv-tile class="nav-tile">
                Processo <Launch class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column :sm="4" :md="4" :lg="4">
            <router-link to="/nota-fiscal" class="tile-link">
              <cv-tile class="nav-tile">
                Nota fiscal <DocumentBlank class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
        </cv-row>
        
        <cv-row>
          <cv-column :sm="4" :md="4" :lg="4">
            <router-link to="/secretaria" class="tile-link">
              <cv-tile class="nav-tile">
                Secretária <Building class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column :sm="4" :md="4" :lg="4">
             <router-link to="/fornecedor" class="tile-link">
              <cv-tile class="nav-tile">
                Fornecedor <Delivery class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column :sm="4" :md="4" :lg="4"></cv-column>
        </cv-row>
      </cv-grid>
    </div>
  </div>
</template>

<script>
// 1. Importar os ícones CORRETOS do Figma
import Document from '@carbon/icons-vue/es/document/32'; // <-- CORRIGIDO
import Launch from '@carbon/icons-vue/es/launch/32';
import DocumentBlank from '@carbon/icons-vue/es/document--blank/32';
import Building from '@carbon/icons-vue/es/building/32'; // Prédio
import Delivery from '@carbon/icons-vue/es/delivery/32'; // Caminhão

// 2. Importar os componentes de layout
import { CvTile, CvGrid, CvRow, CvColumn } from '@carbon/vue';

export default {
  name: 'HomeView',
  components: {
    // 3. Registrar TUDO (Ícones e Layout)
    Document, // <-- CORRIGIDO
    Launch,
    DocumentBlank,
    Building,
    Delivery,
    CvTile,
    CvGrid,
    CvRow,
    CvColumn
  }
}
</script>

<style scoped>
/* Estilos do Figma (COM CORES CORRIGIDAS) */
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f62fe; /* Fundo azul IBM Carbon */
}

.home-box {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 900px;
}

.home-title {
  margin-bottom: 2rem;
  font-weight: 400;
  color: #161616; /* Título "Início" é preto mesmo */
}

.nav-tile {
  background-color: #f4f4f4; /* Fundo cinza claro para os tiles */
  border: 1px solid #e0e0e0;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.1rem;
  
  color: #0f62fe; /* CORREÇÃO: Texto do tile em azul */
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-tile:hover {
  background-color: #e8e8e8;
  border-color: #0f62fe; /* CORREÇÃO: Borda azul no hover */
}

.tile-icon {
  fill: #0f62fe; /* CORREÇÃO: Ícone em azul */
}

.tile-link {
  text-decoration: none; /* Tirar sublinhado do link */
}

/* Espaçamento entre as linhas da grid */
cv-row {
  margin-bottom: 1.5rem;
}
</style>