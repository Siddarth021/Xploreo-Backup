const TRAVELER_SUPPORT_TICKETS_KEY = "traveler_support_tickets";

const TRAVELER_SUPPORT_FAQS = [
    {
        question: "How do I receive payments?",
        answer: "Payments are processed within 3-5 business days after a tour is completed and confirmed by the customer."
    },
    {
        question: "Can I cancel an accepted tour?",
        answer: "Yes, but cancellations must be made at least 48 hours in advance to avoid a service fee."
    },
    {
        question: "How do I update my availability?",
        answer: "Head to the 'Schedule' tab in your dashboard to manage your weekly hours and block specific dates."
    },
    {
        question: "What happens if a customer doesn't show up?",
        answer: "Mark the tour as 'No-Show' in your dashboard. You will still receive 50% of the booking amount."
    },
    {
        question: "How are ratings calculated?",
        answer: "Your rating is an average of all customer feedback from the last 12 months."
    },
    {
        question: "Can I offer custom tour packages?",
        answer: "Absolutely! Go to the 'Tours' section to create and list new custom packages."
    }
];

const DEFAULT_TICKETS = [
    {
        id: "TS-3042",
        subject: "Profile Verification Stuck",
        category: "Profile",
        createdAt: "2026-03-30T10:00:00.000Z",
        status: "in-progress"
    },
    {
        id: "TS-3036",
        subject: "Customer cancellation policy",
        category: "Policies",
        createdAt: "2026-03-25T10:00:00.000Z",
        status: "open"
    },
    {
        id: "TS-3028",
        subject: "How to update availability?",
        category: "Account",
        createdAt: "2026-03-24T10:00:00.000Z",
        status: "open"
    },
    {
        id: "TS-3017",
        subject: "Payment issue for March tours",
        category: "Payments",
        createdAt: "2026-03-20T10:00:00.000Z",
        status: "resolved"
    }
];

