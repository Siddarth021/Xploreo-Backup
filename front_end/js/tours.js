import { rendertourpagehearder } from "./modules/tour-page-header.js";


export function rendertourpage(containerId,currentUser) {
    rendertourpagehearder("tour-page-header",currentUser);
    renderinternalnavbar("tours-internal-navbar",currentUser);
    renderinternalsearchbar("internal-search-bar",currentUser);
    renterinternalcontents("internal-contents",currentUser);
}