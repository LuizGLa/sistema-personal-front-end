const routes = [

  {
    name: 'erro',
    path: '/:catchAll(.*)*',
    component: () => module.require('pages/commons/Error404.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => module.require('pages/Login.vue'),
  },
  {
    path: '/',
    component: () => module.require('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => module.require('src/pages/Redirect.vue'),
        meta: { requiredLogin: true },
      },
      {
        path: '/perfil',
        component: () => module.require('src/pages/commons/Perfil.vue'),
        meta: { requiredLogin: true },
      },
      {
        path: '/a/',
        meta: { requiredLogin: true, requiredAdminLevel: true },
        children: [
          {
            path: '',
            component: () => module.require('src/pages/Admin/Home.vue'),
          },
          {
            path: '/usuarios',
            component: () => module.require('src/pages/Admin/Usuarios.vue'),
          },
          {
            path: '/usuarios/adicionar',
            component: () => module.require('src/pages/Admin/AdicionarUsuario.vue'),
          },
          {
            path: '/usuarios/editar/:id',
            component: () => module.require('src/pages/commons/EditarUsuario.vue'),
          },
        ],
      },
      {
        path: '/u/',
        meta: { requiredLogin: true },
        children: [
          {
            path: '',
            component: () => module.require('src/pages/Usuario/Home.vue'),
          },
          {
            path: '/editar/:id',
            component: () => module.require('src/pages/commons/EditarUsuario.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
