import Alpine from "alpinejs";
import "../components/app/app";
import "../components/finder/finder";
import "../components/editor/editor";
import "../components/home/home";
import auth from "../utils/auth";
import icons from "../utils/icons";

window.icons = icons;

window.auth = auth;
window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
