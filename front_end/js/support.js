let supportData = null;

export function renderSupportPage(containerId, user) {
    const container = document.getElementById(containerId);
    if (!container) return;

    supportData = JSON.parse(localStorage.getItem("supportData"));

    if (!supportData) {
        console.error("Support data not found in localStorage.");
        return;
    }

    container.innerHTML = `
        <div class="support-page">
            <div class="support-main">
                <div class="support-header">
                    <h1 class="support-title">Support & Help</h1>
                    <p class="support-subtitle">Get help and answers to your questions</p>
                </div>

                <!-- Create Ticket -->
                <div class="support-section">
                    <h3 class="section-title">Create Support Ticket</h3>
                    <span class="section-desc">Describe your issue and we'll get back to you soon</span>
                    <form id="ticketForm">
                        <div class="form-group">
                            <span class="label">Subject</span>
                            <input type="text" class="input-field" name="subject" placeholder="Brief description of your issue" required>
                        </div>
                        <div class="form-group">
                            <span class="label">Category</span>
                            <select class="input-field" name="category">
                                <option>General Question</option>
                                <option>Technical Issue</option>
                                <option>Payment Issue</option>
                                <option>Account Settings</option>
                                <option>Tours & Bookings</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <span class="label">Message</span>
                            <textarea class="input-field" name="message" placeholder="Please provide as much detail as possible..." required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                            Submit Ticket
                        </button>
                    </form>
                </div>

                <!-- FAQs -->
                <div class="support-section">
                    <h3 class="section-title">Frequently Asked Questions</h3>
                    <span class="section-desc">Quick answers to common questions</span>
                    <div class="faq-list">
                        ${supportData.faqs.map(faq => `
                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>${faq.question}</span>
                                    <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                                </button>
                                <div class="faq-answer">${faq.answer}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Tickets History -->
                <div class="support-section">
                    <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 class="section-title" style="margin-bottom: 0;">Your Support Tickets</h3>
                        <button class="edit-btn" style="font-size: 11px;">View All</button>
                    </div>
                    <div class="history-list" id="ticketList">
                        ${supportData.tickets.map(t => `
                            <div class="ticket-card">
                                <div class="ticket-main">
                                    <span class="ticket-title">${t.subject}</span>
                                    <div class="ticket-meta">
                                        <span>${t.category}</span>
                                        <span>•</span>
                                        <span>${t.date}</span>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span class="status-pill ${t.status.toLowerCase()}">${t.status}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                                </div>
                            </div>
                        `).reverse().join('')}
                    </div>
                </div>
            </div>

            <div class="support-sidebar">
                <!-- Contact Us -->
                <div class="sidebar-card">
                    <h3 class="section-title" style="margin-bottom: 1rem; font-size: 1.1rem;">Contact Us</h3>
                    <div class="contact-item email">
                        <div class="icon-box" style="background: white;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                        <div class="contact-info">
                            <span class="contact-label">Email Support</span>
                            <span class="contact-value">${supportData.contactInfo.email}</span>
                            <span class="contact-meta">Response within 24 hours</span>
                        </div>
                    </div>
                    <div class="contact-item phone">
                        <div class="icon-box" style="background: white;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                        <div class="contact-info">
                            <span class="contact-label">Phone Support</span>
                            <span class="contact-value">${supportData.contactInfo.phone}</span>
                            <span class="contact-meta">${supportData.contactInfo.availability}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="sidebar-card">
                    <h3 class="section-title" style="margin-bottom: 0.5rem; font-size: 1.1rem;">Quick Links</h3>
                    <div class="quick-links">
                        <a href="#" class="quick-link"><span>Help Center</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>
                        <a href="#" class="quick-link"><span>Community Forum</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>
                        <a href="#" class="quick-link"><span>Guide Guidelines</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>
                        <a href="#" class="quick-link"><span>Terms of Service</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>
                    </div>
                </div>

                <!-- Response Time -->
                <div class="sidebar-card response-time">
                    <div class="time-circle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg></div>
                    <div class="response-info">
                        <span class="contact-label" style="opacity: 1; color: var(--primary-color);">Average Response Time</span>
                        <span class="time-val">2 hours</span>
                        <span class="time-desc">We typically respond within 2-4 hours during business hours</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupSupportListeners();
}

function setupSupportListeners() {
    // FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(q => {
        q.onclick = (e) => {
            const item = e.target.closest(".faq-item");
            const wasActive = item.classList.contains("active");
            
            // Close all
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            
            // Toggle current
            if (!wasActive) item.classList.add("active");
        };
    });

    // Form Submit
    document.getElementById("ticketForm").onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newTicket = {
            id: `T-${Math.floor(100 + Math.random() * 900)}`,
            subject: formData.get("subject"),
            category: formData.get("category"),
            status: "Open",
            date: new Date().toISOString().split("T")[0]
        };

        // Sync to localStorage
        supportData.tickets.push(newTicket);
        localStorage.setItem("supportData", JSON.stringify(supportData));

        alert("Ticket submitted successfully! ID: " + newTicket.id);
        renderSupportPage("main"); // Re-render to show in list
    };
}
