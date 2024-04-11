<template>
  <q-page>
    <cti-card icone="people" titulo="Exercícios">
      <div class="row">
        <template v-for="(exercicio, index) in exercicios" :key="index">
          <exercicio-card class="col-lg-4 col-md-4 col-sm-6 col-12" :exercicioId="exercicio.id"
            :img-link="exercicio.gifUrl" :nome="exercicio.nome" :descricao="exercicio.descricao" @delete="deleteExercicio(exercicio.id, exercicio.nome)
          " @confirmDelete="showDeleteConfirmation(exercicio.id, exercicio.nome)" />
        </template>
      </div>
    </cti-card>
  </q-page>
</template>


<script setup>
import { useQuasar } from "quasar";
import exibeMensagem from "src/assets/js/mensagem";
import exibiNotificacao from "src/assets/js/notificacao";
import { api } from "src/boot/axios";
import CtiCard from "src/components/commons/CtiCard.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ExercicioCard from "src/components/commons/ExercicioCard.vue";

const max_paginas = ref(0);
const $q = useQuasar();
const rowsPerPage = ref(10);
const filter = ref('');
const paginacao_inicial = ref({
  page: 1,
  rowsPerPage: 10,
});



const pagination = ref({
  rowsPerPage,
  maxPages: 0,
  page: paginacao_inicial.value.page,
  pageShow: 1,
});

const router = useRouter();
const exercicios = ref([])

const showDeleteConfirmation = (exercicioId, exercicioNome) => {
  const mensagem = `Tem certeza que deseja excluir o exercício "${exercicioNome}"?`;
  const botao = 'Excluir';
  const acao = () => deleteExercicio(exercicioId, exercicioNome);
  exibeMensagem({ mensagem, botao, acao });
};

async function buscaDados() {
  $q.loading.show({
    message: 'Buscando informações no servidor...',
  });
  const pagina = pagination.value.page;
  const url = `exercicios/?pagina=${pagina}&itensPorPagina=10&busca=${filter.value}`;
  try {
    const { data } = await api.get(url);
    exercicios.value = data.data;
    max_paginas.value = data.maxPag;
    $q.loading.hide();
    console.log(exercicios.value);
  } catch (erro) {
    console.log(erro);
    $q.loading.hide();
    exibiNotificacao('negative', erro.message, 'top');
  }
}


onMounted(async () => {
  await buscaDados();
});



async function deleteExercicio(exercicioId, exercicioNome) {
  try {
    await api.delete(`exercicios/${exercicioId}`);
    const recarregar = () => location.reload()

    $q.notify({
      type: 'positive',
      message: `${exercicioNome} removido(a) com sucesso!`,
      position: 'top',
      timeout: 2000,
    })
    setTimeout(recarregar, 1000)
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: `Erro ao remover ${exercicioNome}!`,
      position: 'top',
      timeout: 2000,
    })
  }
}



</script>
