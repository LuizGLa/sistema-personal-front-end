<template>
  <q-page>
    <cti-card titulo="Adicionar Usuário" icone="person_add">
      <formulario-usuario
        enviarBotao="Salvar"
        exibirBotaoVoltar="true"
        :administrador="true"
        @submit="onSubmit"
      ></formulario-usuario>
    </cti-card>
  </q-page>
</template>

<script setup>
import CtiCard from "src/components/commons/CtiCard.vue";
import FormularioUsuario from "src/components/forms/FormularioUsuario.vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import exibiNotificacao from "src/assets/js/notificacao";

const $q = useQuasar();

const router = useRouter();

async function salvaDados(dados) {
  $q.loading.show({
    message: "Enviando informações ao servidor...",
  });

  try {
    const data = { ...dados };
    const { status } = await api.post("usuarios", data);

    if (status == 201) {
      exibiNotificacao({
        type: 'positive',
        message: 'Usuário cadastrado com sucesso!',
        position: 'top',
      });

      router.push("/usuarios");
    }
  } catch (error) {
    $q.loading.hide();
    exibiNotificacao("negative", error.response.data.message, "top");
  }
}

async function onSubmit(dados) {
  salvaDados(dados);
}
</script>
