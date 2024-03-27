<template>
  <main class="row">
    <div class="col-xs-12 col-md-6">
      <div class="row text-center q-mt-xl">
        <div class="col-12">
          <img class="pmvc-logo" src="../assets/images/logo-pmvc.svg" alt />
        </div>
        <div class="col-12">
          <h1 class="text-bold text-blue-9  text-h4 q-mt-md q-mb-lg">
            <!-- <q-icon name="defina um icone aqui"/> -->
            {{ app_name }}
          </h1>
        </div>
      </div>
      <div class="row justify-center">
        <q-form
          ref="form"
          @submit.prevent.stop="onSubmit"
        >
          <div class="row form-container">
            <div class="col-12 q-mb-md">
              <label class="label text-font">Usuário</label>
              <q-input
                filled
                ref="username"
                outlined
                name="usuario"
                type="text"
                v-model="data.username"
                lazy-rules
                :rules="usernameRules"
              />
            </div>
            <div class="col-12 q-mb-md">
              <label class="label text-font">Senha</label>
              <q-input
                filled
                ref="password"
                outlined
                name="password"
                type="password"
                v-model="data.password"
                :rules="passwordRules"
              />
            </div>
            <div class="col-12">
              <q-btn
                class="text-font full-width"
                type="submit"
                color="primary"
                label="Entrar"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="cti-logo-container">
        <img class="cti-logo" src="../assets/images/cti-logo2.png" alt="cti logo">
      </div>

    </div>
    <div class="aside col-xs-0 col-md-6 column justify-end">
      <img
        src="../assets/images/logo_CTI.png"
        alt="logo do cti"
        style="width: 500px; margin: 10px auto"
      />
    </div>
  </main>
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
.aside {
  background: linear-gradient(
      to bottom,
      rgba(50, 113, 166, 0.85),
      rgba(183, 215, 86, 0.85)
    ),
    url(../assets/images/imagem-de-fundo.svg);
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
