<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section
        align="center"
        class="colum items-center justify-between text-center"
      >
        <q-avatar icon="live_help" color="warning" text-color="white" />
        <div class="text-h5">{{ mensagem }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        Ao confirmar essa ação, você não poderá desfazê-la.
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" unelevated :label="botao" @click="acao" v-close-popup/>
        <q-btn outline label="Cancelar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  mensagem: {
    type: String,
    required: true,
  },
  botao: {
    type: String,
    required: true,
  },
  acao: {
    type: Function,
    required: true,
  },
});
</script>
