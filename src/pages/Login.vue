<template>
  <q-layout class="page">
    <q-page-container>
      <q-page class="flex flex-center">
            <q-card class="q-pa-xl card">
              <q-card-section>
                <q-img
                  src="../assets/images/logo.png"
                  style="width: 30em"
                />
              </q-card-section>
              <q-card-section>
                <q-form
                  ref="form"
                  @submit.prevent.stop="onSubmit"
                >
                  <q-input
                    filled
                    dense
                    ref="username"
                    outlined
                    name="usuario"
                    type="text"
                    v-model="data.username"
                    lazy-rules
                    :rules="usernameRules"
                    label="Usuário"
                  />
                  <q-input
                    filled
                    dense
                    ref="password"
                    outlined
                    name="password"
                    type="password"
                    v-model="data.password"
                    :rules="passwordRules"
                    label="Senha"
                  />
                  <q-btn
                    class="full-width"
                    type="submit"
                    text-color="white"
                    label="Entrar"
                    style="background-color: #2879c4"
                  />
                </q-form>
              </q-card-section>
            </q-card>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  ...mapGetters("auth", ["isAuthenticated"]),
  name: "PageLogin",
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
      app_name: process.env.APP_NAME,
      usernameRules: [
        (val) => (val && val.length > 0) || "Digite o seu nome de usuário",
        (val) =>
          this.validaNome(val) ||
          "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
      ],
      passwordRules: [(val) => (val && val.length > 0) || "Digite a sua senha"],
    };
  },
  beforeMount() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions("auth", ["doLogin"]),
    async onSubmit() {
      this.$refs.username.validate();
      this.$refs.password.validate();

      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.$q.notify({
          icon: 'error',
          position: 'top',
          color: 'negative',
          message: 'Você precisa preencher os campos em vermelho',
        });
      } else {
        try {
          await this.doLogin(this.data);
          const toPath = this.$route.query.to || '/';
          this.$router.push(toPath);
        } catch (err) {
          try {
            if (err.response.status === 401) {
              this.$q.notify({
                icon: 'error',
                position: 'top',
                color: 'negative',
                message: 'Usuário ou senha incorretos!',
              });
            }
          } catch (error) {
            this.$q.notify({
              icon: 'error',
              position: 'top',
              color: 'negative',
              message: 'Erro ao fazer login, tente novamente mais tarde!',
            });
          }
        }
      }
    },
    validaNome(val) {
      const regexTexto = /[^a-zA-Zs]/g;

      return !regexTexto.test(val);
    },
  },
});
</script>

<style scoped>
.page {
  background: linear-gradient(175deg, #0897b7 0%, #e7f7ff 100%);

}

.card {
 background-color: rgba(255, 255, 255, 0.853);
 border-radius: 30px;

}
.aside {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  height: 100vh;
}

.form-container {
  padding: 0 20px;
}

.label {
  font-size: 16px;
}

.text-font {
  font-family: "Gothic A1", sans-serif;
}

.pmvc-logo{
  height: 130px;
  object-fit: cover;
}
.cti-logo-container {
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  width: 100%;
  height: 130px;
  display: none;
}
.cti-logo{
  height: 90px;
  object-fit: cover;
}
@media (max-width : 1024px) {
  .aside {
    display: none;
  }
  .cti-logo-container {
    display: flex;
  }
  .pmvc-logo{
    height: 100px;
  }
}
@media (max-height : 640px) {
  .cti-logo-container {
    display: none;
  }
}
</style>
