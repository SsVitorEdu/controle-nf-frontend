<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">Login</h1>

      <cv-form @submit.prevent="handleLogin" class="login-form">
        <div class="email-form-input">
        <cv-text-input
          label="Usuário"
          placeholder="Digite seu usuário"
          v-model="email"
        />
        </div>

        <div class="password-form-input">
        <cv-text-input
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          v-model="senha"
          :invalid="!!errorMsg"
        />
        </div>
        <cv-inline-notification
          v-if="errorMsg"
          :title="errorMsg"
          kind="error"
          subtitle=""
        />

        <cv-button type="submit" :disabled="loading" class="login-button">
          {{ loading ? 'Entrando...' : 'Entrar' }}
          <ArrowRight vEntry slot="icon" />
        </cv-button>

      </cv-form>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import ArrowRight from '@carbon/icons-vue/es/arrow--right/32';
export default {
  name: 'LoginView',
  components: {
    ArrowRight
  },
  data() {
    return {
      email: '',
      senha: '',
      loading: false,
      errorMsg: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMsg = '';
      const credentials = {
        email: this.email,
        senha: this.senha
      };

      try {
        const response = await AuthService.login(credentials);
        console.log('Login com sucesso:', response.data);
        
        this.$store.commit('setUser', response.data); 
        this.$router.push('/home');

      } catch (error) {
        console.error('Erro no login:', error);
        this.errorMsg = 'Email ou senha inválidos.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  display: flex;
  font-family: "IBM Plex Sans", sans-serif;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f62fe; 
}
.login-box {
  background: #fff;
  padding: 66px 109.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 507px;
  height: 498px;
  gap: 56px;
}
.login-title {
  text-align: center;
  font-size: 46px;
  color: #161616;
  margin-bottom: 56px;
}
.login-button {
  font-size: 14px;
  width: 288px;
  margin-top: 48px;
}
cv-inline-notification {
  margin-top: 1rem;
}
.login-form {

  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.email-form-input {
  font-size: 14px;
  width: 288px;
  margin-bottom: 16px;
}

.password-form-input {
  font-size: 14px;
  width: 288px;
}


</style>