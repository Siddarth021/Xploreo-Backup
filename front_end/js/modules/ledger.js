export function getLedgerHTML() {
    return `
        <div class="section-header" style="margin-top: 40px;">
            <h2>Comprehensive Ledger</h2>
            <p>Detailed transactional audit of every journey across the network.</p>
        </div>
        <div class="ledger-card">
            <table class="ledger-table">
                <thead>
                    <tr>
                        <th>ID REFERENCE</th>
                        <th>TRAVELER ACCOUNT</th>
                        <th>EXPERIENCE SERVICE</th>
                        <th>DEPLOYMENT DATE</th>
                        <th>LEAD GUIDE</th>
                        <th>LEDGER STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="id-link">98421</a></td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-blue">EM</div>
                                <div class="text-stack">
                                    <span class="main-text">Elena Moretti</span>
                                    <span class="sub-text">Premium Member</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="text-stack">
                                <span class="main-text">Venice Gondola Private Tour</span>
                                <span class="sub-text">Luxe Tier</span>
                            </div>
                        </td>
                        <td class="date-text">Oct 24, 2024</td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-gray">MP</div>
                                <span class="main-text">Marco Polo</span>
                            </div>
                        </td>
                        <td><span class="status-badge status-confirmed">CONFIRMED</span></td>
                    </tr>
                    <tr>
                        <td><a href="#" class="id-link">98420</a></td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-blue">JS</div>
                                <div class="text-stack">
                                    <span class="main-text">James Smith</span>
                                    <span class="sub-text">Corporate</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="text-stack">
                                <span class="main-text">Kyoto Temple Hike</span>
                                <span class="sub-text">Full Day</span>
                            </div>
                        </td>
                        <td class="date-text">Oct 24, 2024</td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-gray">YT</div>
                                <span class="main-text">Yuki Tanaka</span>
                            </div>
                        </td>
                        <td><span class="status-badge status-ongoing">ONGOING</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}