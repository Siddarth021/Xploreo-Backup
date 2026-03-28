const internalnavlinks = [
  {
    name: "Upcoming",
    status: "Pending", // Used for filtering your tours
    pages: ["tours.html"],
  },
  {
    name: "Ongoing",
    status: "Ongoing",
    pages: ["tours.html"],
  },
  {
    name: "Completed",
    status: "Completed",
    pages: ["tours.html"],
  }
];

export function getNavLinks(page) {
  console.log(internalnavlinks);
  return internalnavlinks.filter(link => link.pages.includes(page)); 
}