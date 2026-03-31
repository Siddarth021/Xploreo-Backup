export function attachOperationsEvents() {
    // Generic Modal Close Function
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetModalId = btn.getAttribute('data-target');
            document.getElementById(targetModalId).classList.remove('active');
        });
    });

    // Close on outside click
    const allModals = document.querySelectorAll('.modal-overlay');
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Generic Success Trigger
    const triggerSuccess = (modalElement, customMessage = null) => {
        const header = modalElement.querySelector('.modal-header');
        const defaultState = modalElement.querySelector('.queue-default-state, .form-state');
        const successState = modalElement.querySelector('.success-state');
        
        if (header) header.style.display = "none";
        if (defaultState) defaultState.style.display = "none";
        
        if (customMessage) {
            const msgEl = successState.querySelector('.success-message-text');
            if(msgEl) msgEl.innerText = customMessage;
        }

        successState.style.display = "block";
        
        setTimeout(() => {
            modalElement.classList.remove('active');
            // Reset modal after closing
            setTimeout(() => {
                if (header) header.style.display = "flex";
                if (defaultState) defaultState.style.display = "block";
                successState.style.display = "none";
            }, 300);
        }, 2000);
    };

    // 1. Manage Queue Logic
    const openQueueBtn = document.getElementById('open-queue-btn');
    const queueModal = document.getElementById('manage-queue-modal');
    if (openQueueBtn && queueModal) {
        openQueueBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            queueModal.classList.add('active');
        });

        document.getElementById('btn-escalate-queue')?.addEventListener('click', () => {
            triggerSuccess(queueModal, "All pending cases have been escalated to the team.");
        });
        document.getElementById('btn-process-queue')?.addEventListener('click', () => {
            triggerSuccess(queueModal, "All eligible refunds have been auto-processed.");
        });
    }

    // 2. Resolve & Escalate Logic
    let activeRowElement = null; 

    const resolveBtns = document.querySelectorAll('.btn-resolve');
    const escalateBtns = document.querySelectorAll('.btn-escalate');
    const resolveModal = document.getElementById('resolve-modal');
    const escalateModal = document.getElementById('escalate-modal');

    // Function to inject dynamic data into a modal
    const populateModal = (modalElement, btnElement) => {
        const caseId = btnElement.getAttribute('data-case');
        const ref = btnElement.getAttribute('data-ref');
        const issue = btnElement.getAttribute('data-issue');

        modalElement.querySelector('.dynamic-title').innerText = `Manage Case #${caseId}`;
        modalElement.querySelector('.inject-case').innerText = caseId;
        modalElement.querySelector('.inject-ref').innerText = ref;
        modalElement.querySelector('.inject-issue').innerText = issue;
    };

    resolveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeRowElement = e.target.closest('tr');
            populateModal(resolveModal, btn);
            resolveModal.classList.add('active');
        });
    });

    escalateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeRowElement = e.target.closest('tr');
            populateModal(escalateModal, btn);
            escalateModal.classList.add('active');
        });
    });

    // Handle Confirm Buttons in Resolve/Escalate Modals
    const confirmButtons = document.querySelectorAll('.btn-confirm-action');
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parentModal = e.target.closest('.modal-overlay');
            triggerSuccess(parentModal);

            if (activeRowElement) {
                activeRowElement.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                activeRowElement.style.opacity = "0";
                activeRowElement.style.transform = "translateX(20px)";
                
                setTimeout(() => {
                    activeRowElement.remove();
                    activeRowElement = null; 

                    const tbody = document.querySelector('.dispute-table tbody');
                    if (tbody && tbody.children.length === 0) {
                        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 32px; color: #718096; font-size: 14px;">All disputes resolved! 🎉</td></tr>`;
                    }
                }, 400);
            }
        });
    });
}