<template>
  <div class="home-container">
    <div class="home-box">
      <h1 class="home-title">Início</h1>

      <cv-grid class="grid">
        <cv-row class="cima">
          <cv-column class="Oficio">
            <router-link to="/oficio" class="tile-link">
              <cv-tile class="nav-tile">
                Ofício <Document class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column class="Processo">
            <router-link to="/processo" class="tile-link" >
              <cv-tile class="nav-tile">
                Processo <RepoArtifact class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column class="NotaFiscal">
            <router-link to="/nota-fiscal" class="tile-link">
              <cv-tile class="nav-tile">
                Nota fiscal <DocumentBlank class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
        </cv-row>

        <cv-row class="baixo">
          <cv-column class="Secretaria">
            <router-link to="/secretaria" class="tile-link">
              <cv-tile class="nav-tile">
                Secretária <Building class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column class="Fornecedor">
            <router-link to="/fornecedor" class="tile-link">
              <cv-tile class="nav-tile">
                Fornecedor <Delivery class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
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
    Delivery,
    Building
  }
}






</script>

<style scoped>
.home-container {
  display: flex;
  font-family: "IBM Plex Sans", sans-serif;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f62fe; /* Fundo azul IBM Carbon */
}

.home-box {
  background: #fff;
  padding: 32px;
  width: 496px;
  height: 312px;
  box-sizing: border-box;
}

.nav-tile:hover {
  background: #0f62fe;
  color: #fff;
  transition-delay: 50ms;
  border: 1px solid white;
}

.nav-tile:hover .tile-icon {
  fill: #FFFFFF;
  transition-delay: 50ms;
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