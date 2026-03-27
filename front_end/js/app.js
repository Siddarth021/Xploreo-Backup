import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent} from "./renderpages.js"

const user = {
  name: "Sreekar",
  role: "guide",
  email: "sreekarkothapalli@gmail.com"
}
if (user) {
    renderNavbar(user);
    document.addEventListener("DOMContentLoaded", () => {
    renderPageContent(user); 
});
} else {
    console.log("No user found, redirecting to login...");
    window.location.href = "../pages/login.html"; 
}