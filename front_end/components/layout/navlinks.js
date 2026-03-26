const navlinks = [
    {name:"Dashboard",path:"dashboard.html",roles:["guide","mainadmin","superadmin","techadmin","nontechadmin","opadmin"]},
    {name:"Tour Reqests",path:"tour-requests.html",roles:["guide"]},
    {name:"Schedule",path:"schedule.html",roles:["guide"]},
    {name:"Earnings",path:"earnings.html",roles:["guide"]},
    {name:"Reviews",path:"reviews.html",roles:["guide"]}
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