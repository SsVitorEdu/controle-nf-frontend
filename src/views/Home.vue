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
                Secretária <UserAvatar class="tile-icon" />
              </cv-tile>
            </router-link>
          </cv-column>
          <cv-column :sm="4" :md="4" :lg="4">
             <router-link to="/fornecedor" class="tile-link">
              <cv-tile class="nav-tile">
                Fornecedor <Building class="tile-icon" />
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

import Document from '@carbon/icons-vue/es/document/32';
import Launch from '@carbon/icons-vue/es/launch/32';
import DocumentBlank from '@carbon/icons-vue/es/document--blank/32';
import UserAvatar from '@carbon/icons-vue/es/user--avatar/32';
import Building from '@carbon/icons-vue/es/building/32';

export default {
  name: 'HomeView',
  components: {

    Document,
    Launch,
    DocumentBlank,
    UserAvatar,
    Building
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f62fe;
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
  color: #161616;
}

.nav-tile {
  background-color: #f4f4f4; 
  border: 1px solid #e0e0e0;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.1rem;
  color: #161616;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-tile:hover {
  background-color: #e8e8e8;
  border-color: #c6c6c6;
}

.tile-icon {
  fill: #161616;
}

.tile-link {
  text-decoration: none;
}

cv-row {
  margin-bottom: 1.5rem;
}
</style>