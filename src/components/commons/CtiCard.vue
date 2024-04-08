<template>
  <q-card :style="`min-height: ${$q.screen.height - 120}px`">
    <q-card-section class="row bg-grey-2 q-py-sm flex justify-between sec-header">
      <div class="flex group">
        <q-icon size="md" class="text-teal-9" :name="icone" />
        <div class="text-h6 text-teal-9 q-ml-sm">{{ titulo }}</div>
      </div>
      <slot name="button" />
    </q-card-section>

    <q-separator />
    <div class="q-pa-md">
      <slot />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  props: ["titulo", "icone"],
  setup() {
    const $q = useQuasar();
  },
});
</script>
<style scoped></style>
