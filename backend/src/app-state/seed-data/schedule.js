export const initialScheduleData = {
    availability: [
        { day: "Monday", active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] },
        { day: "Tuesday", active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] },
        { day: "Wednesday", active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] },
        { day: "Thursday", active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] },
        { day: "Friday", active: true, slots: [{ start: "9:00 AM", end: "5:00 PM" }] },
        { day: "Saturday", active: true, slots: [{ start: "10:00 AM", end: "4:00 PM" }] },
        { day: "Sunday", active: false, slots: [] }
    ],
    blockedDates: [
        { id: 1, range: "April 10-15, 2026", reason: "Spring Vacation" },
        { id: 2, range: "May 1, 2026", reason: "Public Holiday" }
    ]
};
