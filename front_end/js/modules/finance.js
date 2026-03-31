export function initFinance() {
    const mainContainer = document.getElementById("main");
    if (!mainContainer) return;

    // =======================
    // 🔹 CHART DATA STATES
    // =======================
    const chartData = {
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

    // =======================
    // 🔹 FINANCE STATS DATA
    // =======================
    const financeData = [
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

    // =======================
    // 🔹 HTML SKELETON
    // =======================
    mainContainer.innerHTML = `
        <div class="page-header" style="margin-bottom: 32px;">
            <h1 class="page-title" style="margin-top: 0; font-size: 28px; color: #1a202c; font-weight: 700;">
                Finance & Analytics Hub
            </h1>
            <p class="page-subtitle" style="margin: 8px 0 0; font-size: 15px; color: #4a5568; line-height: 1.5;">
                Monitor your platform's financial health, manage partner commissions, and generate detailed performance reports.
            </p>
        </div>
        
        <div id="finance-content" style="display: flex; flex-direction: column; gap: 24px;">
            
            <div id="finance-stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
                ${financeData.map(stat => `
                    <div class="stat-card ${stat.color}">
                        <div class="card-icon">
                            <img src="${stat.icon}" alt="icon">
                        </div>
                        <p class="stat-label">${stat.label}</p>
                        <h2 class="stat-value">${stat.value}</h2>
                        <p class="stat-subtext ${stat.subClass || ""}">${stat.subtext}</p>
                    </div>
                `).join('')}
            </div>

            <div style="background: #fff; border-radius: 20px; border: 1px solid #edf2f7; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
                    <div>
                        <h3 style="margin: 0; font-size: 20px; color: #1a202c; font-weight: 700;">Earnings Performance</h3>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #718096;">Daily gross revenue across all travel categories</p>
                    </div>
                    <div style="display: flex; background: #f7fafc; padding: 4px; border-radius: 10px; gap: 4px;">
                        <button data-period="weekly" class="chart-toggle-btn" style="border: none; background: transparent; padding: 8px 16px; font-size: 13px; color: #718096; cursor: pointer; border-radius: 8px; font-weight: 600; transition: all 0.2s;">Weekly</button>
                        <button data-period="monthly" class="chart-toggle-btn" style="border: none; background: #fff; padding: 8px 16px; font-size: 13px; color: #2b6cb0; cursor: pointer; border-radius: 8px; font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s;">Monthly</button>
                        <button data-period="yearly" class="chart-toggle-btn" style="border: none; background: transparent; padding: 8px 16px; font-size: 13px; color: #718096; cursor: pointer; border-radius: 8px; font-weight: 600; transition: all 0.2s;">Yearly</button>
                    </div>
                </div>
                <div id="chart-visual-area" style="position: relative; height: 320px; width: 100%;"></div>
            </div>

            <div style="background: #fff; border-radius: 20px; border: 1px solid #edf2f7; padding: 32px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="padding: 0 32px 24px 32px; display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3 style="margin: 0; font-size: 20px; color: #1a202c; font-weight: 700;">Payout Management Hub</h3>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #718096;">Manage disbursements to global travel agencies and tour operators.</p>
                    </div>
                    <div style="display: flex; background: #f7fafc; padding: 4px; border-radius: 8px; border: 1px solid #edf2f7; gap: 4px;">
                        <button class="payout-filter-btn active" data-filter="all" style="border: none; background: #fff; padding: 6px 12px; font-size: 12px; color: #2b6cb0; cursor: pointer; border-radius: 6px; font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s;">All</button>
                        <button class="payout-filter-btn" data-filter="paid" style="border: none; background: transparent; padding: 6px 12px; font-size: 12px; color: #718096; cursor: pointer; border-radius: 6px; font-weight: 600; transition: all 0.2s;">Paid</button>
                        <button class="payout-filter-btn" data-filter="pending" style="border: none; background: transparent; padding: 6px 12px; font-size: 12px; color: #718096; cursor: pointer; border-radius: 6px; font-weight: 600; transition: all 0.2s;">Pending</button>
                        <button class="payout-filter-btn" data-filter="failed" style="border: none; background: transparent; padding: 6px 12px; font-size: 12px; color: #718096; cursor: pointer; border-radius: 6px; font-weight: 600; transition: all 0.2s;">Failed</button>
                    </div>
                </div>

                <div style="width: 100%; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="background: #f7fafc; border-bottom: 1px solid #edf2f7; border-top: 1px solid #edf2f7; color: #4a5568; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                                <th style="padding: 16px 32px;">Partner Agency</th>
                                <th style="padding: 16px 32px;">Amount</th>
                                <th style="padding: 16px 32px;">Status</th>
                                <th style="padding: 16px 32px;">Date</th>
                            </tr>
                        </thead>
                        <tbody id="payout-table-body" style="font-size: 14px; background: #fcfcfc;">
                            <tr class="payout-row" data-status="paid" style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 24px 32px;">
                                    <div style="display: flex; align-items: center; gap: 16px;">
                                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ebf8ff; color: #2b6cb0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">SM</div>
                                        <div>
                                            <div style="font-weight: 700; color: #2d3748; font-size: 15px;">Skyline Meridians</div>
                                            <div style="font-size: 12px; color: #a0aec0; margin-top: 4px; font-weight: 500;">ID: #PAY-8821</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 24px 32px; font-weight: 800; color: #1a202c; font-size: 15px;">₹12.4L</td>
                                <td style="padding: 24px 32px;">
                                    <span style="background: #e6fffa; color: #234e52; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #319795;"></span> Paid
                                    </span>
                                </td>
                                <td style="padding: 24px 32px; color: #718096; font-weight: 500;">Oct 24, 2023</td>
                            </tr>
                            
                            <tr class="payout-row" data-status="pending" style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 24px 32px;">
                                    <div style="display: flex; align-items: center; gap: 16px;">
                                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ebf8ff; color: #2b6cb0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">AV</div>
                                        <div>
                                            <div style="font-weight: 700; color: #2d3748; font-size: 15px;">Azure Voyages</div>
                                            <div style="font-size: 12px; color: #a0aec0; margin-top: 4px; font-weight: 500;">ID: #PAY-8822</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 24px 32px; font-weight: 800; color: #1a202c; font-size: 15px;">₹8.12L</td>
                                <td style="padding: 24px 32px;">
                                    <span style="background: #edf2f7; color: #4a5568; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #a0aec0;"></span> Pending
                                    </span>
                                </td>
                                <td style="padding: 24px 32px; color: #718096; font-weight: 500;">Oct 26, 2023</td>
                            </tr>

                            <tr class="payout-row" data-status="failed" style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 24px 32px;">
                                    <div style="display: flex; align-items: center; gap: 16px;">
                                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff5f5; color: #c53030; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">TP</div>
                                        <div>
                                            <div style="font-weight: 700; color: #2d3748; font-size: 15px;">Tropical Pathways</div>
                                            <div style="font-size: 12px; color: #a0aec0; margin-top: 4px; font-weight: 500;">ID: #PAY-8823</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 24px 32px; font-weight: 800; color: #1a202c; font-size: 15px;">₹3.9L</td>
                                <td style="padding: 24px 32px;">
                                    <span style="background: #fff5f5; color: #9b2c2c; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #e53e3e;"></span> Failed
                                    </span>
                                </td>
                                <td style="padding: 24px 32px; color: #718096; font-weight: 500;">Oct 22, 2023</td>
                            </tr>

                            <tr class="payout-row" data-status="paid" style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 24px 32px;">
                                    <div style="display: flex; align-items: center; gap: 16px;">
                                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #ebf8ff; color: #2b6cb0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">NB</div>
                                        <div>
                                            <div style="font-weight: 700; color: #2d3748; font-size: 15px;">Nordic Blue Travel</div>
                                            <div style="font-size: 12px; color: #a0aec0; margin-top: 4px; font-weight: 500;">ID: #PAY-8824</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 24px 32px; font-weight: 800; color: #1a202c; font-size: 15px;">₹22.4L</td>
                                <td style="padding: 24px 32px;">
                                    <span style="background: #e6fffa; color: #234e52; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                                        <span style="width: 6px; height: 6px; border-radius: 50%; background: #319795;"></span> Paid
                                    </span>
                                </td>
                                <td style="padding: 24px 32px; color: #718096; font-weight: 500;">Oct 20, 2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;

    // =======================
    // 🔹 CHART RENDER LOGIC
    // =======================
    const renderChart = (period) => {
        const data = chartData[period];
        const visualArea = document.getElementById('chart-visual-area');
        
        document.querySelectorAll('.chart-toggle-btn').forEach(btn => {
            if (btn.dataset.period === period) {
                btn.style.background = '#fff';
                btn.style.color = '#2b6cb0';
                btn.style.fontWeight = '700';
                btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            } else {
                btn.style.background = 'transparent';
                btn.style.color = '#718096';
                btn.style.fontWeight = '600';
                btn.style.boxShadow = 'none';
            }
        });

        visualArea.innerHTML = `
            <div style="position: absolute; top: 30px; left: ${data.tooltipLeft}; transform: translateX(-50%); background: #fff; padding: 16px 24px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); z-index: 10; min-width: 140px; border: 1px solid #f2f5f8; transition: all 0.3s ease;">
                <div style="font-size: 11px; color: #a0aec0; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.05em; text-transform: uppercase;">${data.tooltipDate}</div>
                <div style="font-size: 24px; color: #2b6cb0; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.02em;">${data.tooltipValue}</div>
                <div style="font-size: 13px; color: #38a169; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    ${data.tooltipGrowth}
                </div>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 1000 280" preserveAspectRatio="none" style="overflow: visible;">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3182ce" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#3182ce" stop-opacity="0.0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                <path d="${data.pathD} L 1000 280 L 0 280 Z" fill="url(#chartGradient)" />
                <path d="${data.pathD}" fill="none" stroke="#2b6cb0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                
                <g transform="translate(${data.dotX}, ${data.dotY})">
                    <circle cx="0" cy="0" r="14" fill="#ebf8ff" opacity="0.6" filter="url(#glow)"/>
                    <circle cx="0" cy="0" r="6" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="3" />
                    <circle cx="0" cy="0" r="2.5" fill="#2b6cb0" />
                </g>
            </svg>

            <div style="display: flex; justify-content: space-between; position: absolute; bottom: 0; left: 0; right: 0; padding: 0 10px; color: #a0aec0; font-size: 11px; font-weight: 700; letter-spacing: 0.05em;">
                ${data.labels}
            </div>
        `;
    };

    renderChart('monthly');

    document.querySelectorAll('.chart-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const period = e.target.dataset.period;
            renderChart(period);
        });
    });

    // =======================
    // 🔹 PAYOUT FILTER LOGIC
    // =======================
    const filterBtns = document.querySelectorAll('.payout-filter-btn');
    const payoutRows = document.querySelectorAll('.payout-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Reset active styles
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = '#718096';
                b.style.fontWeight = '600';
                b.style.boxShadow = 'none';
            });

            // Set clicked button to active
            const targetBtn = e.target;
            targetBtn.classList.add('active');
            targetBtn.style.background = '#fff';
            targetBtn.style.color = '#2b6cb0';
            targetBtn.style.fontWeight = '700';
            targetBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

            // Filter rows based on data-status
            const filterValue = targetBtn.dataset.filter;
            payoutRows.forEach(row => {
                if (filterValue === 'all' || row.dataset.status === filterValue) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}