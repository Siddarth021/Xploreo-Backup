const navlinks = [
    {name:"Dashboard",path:"../pages/dashboard.html",roles:["guide","mainadmin","superadmin","techadmin","nontechadmin","opadmin"]},
    {name:"Tour Reqests",path:"../pages/tour-requests.html",roles:["guide"]},
    {name:"Schedule",path:"../pages/schedule.html",roles:["guide"]},
    {name:"Earnings",path:"../pages/earnings.html",roles:["guide"]},
    {name:"Reviews",path:"../pages/reviews.html",roles:["guide"]}
];

export function getNavLinks(role){
    const currentPage = window.location.pathname.split("/").pop();
    return navlinks
        .filter(link => link.roles.includes(role))
        .map(link =>`
                    <a href ="${link.path}" class = "nav-link ${currentPage === link.path ? "active" : ""}">
                        <img src="" alt="${link.name}"/> ${link.name}
                    </a>
                    `)
        .join("")
}