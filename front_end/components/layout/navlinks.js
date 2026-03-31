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
  },
  {
    name: "Tours",
    path: "../pages/tours.html",
    icon: "../components/ui/tours.svg",
    roles: ["guide"]
  },
  {
    name: "Schedule",
    path: "../pages/schedule.html",
    icon: "../components/ui/schedule.svg",
    roles: ["guide"]
  },
  {
    name: "Earning",
    path: "../pages/earnings.html",
    icon: "../components/ui/earnings.svg",
    roles: ["guide"]
  },
  {
    name: "Reviews",
    path: "../pages/reviews.html",
    icon: "../components/ui/reviews.svg",
    roles: ["guide"]
  },
  {
    name: "Dashboard",
    path: "../pages/hotelDashboard.html",
    icon: "../components/ui/dashboard.svg",
    roles: ["hotel"]
  },
  {
    name: "Bookings",
    path: "../pages/hotelBookings.html",
    icon: "../components/ui/operations.png",
    roles: ["hotel"]
  },
  {
    name: "Services",
    path: "../pages/hotelRooms.html",
    icon: "../components/ui/tours.svg",
    roles: ["hotel"]
  },
  {
    name: "Earnings",
    path: "../pages/hotelEarning.html",
    icon: "../components/ui/earnings.svg",
    roles: ["hotel"]
  },

  
   
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