<template>
  <div>
    <q-card class="col-lg-4 q-ma-lg col-md-4 col-sm-6 col-12 flat bordered card row">
      <div class="col-lg-3 col-sm-3 col-xs-4">
        <img class="imagem" :src="props.imgLink">
      </div>
      <div class="col-xl-7 col-lg-7 col-sm-7 col-xs-5 row flex justify-center">
        <div class="col-12 text-center">
          <q-card-section class="text-white" style="border-bottom: 1px solid #d3d2d2; background-color: #003C43;">
            <div class="title responsive-text">
              {{ props.nome }}
            </div>
          </q-card-section>
          <q-card-section class="desktop-only">
            <div class=" responsive-text">
              {{ truncateDescription(props.descricao) }}
            </div>
          </q-card-section>
        </div>
      </div>
      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section>
            {{ props.descricao }}
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-card-actions vertical
        class="justify-around bg-grey-2 actions col-xs-3 col-md-2 col-lg-2 col-xl-2 col-sm-2 col-xl-1">
        <q-btn class="mobile-only" flat unelevated dense color="blue-9" @click="showDialog = true">
          <q-icon name="info" />
        </q-btn>
        <q-btn flat unelevated dense color="orange-9">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat unelevated dense color="red-9">
          <q-icon name="delete" />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';

const props = defineProps({
  imgLink: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

const windowWidth = ref(window.innerWidth);
const showDialog = ref(false);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
});

watch(windowWidth, (newWidth) => {
  console.log(`Window width is now: ${newWidth}`);
});

const truncateDescription = (description) => {
  let limit;
  if (windowWidth.value > 1200) {
    limit = 110;
  } else if (windowWidth.value > 800) {
    limit = 150;
  } else {
    limit = 50;
  }
  return description.length > limit ? description.slice(0, limit) + '...' : description;
};
</script>

<style scoped>
.imagem {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-right: 1px solid #d3d2d2;
}

.actions {
  border-left: 1px solid #d3d2d2;
}

.card {
  background-color: #ffffff;

}

.responsive-text {
  font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  font-size: 1.3em;
  font-weight: 500;
}

@media (max-width: 600px) {
  .imagem {
    width: 100%;
    height: auto;
  }

  .responsive-text {
    font-size: 0.8em;
  }
}
</style>
