<template>
  <div class="login-container">
    <cds-form @submit.prevent="handleLogin">
      <cds-stack gap="7">
        <h3>Login</h3>
        
        <cds-text-input
          label="Usuário (Email)"
          v-model="email"
          placeholder="Digite seu email"
          :invalid="!!errorMsg"
        >
        </cds-text-input>
        
        <cds-password-input
          label="Senha"
          v-model="senha"
          placeholder="Digite sua senha"
          :invalid="!!errorMsg"
        >
        </cds-password-input>
        
        <cds-inline-notification
          v-if="errorMsg"
          :title="errorMsg"
          kind="error"
          subtitle=""
        />

        <cds-button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
          <ArrowRight vEntry slot="icon" />
        </cds-button>

      </cds-stack>
    </cds-form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

import { 
  CdsForm, 
  CdsStack, 
  CdsTextInput, 
  CdsPasswordInput, 
  CdsButton,
  CdsInlineNotification
} from 'carbon-components-vue';
import ArrowRight from '@carbon/icons-vue/es/arrow--right/32';

export default {
  name: 'LoginView',
  components: {
    CdsForm,
    CdsStack,
    CdsTextInput,
    CdsPasswordInput,
    CdsButton,
    CdsInlineNotification,
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4; 
}

cds-form {
  width: 400px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
</style>