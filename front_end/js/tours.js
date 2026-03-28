import { rendertourpagehearder } from "./modules/tour-page-header.js";
import { renderinternalnavbar } from "./modules/internal-navbar.js";
import { renderinternalcontents } from "./modules/internal-contents.js";

let currentActiveTab = "pending"

export function rendertourpage(containerId,currentUser) {
    
    rendertourpagehearder("tour-page-header",currentUser);
    renderinternalnavbar("tours-internal-navbar",currentActiveTab);
    console.log("hi");
    //renderinternalsearchbar("internal-search-bar",currentUser);
    renderinternalcontents("internal-contents",currentUser,currentActiveTab);
}

window.switchTab = (status) => {
    currentActiveTab = status;
    const user = JSON.parse(localStorage.getItem("currentUser"));
    rendertourpage("main", user); 
};