import { renderNavbar } from "../components/layout/navbar.js";
const user = {
  name: "Sreekar",
  role: "superadmin"
};

console.log("App running");
localStorage.setItem("currentUser", JSON.stringify(user));
renderNavbar(user);