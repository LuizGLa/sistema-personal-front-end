import { boot } from "quasar/wrappers";
import CtiCard from "../components/globais/CtiCard";

export default boot(async ({ app }) => {
  app.component("cti-card", CtiCard);
});
