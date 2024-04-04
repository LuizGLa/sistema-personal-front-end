<template>
  <q-layout class="page">
    <q-page-container>
      <q-page class="flex flex-center">
            <q-card class="card">
              <q-card-section>
                <q-img
                  class="img-logo q-mt-xl q-mx-xl"
                  src="../assets/images/logo.png"
                />
              </q-card-section>
              <q-card-section class="inputs q-ma-xl">
                <q-form
                  ref="form"
                  @submit.prevent.stop="onSubmit"
                >
                  <q-input
                    filled
                    dense
                    ref="username"
                    label-color="teal-9"
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
                    label-color="teal-9"
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
                    style="background-color: rgb(6, 116, 133)"
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
  background: linear-gradient(to bottom,
      rgba(6, 116, 133, 0.85),
      rgba(4, 28, 51, 0.85)),
    url(../assets/images/backgroundFit.jpg);



}

.card {
 backdrop-filter: blur(10px);
 background-color: #e7e9ee;
 border-radius: 30px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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

.img-logo{
  width: 27em;
}
@media (max-width: 690px) {
.img-logo{
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0px;
  margin-top: 10px;
  width: 15em;
  }

.card {
 backdrop-filter: blur(10px);
 background-color: #e7e9ee;
 border-radius: 30px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

}
.inputs {
  margin: 10px;
}
}
</style>
