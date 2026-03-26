const navlinks = [
<<<<<<< HEAD
  {
    name: "Dashboard",
    path: "../pages/dashboard.html",
    icon: "../components/ui/dashboard.png",
    roles: ["guide","superadmin","techadmin","nontechadmin","opadmin"]
  },
  {
    name: "Operations & Bookings",
    path: "../pages/opsbook.html",
    icon: "../components/ui/operations.png",
    roles: ["superadmin"]
  },
  {
    name: "Users & Partners",
    path: "../pages/users.html",
    icon: "../components/ui/users.png",
    roles: ["superadmin"]
  },
  {
    name: "Finance & Reports",
    path: "../pages/finance.html",
    icon: "../components/ui/finance.png",
    roles: ["superadmin"]
  },
  {
    name: "System & Support",
    path: "../pages/system.html",
    icon: "../components/ui/system.png",
    roles: ["superadmin"]
  }
=======
    {name:"Dashboard",path:"../pages/dashboard.html",roles:["guide","mainadmin","superadmin","techadmin","nontechadmin","opadmin"]},
    {name:"Tour Reqests",path:"../pages/tour-requests.html",roles:["guide"]},
    {name:"Schedule",path:"../pages/schedule.html",roles:["guide"]},
    {name:"Earnings",path:"../pages/earnings.html",roles:["guide"]},
    {name:"Reviews",path:"../pages/reviews.html",roles:["guide"]},
    {name:"operations&booking",path:"../pages/opbooking.html",roles:["superadmin","opadmin"]}
>>>>>>> 06908858f7630dc50aa1a67d84b49efaac519ff1
];

export function getNavLinks(role){
    const currentPage = window.location.pathname.split("/").pop();
<<<<<<< HEAD

return navlinks
  .filter(link => link.roles.includes(role))
  .map(link => {
    const pageName = link.path.split("/").pop();

    return `
  <a href="${link.path}" class="nav-link ${currentPage === pageName ? "active" : ""}">
    <img src="${link.icon}" class="nav-icon" />
    ${link.name}
  </a>
`;
  })
  .join("");
=======
    return navlinks
        .filter(link => link.roles.includes(role))
        .map(link =>`
                    <a href ="${link.path}" class = "nav-link ${currentPage === link.path ? "active" : ""}">
                        <img src="../components/ui/${link.name}.svg" alt="Xploreo Logo"></img>
                        ${link.name}
                    </a>
                    `)
        .join("")
>>>>>>> 06908858f7630dc50aa1a67d84b49efaac519ff1
}