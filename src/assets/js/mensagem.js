import { Dialog } from "quasar";
import Mensagem from "src/components/modals/Mensagem.vue";

export default function exibeMensagem({mensagem, botao, acao}) {

  return Dialog.create({
    component: Mensagem,
    componentProps: {
      mensagem,
      botao,
      acao,
    },
  });
}
