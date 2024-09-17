import Alpine from "alpinejs";
import "../components/app/app";
import "../components/finder/finder";
import "../components/editor/editor";
import "../components/home/home";
import "../components/autocomplete/autocomplete";
import auth from "../utils/auth";
import icons from "../utils/icons";
import {
  defaultProtocol as modalProtocol,
  init as initModal,
} from "../utils/modal";
import { init as initClicksRetransmitter } from "../utils/clicks-retransmitter";
import protocol from "../protocol";
import Autosize from "@marcreichel/alpine-autosize";

window.icons = icons;
window.auth = auth;
window.Alpine = Alpine;

initModal();

initClicksRetransmitter({
  protocols: [protocol, modalProtocol],
});

Alpine.plugin(Autosize);
Alpine.start();
