<template>
  <q-page>
    <cti-card icone="people" titulo="Exercícios">

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

async function buscaDados() {
  $q.loading.show({
    message: 'Buscando informações no servidor...',
  });

  const pagina = pagination.value.page;

  const url = `exercicios/?pagina=${pagina}&itensPorPagina=10&busca=${filter.value}`;
  exercicios.value = [];

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

  return;
}

onMounted(async () => {
  await buscaDados();
});


async function deleta(usuario) {
  try {
    const { status } = await api.delete(`usuarios/${usuario.id}`);
    const recarregar = () => location.reload()

    if (status == 200) {
      exibiNotificacao(
        "positive",
        `${usuario.nome} removido(a) com sucesso!`,
        "top",
        3000,
      );
      setTimeout(recarregar, 1000)
    }
  } catch (error) {
    exibiNotificacao("negative", error.response.data.message, "top", 3000);
  }
}

const acoes = ref([
  {
    nome: "Editar",
    cor: "warning",
    icone: "edit",
    click(row) {
      router.push("/usuarios/editar/" + row.id);
    },
  },
  {
    nome: "Deletar",
    cor: "negative",
    icone: "delete",
    click(row) {
      const mensagem = `Tem certeza que deseja excluir ${row.nome}?`;
      const acao = () => deleta(row);
      const botao = "Sim, excluir";
      exibeMensagem({
        mensagem,
        acao,
        botao,
      });
    },
  },
]);
</script>
