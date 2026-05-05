export const chartData = {
    weekly: {
        tooltipDate: "Sat, Oct 21",
        tooltipValue: "₹1.8L",
        tooltipGrowth: "+12%",
        tooltipLeft: "78%",
        dotX: 780,
        dotY: 100,
        pathD: "M 0 200 C 150 180, 200 240, 300 240 C 400 150, 450 100, 550 160 C 650 200, 700 200, 780 100 C 850 0, 950 180, 1000 40",
        labels: "<span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>"
    },
    monthly: {
        tooltipDate: "OCT 18, 2023",
        tooltipValue: "₹4.28L",
        tooltipGrowth: "+8%",
        tooltipLeft: "58%",
        dotX: 580,
        dotY: 70,
        pathD: "M 0 220 C 150 210, 200 220, 350 140 C 450 80, 520 70, 580 70 C 650 70, 720 120, 800 90 C 880 60, 1000 130, 1000 130",
        labels: "<span>01 OCT</span><span>08 OCT</span><span>15 OCT</span><span>22 OCT</span><span>29 OCT</span><span>31 OCT</span>"
    },
    yearly: {
        tooltipDate: "NOV 2023",
        tooltipValue: "₹3.42Cr",
        tooltipGrowth: "+24%",
        tooltipLeft: "85%",
        dotX: 850,
        dotY: 50,
        pathD: "M 0 250 C 200 240, 300 180, 400 200 C 500 220, 600 150, 700 120 C 800 90, 850 50, 1000 20",
        labels: "<span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span>"
    }
};

export const financeStats = [
    {
        label: "TOTAL REVENUE",
        value: "₹24.8Cr",
        subtext: "↗ +12.5% vs last year",
        subClass: "green",
        color: "blue",
        icon: "../components/ui/finance.png"
    },
    {
        label: "MONTHLY REVENUE",
        value: "₹2.1Cr",
        subtext: "↗ +4.2% from June",
        subClass: "green",
        color: "dark-green",
        icon: "../components/ui/finance.png"
    },
    {
        label: "PENDING PAYOUTS",
        value: "₹42L",
        subtext: "Next cycle: Aug 1st",
        subClass: "blue-text",
        color: "violet",
        icon: "../components/ui/operations.png"
    },
    {
        label: "COMPLETED PAYOUTS",
        value: "₹19Cr",
        subtext: "Last payment 2h ago",
        subClass: "", 
        color: "orange",
        icon: "../components/ui/finance.png"
    }
];

export const payoutData = [
    { id: "PAY-8821", name: "Skyline Meridians", initials: "SM", amount: "₹12.4L", status: "paid", date: "Oct 24, 2023" },
    { id: "PAY-8822", name: "Azure Voyages", initials: "AV", amount: "₹8.12L", status: "pending", date: "Oct 26, 2023" },
    { id: "PAY-8823", name: "Tropical Pathways", initials: "TP", amount: "₹3.9L", status: "failed", date: "Oct 22, 2023" },
    { id: "PAY-8824", name: "Nordic Blue Travel", initials: "NB", amount: "₹22.4L", status: "paid", date: "Oct 20, 2023" },
    { id: "PAY-8825", name: "Global Compass", initials: "GC", amount: "₹5.6L", status: "pending", date: "Oct 28, 2023" } // Added an extra one to prove it's dynamic!
];