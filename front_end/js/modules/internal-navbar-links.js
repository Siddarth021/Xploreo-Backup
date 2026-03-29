const internalnavlinks = [
  {
    name: "Upcoming",
    status: "pending", // Used for filtering your tours
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
  console.log(internalnavlinks);
  return internalnavlinks.filter(link => link.pages.includes(page)); 
}