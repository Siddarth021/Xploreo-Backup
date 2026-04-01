// front_end/js/users.js

import { initialUsersData, initialPartnersData } from '../../data/usersData.js';
import { getUserStylesHTML } from './userStyles.js';
import { getUserStatsHTML } from './userStats.js';
import { getUserTableShellHTML, generateUserRowsHTML } from './userTable.js';
import { generateProfileHTML } from './userProfile.js';
import { getPartnerTableShellHTML, generatePartnerRowsHTML } from './partnerTable.js';

export function initUsers() {
    const mainContainer = document.getElementById("main");
    if (!mainContainer) return;

    // Local mutable state
    let platformUsersData = [...initialUsersData];
    let partnersData = [...initialPartnersData];
    let currentUserFilter = "All";
    let currentPartnerFilter = "All";

    // Build the structural HTML
    mainContainer.innerHTML = `
        ${getUserStylesHTML()}
        <div class="page-header" style="margin-bottom: 24px;">
            <h1 class="page-title" style="margin-top: 0; font-size: 28px;">User & Partner Statistics</h1>
            <p class="page-subtitle" style="margin: 5px 0 0; font-size: 14px; color: #718096;">Real-time performance monitoring and ecosystem health.</p>
        </div>
        
        ${getUserStatsHTML()}
        
        <div style="display:grid; grid-template-columns: 1fr 380px; gap:24px; align-items: start; margin-bottom: 32px;">
            ${getUserTableShellHTML()}
            <div id="profile-panel" style="background:#fff; border-radius:20px; border:1px solid #edf2f7; padding:40px 24px; position:sticky; top:24px;"></div>
        </div>

        ${getPartnerTableShellHTML()}
    `;

    // 🔹 DYNAMIC LOGIC - USERS
    function updateProfile(id) {
        const panel = document.getElementById("profile-panel");
        const user = platformUsersData.find(u => u.id === id);
        
        panel.dataset.currentId = id || "";
        panel.innerHTML = generateProfileHTML(user);
    }

    function renderUserTable() {
        const tbody = document.getElementById("users-tbody");
        const filteredData = currentUserFilter === "All" ? platformUsersData : platformUsersData.filter(u => u.role === currentUserFilter);
        
        tbody.innerHTML = generateUserRowsHTML(filteredData);
        attachUserListeners();
    }

    function attachUserListeners() {
        document.querySelectorAll(".user-row").forEach(row => {
            row.addEventListener("click", (e) => {
                if(e.target.tagName === "SELECT" || e.target.closest('.remove-btn')) return;
                document.querySelectorAll(".user-row").forEach(r => r.style.background = "transparent");
                row.style.background = "#f8fafc";
                updateProfile(row.dataset.id);
            });
        });

        document.querySelectorAll(".user-status-select").forEach(select => {
            select.addEventListener("change", (e) => {
                const userId = e.target.dataset.id;
                const userIndex = platformUsersData.findIndex(u => u.id === userId);
                if (userIndex !== -1) platformUsersData[userIndex].status = e.target.value;
                renderUserTable();
                if(document.getElementById("profile-panel").dataset.currentId === userId) updateProfile(userId);
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const userId = btn.dataset.id;
                platformUsersData = platformUsersData.filter(u => u.id !== userId);
                renderUserTable();
                if(document.getElementById("profile-panel").dataset.currentId === userId) updateProfile(null);
            });
        });
    }

    // 🔹 DYNAMIC LOGIC - PARTNERS
    function renderPartnerTable() {
        const tbody = document.getElementById("partners-tbody");
        const filteredData = currentPartnerFilter === "All" ? partnersData : partnersData.filter(p => p.type === currentPartnerFilter);
        
        tbody.innerHTML = generatePartnerRowsHTML(filteredData);
        attachPartnerListeners();
    }

    function attachPartnerListeners() {
        document.querySelectorAll(".partner-status-select").forEach(select => {
            select.addEventListener("change", (e) => {
                const partnerId = e.target.dataset.id;
                const index = partnersData.findIndex(p => p.id === partnerId);
                if (index !== -1) partnersData[index].status = e.target.value;
                renderPartnerTable();
            });
        });
    }

    // 🔹 FILTER BUTTON INIT
    document.querySelectorAll(".user-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".user-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentUserFilter = btn.dataset.filter;
            renderUserTable();
        });
    });

    document.querySelectorAll(".partner-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".partner-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentPartnerFilter = btn.dataset.filter;
            renderPartnerTable();
        });
    });

    // Boot Up Tables
    renderUserTable();
    renderPartnerTable();
    const initialRows = document.querySelectorAll(".user-row");
    if (initialRows.length > 0) initialRows[0].click();
}