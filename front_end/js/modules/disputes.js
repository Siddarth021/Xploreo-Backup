export function getDisputesHTML() {
    return `
        <div class="dispute-header">
            <h2>Dispute Resolution Center</h2>
            <p>Escalated conflicts between partners, guides, and travelers.</p>
        </div>
        
        <div class="dispute-card">
            <table class="dispute-table">
                <thead>
                    <tr>
                        <th>DISPUTE CASE</th>
                        <th>BOOKING REF</th>
                        <th>ISSUE CATEGORY</th>
                        <th>SEVERITY</th>
                        <th>RESOLUTION FLOW</th>
                        <th>SYSTEM ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="case-link">4412</a></td>
                        <td><span class="ref-text">97001</span></td>
                        <td>
                            <span class="issue-main">Partner No-Show Claim</span>
                            <span class="issue-sub">Traveler documentation<br>provided via website</span>
                        </td>
                        <td><span class="severity-critical">CRITICAL</span></td>
                        <td>
                            <div class="flow-status">
                                <span class="dot dot-red"></span> Open Inquiry
                            </div>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn-resolve" data-case="4412" data-ref="97001" data-issue="Partner No-Show Claim">Resolve</button>
                                <button class="btn-escalate" data-case="4412" data-ref="97001" data-issue="Partner No-Show Claim">Escalate</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><a href="#" class="case-link">4410</a></td>
                        <td><span class="ref-text">97055</span></td>
                        <td>
                            <span class="issue-main">Vehicle Logistics Quality</span>
                            <span class="issue-sub">Reported AC failure<br>during desert excursion</span>
                        </td>
                        <td><span class="severity-standard">STANDARD</span></td>
                        <td>
                            <div class="flow-status">
                                <span class="dot dot-yellow"></span> Gathering Evidence
                            </div>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn-resolve" data-case="4410" data-ref="97055" data-issue="Vehicle Logistics Quality">Resolve</button>
                                <button class="btn-escalate" data-case="4410" data-ref="97055" data-issue="Vehicle Logistics Quality">Escalate</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}