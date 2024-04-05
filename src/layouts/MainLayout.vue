<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar class="row" style="background-color: #003C43;\">
        <div class="col-lg-4 col-sm-4 col-md-2">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>

        <div class="xs-hide col-sm-4 col-md-8 col-lg-4">
          <q-toolbar-title class="flex flex-center" style="line-height: normal">
            <img src="../assets/images/logoAdmin.png" alt="Logo" class="logo" style="height: 70px; margin: 7px;" />
          </q-toolbar-title>
        </div>
        <div class="col-6 col-sm-4 col-md-2 col-lg-4" style="text-align: right">
          <q-btn
            color="white"
            class="text-cyan-9"
            :label="acesso"
            icon="account_circle"
          >
            <q-menu fit anchor="bottom left" self="top left" :offset="[2, 2]">
              <q-item
                clickable
                tag="a"
                @click="perfil"
                exact
                class="row items-center"
              >
                <q-item-section>Perfil</q-item-section>
                <q-icon name="account_circle" size="sm" />
              </q-item>
              <q-item
                clickable
                tag="a"
                @click="sair"
                exact
                class="row items-center"
              >
                <q-item-section>Sair</q-item-section>
                <q-icon name="logout" size="sm" />
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div>
        <q-drawer
          behavior="desktop"
          :width="190"
          v-model="leftDrawerOpen"
          :overlay="!modoExibicao"
          show-if-above
          class="q-py-md bg-grey-2"
          bordered
        >
          <q-list>
            <EssentialLink
              v-for="link in links"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </q-drawer>
      </div>
      <router-view class="q-pa-md" />
    </q-page-container>

    <q-footer style="background-color: #003C43;" elevated class=" q-pa-xs text-white text-center">
      <span>LCode © 2024</span>
    </q-footer>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import EssentialLink from 'components/commons/EssentialLink.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  components: {
    EssentialLink,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const modoExibicao = $q.platform.is.desktop;
    const acesso = ref('');
    const userName = ref('');

    const links = ref([]);

    onMounted(async () => {
      configurarMenu();
    });

    function configurarMenu() {
      const accessLevel = window.sessionStorage.getItem('access_level');
      const user = window.sessionStorage.getItem('user');
      userName.value = user;
      if (accessLevel === 'Administrador') {
        // ITENS DE NAVEGAÇÃO ADMIN

        links.value.push(
          {
            title: 'Início',
            icon: 'home',
            link: `/a/`,
          },
          {
            title: 'Alunos',
            icon: 'groups',
            link: '/alunos',
          },
          {
            title: 'Usuários',
            icon: 'group',
            link: '/usuarios',
          },
          {
            title: 'Perfil',
            icon: 'account_circle',
            link: `/perfil`,
          },
        );

        acesso.value = 'admin';
      } else {

        links.value.push(
          {
            title: 'Início',
            icon: 'home',
            link: `/u/`,
          },
          {
            title: 'Perfil',
            icon: 'account_circle',
            link: `/perfil`,
          },
        );

        acesso.value = 'usuário';
      }
    }

    async function perfil() {
      router.push('/perfil');
    }

    async function sair() {
      router.push('/login');
      await store.dispatch('auth/signOut');
    }

    const leftDrawerOpen = ref(false);

    return {
      modoExibicao,
      links,
      leftDrawerOpen,
      acesso,
      perfil,
      userName,
      sair,
    };
  },
};
</script>
<style scoped>
.selected-link {
  background-color: #5cb85c; /* Altere para a cor desejada */
}
</style>
