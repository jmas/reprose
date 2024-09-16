import Alpine from "alpinejs";
import "../components/app/app";
import "../components/finder/finder";
import "../components/editor/editor";
import "../components/home/home";
import auth from "../utils/auth";
import icons from "../utils/icons";
import {
  defaultProtocol as modalProtocol,
  init as initModal,
} from "../utils/modal";
import { init as initClicksRetransmitter } from "../utils/clicks-retransmitter";
import protocol from "../protocol";

window.icons = icons;
window.auth = auth;
window.Alpine = Alpine;

initModal();

initClicksRetransmitter({
  protocols: [protocol, modalProtocol],
});

Alpine.start();
