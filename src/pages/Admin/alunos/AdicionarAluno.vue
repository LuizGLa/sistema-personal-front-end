<template>
  <q-page>
    <cti-card titulo="Adicionar Aluno" icone="person_add">
      <formulario-aluno
        enviarBotao="Salvar"
        exibirBotaoVoltar="true"
        :administrador="true"
        @submit="onSubmit"
      ></formulario-aluno>
    </cti-card>
  </q-page>
</template>

<script setup>
import CtiCard from "src/components/commons/CtiCard.vue";
import FormularioAluno from "src/components/forms/FormularioAluno.vue";
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
    data.idade = parseInt(data.idade);
    data.peso = parseFloat(data.peso);
    data.altura = parseFloat(data.altura);

    const { status } = await api.post("alunos", data);

    if (status == 201) {
      exibiNotificacao({
        type: 'positive',
        message: 'Usuário cadastrado com sucesso!',
        position: 'top',
      });

      router.push("/alunos");
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
