<template>
  <q-page>
    <cti-card icone="people" titulo="Alunos do Sistema">
      <cti-tabela
        title="Lista de alunos"
        :colunas="colunas"
        rota="alunos"
        rota_adicionar="/alunos/adicionar"
        botao="Adicionar Aluno"
        :acoes="acoes"
        :itensPorPagina="10"
      />
    </cti-card>
  </q-page>
</template>

<script setup>
import exibeMensagem from "src/assets/js/mensagem";
import exibiNotificacao from "src/assets/js/notificacao";
import { api } from "src/boot/axios";
import CtiCard from "src/components/commons/CtiCard.vue";
import CtiTabela from "src/components/tables/CtiTabela.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const colunas = ref([
  {
    name: "nome",
    required: true,
    label: "Nome",
    align: "left",
    field: "nome",
    sortable: true,
  },
  {
    name: "login",
    align: "center",
    label: "Login",
    field: "login",
    sortable: true,
  },
  {
    name: "idade",
    align: "center",
    label: "Idade",
    field: "idade",
    sortable: true,
  },
  {
    name: "peso",
    align: "center",
    label: "Peso",
    field: row => row.peso + " kg",
    sortable: true,
  },
  {
    name: "altura",
    align: "center",
    label: "Altura",
    field: row => row.altura + " m",
    sortable: true,
  },
  {
    name: "situacao",
    align: "center",
    label: "Situação",
    field: "situacao",
    sortable: true,
  },
  {
    name: "acoes",
    field: "acoes",
    align: "center",
    label: "Ações",
    sortable: true,
  },
]);

async function deleta(aluno) {
  try {
    const { status } = await api.delete(`alunos/${aluno.id}`);
    const recarregar = () => location.reload()

    if (status == 200) {
      exibiNotificacao(
        "positive",
        `${aluno.nome} removido(a) com sucesso!`,
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
      router.push("/alunos/editar/" + row.id);
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
