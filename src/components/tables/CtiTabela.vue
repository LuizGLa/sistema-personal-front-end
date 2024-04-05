<template>
  <div class="q-mb-xs header_container justify-between">
    <q-btn style="color: aliceblue; background-color: rgba(6, 116, 133, 0.85);" icon="add_circle" v-if="rota_adicionar && botao" :to="rota_adicionar" >
      <span class="q-ml-xs" v-if="$q.screen.width >= 750">{{ botao }}</span>
    </q-btn>
    <div>
     <q-input
        class="search_bar"
        dense
        label-color="teal-9"
        debounce="500"
        outlined
        v-model="filter"
        @blur="buscaDados"
        placeholder="Pesquisar"
      >
        <template v-slot:append>
          <q-icon name="search" color="teal-9" />
        </template>
      </q-input>
    </div>
  </div>
  <q-table
  class="my-sticky-dynamic"
    :title="titulo"
    :rows="dados"
    :columns="colunas"
    row-key="name"
    flat bordered
    separator="cell"
    v-model:pagination="paginacao_inicial"
  >
    <template v-if="acoes" v-slot:body-cell-acoes="props">
      <q-td class="actions_container">
        <q-btn
          dense
          size="sm"
          unelevated
          v-for="acao in acoes"
          :key="acao.nome"
          :color="acao.cor"
          @click="acao.click(props.row)"
        >
          <q-icon :name="acao.icone" />
        </q-btn>
      </q-td>
    </template>
    <template v-slot:bottom>
      <div class="pagination_container">
        <q-pagination
          v-if="max_paginas > 1"
          @input="console.log(pagination.page)"
          v-model="pagination.page"
          color="grey"
          active-color="primary"
          :max="max_paginas"
          :max-pages="max_paginas"
          direction-links
          size="md"
        />
      </div>
    </template>
  </q-table>
</template>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: rgba(6, 116, 133, 0.85)
    color: white

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<style scoped>
.header_container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
}

.search_bar {
  flex: 1 1 0%;
}

.pagination_container {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions_container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

</style>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { defineProps, ref, watch, onMounted, nextTick } from 'vue';
import exibiNotificacao from 'src/assets/js/notificacao';

const props = defineProps({
  colunas: Array,
  rota: String,
  rota_adicionar: String,
  titulo: String,
  itensPorPagina: Number,
  acoes: {
    type: Array,
    default: () => [],
  },
  botao: {
    type: String,
    default: undefined,
  },
});

const filter = ref('');
const $q = useQuasar();
const dados = ref([]);
const max_paginas = ref(0);
const rowsPerPage = ref(10);
const paginacao_inicial = ref({
  page: 1,
  rowsPerPage: props.itensPorPagina,
});

const pagination = ref({
  rowsPerPage,
  maxPages: 0,
  page: paginacao_inicial.value.page,
  pageShow: 1,
});

async function buscaDados() {
  $q.loading.show({
    message: 'Buscando informações no servidor...',
  });

  const pagina = pagination.value.page;

  const url = `${props.rota}/?pagina=${pagina}&itensPorPagina=${props.itensPorPagina}&busca=${filter.value}`;
  dados.value = [];

  try {
    const { data } = await api.get(url);
    dados.value = data.data;
    max_paginas.value = data.maxPag;
    $q.loading.hide();
  } catch (erro) {
    console.log(erro);
    $q.loading.hide();
    exibiNotificacao('negative', erro.message, 'top');
  }

  return;
}

onMounted(() => {
  buscaDados();
});

watch(
  () => pagination,
  () => {
    nextTick(async () => {
      await buscaDados();
    });
  },
  { deep: true },
);

watch(filter, () => {
  nextTick(async () => {
    await buscaDados();
  });
});
</script>
