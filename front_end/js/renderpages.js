import {renderdasboard} from "./dashboard.js"

export function renderPageContent(user){
    const path = window.location.pathname.split("/").pop();
    if(user.role === "guide" && path == "dashboard.html" ){
        renderdasboard(user);
    }
    
}