export function renderTravelerSupportPage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = {
        openFaqIndex: 0,
        tickets: getTravelerSupportTickets()
    };

    function render() {
        container.innerHTML = `
            <main class="traveler-support-page">
                <section class="traveler-support-main">
                    <header class="traveler-support-header">
                        <h1>Support & Help</h1>
                        <p>Get help and answers to your questions</p>
                    </header>

                    <section class="traveler-support-card">
                        <h2>Create Support Ticket</h2>
                        <p>Describe your issue and we'll get back to you soon</p>
                        <form class="traveler-support-form" id="traveler-support-form">
                            <label class="traveler-support-field">
                                <span>Subject</span>
                                <input class="traveler-support-input" type="text" name="subject" placeholder="Brief description of your issue" required>
                            </label>
                            <label class="traveler-support-field">
                                <span>Category</span>
                                <select class="traveler-support-select" name="category">
                                    <option>General Question</option>
                                    <option>Technical Issue</option>
                                    <option>Payment Issue</option>
                                    <option>Account Settings</option>
                                    <option>Tours & Bookings</option>
                                </select>
                            </label>
                            <label class="traveler-support-field">
                                <span>Message</span>
                                <textarea class="traveler-support-textarea" name="message" placeholder="Please provide as much detail as possible..." required></textarea>
                            </label>
                            <button class="traveler-support-submit" type="submit">
                                ${paperPlaneIcon()}
                                <span>Submit Ticket</span>
                            </button>
                        </form>
                    </section>

                    <section class="traveler-support-card">
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to common questions</p>
                        <div class="traveler-support-faq-list">
                            ${TRAVELER_SUPPORT_FAQS.map((faq, index) => `
                                <article class="traveler-support-faq-item ${state.openFaqIndex === index ? "active" : ""}">
                                    <button class="traveler-support-faq-question" type="button" data-faq-index="${index}">
                                        <span>${escapeHtml(faq.question)}</span>
                                        <span class="traveler-support-faq-icon">${chevronDownIcon()}</span>
                                    </button>
                                    <div class="traveler-support-faq-answer">${escapeHtml(faq.answer)}</div>
                                </article>
                            `).join("")}
                        </div>
                    </section>

                    <section class="traveler-support-card">
                        <h2>Your Support Tickets</h2>
                        <div class="traveler-support-ticket-list">
                            ${state.tickets.map((ticket) => `
                                <article class="traveler-support-ticket">
                                    <div>
                                        <h3 class="traveler-support-ticket-title">${escapeHtml(ticket.subject)}</h3>
                                        <div class="traveler-support-ticket-meta">
                                            <span>${escapeHtml(ticket.category)}</span>
                                            <span>&bull;</span>
                                            <span>${formatTicketDate(ticket.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div class="traveler-support-ticket-trailing">
                                        <span class="traveler-support-status ${ticket.status}">${formatStatusLabel(ticket.status)}</span>
                                        ${chevronRightIcon()}
                                    </div>
                                </article>
                            `).join("")}
                        </div>
                    </section>
                </section>

                <aside class="traveler-support-sidebar">
                    <section class="traveler-support-card">
                        <h2>Contact Us</h2>
                        <div class="traveler-support-contact">
                            <div class="traveler-support-contact-icon">${mailIcon()}</div>
                            <div>
                                <span class="traveler-support-contact-label">Email Support</span>
                                <span class="traveler-support-contact-value">support@travelguide.com</span>
                                <span class="traveler-support-contact-meta">Response within 24 hours</span>
                            </div>
                        </div>
                    </section>

                    <section class="traveler-support-card">
                        <h2>Quick Links</h2>
                        <div style="margin-top: 12px;">
                            <a class="traveler-support-link" href="#">
                                <span>Help Center</span>
                                ${chevronRightIcon()}
                            </a>
                            <a class="traveler-support-link" href="#">
                                <span>Terms of Service</span>
                                ${chevronRightIcon()}
                            </a>
                        </div>
                    </section>
                </aside>
            </main>
        `;

        bindEvents();
    }

    function bindEvents() {
        container.querySelectorAll("[data-faq-index]").forEach((button) => {
            button.addEventListener("click", () => {
                const nextIndex = Number(button.dataset.faqIndex);
                state.openFaqIndex = state.openFaqIndex === nextIndex ? -1 : nextIndex;
                render();
            });
        });

        container.querySelector("#traveler-support-form")?.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);

            const ticket = {
                id: `TS-${Math.floor(1000 + Math.random() * 9000)}`,
                subject: String(formData.get("subject") || "").trim(),
                category: normalizeCategoryLabel(String(formData.get("category") || "General Question")),
                createdAt: new Date().toISOString(),
                status: "open",
                description: String(formData.get("message") || "").trim()
            };

            if (!ticket.subject || !ticket.description) {
                return;
            }

            state.tickets = [ticket, ...state.tickets];
            localStorage.setItem(TRAVELER_SUPPORT_TICKETS_KEY, JSON.stringify(state.tickets));
            render();
        });
    }

    render();
}

function getTravelerSupportTickets() {
    try {
        const stored = JSON.parse(localStorage.getItem(TRAVELER_SUPPORT_TICKETS_KEY) || "null");
        if (Array.isArray(stored) && stored.length) {
            return stored.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
        }
    } catch (error) {
        console.warn("Unable to read traveler support tickets", error);
    }

    localStorage.setItem(TRAVELER_SUPPORT_TICKETS_KEY, JSON.stringify(DEFAULT_TICKETS));
    return [...DEFAULT_TICKETS];
}

function formatTicketDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function formatStatusLabel(status) {
    if (status === "in-progress") return "in-progress";
    return status;
}

function normalizeCategoryLabel(value) {
    const map = {
        "General Question": "General",
        "Technical Issue": "Technical",
        "Payment Issue": "Payments",
        "Account Settings": "Account",
        "Tours & Bookings": "Bookings"
    };

    return map[value] || value;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function mailIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
}

function paperPlaneIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>`;
}

function chevronDownIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>`;
}

function chevronRightIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>`;
}
