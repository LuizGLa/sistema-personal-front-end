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
            component: () => module.require('src/pages/Admin/usuarios/Usuarios.vue'),
          },
          {
            path: '/usuarios/adicionar',
            component: () => module.require('src/pages/Admin/usuarios/AdicionarUsuario.vue'),
          },
          {
            path: '/usuarios/editar/:id',
            component: () => module.require('src/pages/Admin/usuarios/EditarUsuario.vue'),
          },
          {
            path: '/alunos',
            component: () => module.require('src/pages/Admin/alunos/Alunos.vue'),
          },
          {
            path: '/alunos/adicionar',
            component: () => module.require('src/pages/Admin/alunos/AdicionarAluno.vue'),
          },
          {
            path: '/alunos/editar/:id',
            component: () => module.require('src/pages/Admin/alunos/EditarAluno.vue'),
          },
          {
            path: '/exercicios',
            component: () => module.require('src/pages/Admin/exercicios/Exercicios.vue'),
          },
          {
            path: '/exercicios/adicionar',
            component: () => module.require('src/pages/Admin/exercicios/AdicionarExercicio.vue'),
          },
          {
            path: '/exercicios/editar/:id',
            component: () => module.require('src/pages/Admin/exercicios/EditarExercicio.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
