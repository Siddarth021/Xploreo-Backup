export function renderChart(containerId) {
    const container = document.getElementById(containerId);

    const datasets = {
        weekly: [
            { label: "MON", value: 40 },
            { label: "TUE", value: 60 },
            { label: "WED", value: 85 },
            { label: "THU", value: 100 },
            { label: "FRI", value: 70 },
            { label: "SAT", value: 50 },
            { label: "SUN", value: 90 }
        ],

        monthly: [
            { label: "JAN", value: 40 },
            { label: "FEB", value: 25 },
            { label: "MAR", value: 50 },
            { label: "APR", value: 70 },
            { label: "MAY", value: 90 },
            { label: "JUN", value: 110 },
            { label: "JUL", value: 130 },
            { label: "AUG", value: 120 },
            { label: "SEP", value: 100 },
            { label: "OCT", value: 70 },
            { label: "NOV", value: 60 },
            { label: "DEC", value: 50 }
        ],

        quarterly: [
            { label: "Q1", value: 120 },
            { label: "Q2", value: 180 },
            { label: "Q3", value: 240 },
            { label: "Q4", value: 200 }
        ]
    };

    container.innerHTML = `
        <div class="chart-card">

            <div class="chart-header">
                <div>
                    <h3>Booking Velocity & Engagement</h3>
                    <p>Detailed comparison between seasonal expectations and real-time transaction volume</p>
                </div>

                <div class="chart-toggle">
                    <button class="active" data-type="weekly">Weekly</button>
                    <button data-type="monthly">Monthly</button>
                    <button data-type="quarterly">Quarterly</button>
                </div>
            </div>

            <div class="chart-body" id="chart-body"></div>

        </div>
    `;

    function renderBars(type) {
        const data = datasets[type];
        const chartBody = document.getElementById("chart-body");

        const max = Math.max(...data.map(d => d.value));

        chartBody.innerHTML = data.map((d, i) => {
            const isPeak = d.value === max;

            let extraClass = "";

            // monthly special (AUG darker)
            if (type === "monthly" && i === 7) {
                extraClass = "dark";
            }

            // quarterly special (Q4 darker)
            if (type === "quarterly" && i === 3) {
                extraClass = "dark";
            }

            return `
    <div class="bar-wrapper">
        <div class="bar ${isPeak ? "peak" : ""} ${extraClass}" 
             style="height:0%" 
             data-height="${(d.value / max) * 100}">
        </div>

        ${
            isPeak
                ? `<span class="peak-label">PEAK: ${d.value}</span>`
                : `<span class="bar-tooltip ${extraClass}">${d.value}</span>`
        }

        <span class="day">${d.label}</span>
    </div>
`;
        }).join("");

        // animate
        setTimeout(() => {
            document.querySelectorAll(".bar").forEach(bar => {
                bar.style.height = bar.dataset.height + "%";
            });
        }, 100);
    }

    // initial load
    renderBars("weekly");

    // toggle buttons
    const buttons = container.querySelectorAll(".chart-toggle button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            renderBars(btn.dataset.type);
        });
    });
}