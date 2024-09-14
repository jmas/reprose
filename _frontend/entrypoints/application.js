import Alpine from "alpinejs";
import "./components/repos";
import auth from "./utils/auth";

window.auth = auth;
window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
