export const experiences = [
  {
    id: 1,
    title: "Sunset Beach Photography Walk",
    price: 75,
    duration: "2 hours",
    capacity: 12,
    status: "active",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    nextSlot: "10:00 AM",
    booked: 8,
    slots: [
      { id: "1-1", date: "2026-03-27", time: "10:00 AM", booked: 8, capacity: 12, available: true },
      { id: "1-2", date: "2026-03-27", time: "2:00 PM", booked: 11, capacity: 12, available: true },
      { id: "1-3", date: "2026-03-28", time: "10:00 AM", booked: 3, capacity: 12, available: true },
      { id: "1-4", date: "2026-03-28", time: "2:00 PM", booked: 0, capacity: 12, available: true },
      { id: "1-5", date: "2026-03-29", time: "10:00 AM", booked: 5, capacity: 12, available: true },
      { id: "1-6", date: "2026-03-29", time: "2:00 PM", booked: 9, capacity: 12, available: false }
    ]
  },
  {
    id: 2,
    title: "Historic Downtown Food Tour",
    price: 80,
    duration: "3 hours",
    capacity: 12,
    status: "active",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    nextSlot: "2:00 PM",
    booked: 11,
    slots: [
      { id: "2-1", date: "2026-03-27", time: "10:00 AM", booked: 6, capacity: 12, available: true },
      { id: "2-2", date: "2026-03-27", time: "2:00 PM", booked: 11, capacity: 12, available: true },
      { id: "2-3", date: "2026-03-28", time: "10:00 AM", booked: 4, capacity: 12, available: true },
      { id: "2-4", date: "2026-03-28", time: "2:00 PM", booked: 8, capacity: 12, available: true },
      { id: "2-5", date: "2026-03-29", time: "10:00 AM", booked: 7, capacity: 12, available: true },
      { id: "2-6", date: "2026-03-29", time: "2:00 PM", booked: 10, capacity: 12, available: true }
    ]
  },
  {
    id: 3,
    title: "Mountain Hiking Adventure",
    price: 90,
    duration: "4 hours",
    capacity: 15,
    status: "inactive",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    nextSlot: "6:00 AM",
    booked: 0,
    slots: [
      { id: "3-1", date: "2026-03-27", time: "6:00 AM", booked: 15, capacity: 15, available: true },
      { id: "3-2", date: "2026-03-27", time: "2:00 PM", booked: 5, capacity: 15, available: false },
      { id: "3-3", date: "2026-03-28", time: "6:00 AM", booked: 3, capacity: 15, available: true },
      { id: "3-4", date: "2026-03-28", time: "2:00 PM", booked: 0, capacity: 15, available: true },
      { id: "3-5", date: "2026-03-29", time: "6:00 AM", booked: 6, capacity: 15, available: true },
      { id: "3-6", date: "2026-03-29", time: "2:00 PM", booked: 12, capacity: 15, available: false }
    ]
  }
];
