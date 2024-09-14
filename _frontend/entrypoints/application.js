import Alpine from "alpinejs";
import "./components/header";
import "./components/finder";
import auth from "./utils/auth";
import icons from "./utils/icons";

window.icons = icons;

window.auth = auth;
window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
