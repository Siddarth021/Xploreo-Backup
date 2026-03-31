const internalnavlinks = [
  {
    name: "Upcoming",
    status: "pending", 
    pages: ["tours.html"],
  },
  {
    name: "Ongoing",
    status: "ongoing",
    pages: ["tours.html"],
  },
  {
    name: "Completed",
    status: "completed",
    pages: ["tours.html"],
  }
];

export function getNavLinks(page) {
  return internalnavlinks.filter(link => link.pages.includes(page)); 
}