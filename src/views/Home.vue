<template>
  <div class="home-container" v-if="$store.state.user">
    <h1>Bem-vindo!</h1>
    <p>Esta é a página "Início" (Home).</p>
    
    <p>Usuário logado: {{ $store.state.user.email }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
}
</style>