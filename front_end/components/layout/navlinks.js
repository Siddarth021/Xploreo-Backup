const navlinks = [
  {
    name: "Dashboard",
    path: "../pages/dashboard.html",
    icon: "../components/ui/dashboard.svg",
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
];

export function getNavLinks(role){
  const currentPage = window.location.pathname.split("/").pop();

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
}