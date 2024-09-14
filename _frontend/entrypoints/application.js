import Alpine from "alpinejs";
import "./components/auth_page";

window.auth = {
  user: JSON.parse(localStorage["user"] ?? "null"),

  login(user) {
    console.log("login", user);
    localStorage["user"] = JSON.stringify(user);
  },

  logout() {
    console.log("logout");
    delete localStorage["user"];
  },

  check() {
    return Boolean(this.user);
  },
};

window.Alpine = Alpine;

Alpine.start();

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'
