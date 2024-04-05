<template>
  <q-page>
    <cti-card icone="manage_accounts" titulo="Editar usuário">
      <formulario-usuario
        :usuarioId="id"
        :administrador="true"
        enviarBotao="Salvar"
        exibirBotaoVoltar="true"
        @submit="onSubmit"
      ></formulario-usuario>
    </cti-card>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
import CtiCard from "src/components/commons/CtiCard.vue";
import FormularioUsuario from "src/components/forms/FormularioUsuario.vue";
import { useQuasar } from "quasar";
import exibiNotificacao from "src/assets/js/notificacao";

const $q = useQuasar();

const route = useRoute();
const router = useRouter();

const { id } = route.params;

async function editarDados(dados) {
  $q.loading.show({
    message: 'Buscando informações no servidor...',
  });
  try {
    const data = { ...dados };

    if (data.senha === '') {
      delete data.senha;
    }
    const { status } = await api.put(`usuarios/${id}`, data);

    if (status == 200) {
      exibiNotificacao({
        type: 'positive',
        message: 'Usuário editado com sucesso!',
        position: 'top',
      });

      router.push('/usuarios');
    }
  } catch (error) {
    exibiNotificacao({
      type: 'negative',
      message: error.response.data.message,
      position: 'top',
    });
  }
}


function onSubmit(data) {
  editarDados(data);
}
</script>
