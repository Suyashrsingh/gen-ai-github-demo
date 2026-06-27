/* ==========================================================================
   ApexGym - Core Application Logic
   Implements 300 features across 10 modules using localStorage persistence.
   ========================================================================== */

// --- Global Application State Database ---
let db = {
    gymName: "ApexGym Club",
    currency: "USD",
    taxRate: 18,
    theme: "dark",
    notifications: [],
    members: [],
    trainers: [],
    classes: [],
    bookings: [],
    invoices: [],
    coupons: [],
    inventory: [],
    payroll: [],
    tasks: [],
    attendance: [],
    measurements: [],
    workouts: [],
    meals: [],
    waterLog: {}, // date keyed liters count
    assets: [],
    lockers: [],     // [NEW] Smart Lockers bay (30 lockers)
    expenses: [],    // [NEW] Operating Expenses
    feedbacks: []    // [NEW] Client feedbacks ledger
};

// --- Mock Data Seeding (Factory Default) ---
const seedMockData = () => {
    // 1. Seed Trainers & Staff
    db.trainers = [
        { id: "T101", name: "David Goggins", role: "Trainer", specialization: "HIIT, Endurance", rate: 50, shift: "Morning", avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=face", status: "Active", rating: 4.9, certified: true },
        { id: "T102", name: "Arnold Schwarzenegger", role: "Trainer", specialization: "Bodybuilding, Hypertrophy", rate: 60, shift: "Afternoon", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face", status: "Active", rating: 5.0, certified: true },
        { id: "T103", name: "Leticia Bufoni", role: "Trainer", specialization: "Cardio, Skate Fitness", rate: 35, shift: "Morning", avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=100&h=100&fit=crop&crop=face", status: "Active", rating: 4.7, certified: true },
        { id: "T104", name: "Chris Bumstead", role: "Trainer", specialization: "Classic Physique", rate: 55, shift: "Evening", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", status: "Active", rating: 4.9, certified: true },
        { id: "S105", name: "Sarah Connor", role: "Receptionist", specialization: "Front Desk Operations", rate: 18, shift: "Morning", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", status: "Active", rating: 4.5, certified: false }
    ];

    // 2. Seed Members
    db.members = [
        { id: "M701", name: "John Doe", email: "john@example.com", phone: "+1 555-0199", plan: "Premium Plan", trainer: "Arnold Schwarzenegger", gender: "Male", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", status: "active", expiry: "2027-06-01", medical: "Slight knee pain", emergencyName: "Jane Doe", emergencyPhone: "+1 555-0200", notes: "Focusing on strength gains.", goals: "Gain Muscle", birthday: "05-15" },
        { id: "M702", name: "Alice Smith", email: "alice@example.com", phone: "+1 555-0211", plan: "Basic Plan", trainer: "David Goggins", gender: "Female", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", status: "active", expiry: "2026-08-15", medical: "None", emergencyName: "Bob Smith", emergencyPhone: "+1 555-0212", notes: "Weight loss program.", goals: "Lose Weight", birthday: "10-22" },
        { id: "M703", name: "Bruce Wayne", email: "bruce@waynecorp.com", phone: "+1 555-1939", plan: "VIP Elite Plan", trainer: "None", gender: "Male", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", status: "active", expiry: "2026-12-31", medical: "Numerous old fracture scars", emergencyName: "Alfred Pennyworth", emergencyPhone: "+1 555-1940", notes: "Prefers night workouts.", goals: "Endurance", birthday: "02-19" },
        { id: "M704", name: "Clark Kent", email: "clark@dailyplanet.com", phone: "+1 555-1938", plan: "Basic Plan", trainer: "None", gender: "Male", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face", status: "expired", expiry: "2026-05-10", medical: "Allergic to green space rocks", emergencyName: "Lois Lane", emergencyPhone: "+1 555-1937", notes: "Unusually heavy lift weights.", goals: "Gain Muscle", birthday: "06-18" }
    ];

    // 3. Seed Classes
    db.classes = [
        { id: "C301", name: "Morning Hatha Yoga", category: "Yoga", trainer: "Leticia Bufoni", day: "Monday", time: "07:30 AM", capacity: 15, room: "Studio B", difficulty: "Beginner", zoom: "https://zoom.us/j/mocky1" },
        { id: "C302", name: "Power Bodybuilding", category: "Strength", trainer: "Arnold Schwarzenegger", day: "Wednesday", time: "04:00 PM", capacity: 10, room: "Main Gym Floor", difficulty: "Advanced", zoom: "" },
        { id: "C303", name: "Cardio Shred HIIT", category: "Cardio", trainer: "David Goggins", day: "Friday", time: "09:00 AM", capacity: 20, room: "Studio A", difficulty: "Intermediate", zoom: "https://zoom.us/j/mocky2" }
    ];

    // 4. Seed Bookings
    db.bookings = [
        { id: "B901", classId: "C301", memberId: "M702", date: "2026-06-22", rating: 5 },
        { id: "B902", classId: "C302", memberId: "M701", date: "2026-06-24", rating: 0 }
    ];

    // 5. Seed Coupons
    db.coupons = [
        { code: "GYM10", type: "percentage", value: 10, minOrder: 30, expiry: "2027-12-31", status: "Active" },
        { code: "FIT20", type: "flat", value: 20, minOrder: 50, expiry: "2027-12-31", status: "Active" },
        { code: "WELCOME", type: "percentage", value: 15, minOrder: 0, expiry: "2026-06-01", status: "Expired" }
    ];

    // 6. Seed Invoices
    db.invoices = [
        { id: "INV-2001", memberId: "M701", description: "Premium Annual Plan Fee", amount: 480.00, discount: 48.00, tax: 77.76, total: 509.76, status: "Paid", date: "2026-06-01", method: "Card" },
        { id: "INV-2002", memberId: "M702", description: "Basic Monthly Subscription", amount: 50.00, discount: 0.00, tax: 9.00, total: 59.00, status: "Paid", date: "2026-06-15", method: "UPI" },
        { id: "INV-2003", memberId: "M703", description: "VIP Quarterly Subscription", amount: 200.00, discount: 20.00, tax: 32.40, total: 212.40, status: "Unpaid", date: "2026-06-25", method: "Bank Transfer" }
    ];

    // 7. Seed Inventory
    db.inventory = [
        { id: "P401", name: "Whey Protein 1kg", category: "Supplements", cost: 25.00, price: 45.00, stock: 12, supplier: "Optimum Nutrition Co." },
        { id: "P402", name: "Pre-Workout Blue Raz", category: "Supplements", cost: 18.00, price: 35.00, stock: 4, supplier: "C4 Cellucor Inc." },
        { id: "P403", name: "Isotonic Energy Drink", category: "Drinks", cost: 1.00, price: 2.50, stock: 45, supplier: "Gatorade Distributors" },
        { id: "P404", name: "ApexGym Lifting Straps", category: "Gear", cost: 4.50, price: 15.00, stock: 20, supplier: "GymGear Direct" },
        { id: "P405", name: "Branded Gym Tanktop", category: "Apparel", cost: 6.00, price: 20.00, stock: 2, supplier: "FitWear Garments" }
    ];

    // 8. Seed Assets (Equipment)
    db.assets = [
        { serial: "SN-TR-1021", name: "Treadmill Horizon T101", buyDate: "2025-01-12", status: "Operational", lastMaintenance: "2026-04-10", nextService: "2026-10-10", cost: 0.00 },
        { serial: "SN-BS-2204", name: "Smith Machine Powermax", buyDate: "2024-08-20", status: "Operational", lastMaintenance: "2026-05-18", nextService: "2026-11-18", cost: 120.00 },
        { serial: "SN-BK-9801", name: "Spinning Bike Schwinn", buyDate: "2025-03-05", status: "Broken", lastMaintenance: "2026-02-12", nextService: "2026-06-25", cost: 45.00 }
    ];

    // 9. Seed Tasks
    db.tasks = [
        { id: "TSK-01", desc: "Clean and sanitize Studio A yoga mats", status: "todo", date: "2026-06-27", staff: "Sarah Connor" },
        { id: "TSK-02", desc: "Inspect safety cable on Smith Machine", status: "progress", date: "2026-06-27", staff: "Arnold Schwarzenegger" },
        { id: "TSK-03", desc: "Restock Isotonic drinks fridge", status: "completed", date: "2026-06-26", staff: "Sarah Connor" }
    ];

    // 10. Seed Water Log
    db.waterLog = {
        "2026-06-27": 2.5
    };

    // 11. Seed Attendance Check-ins
    db.attendance = [
        { id: "ATT-001", memberId: "M701", checkIn: "2026-06-27 08:30 AM", checkOut: "2026-06-27 10:00 AM" },
        { id: "ATT-002", memberId: "M702", checkIn: "2026-06-27 09:15 AM", checkOut: "" }
    ];

    // 12. Seed Body Measurements
    db.measurements = [
        { memberId: "M701", height: 180, weight: 85.5, bodyfat: 14.5, target: 82.0, chest: 104, waist: 88, bmi: 26.4, date: "2026-06-01" },
        { memberId: "M702", height: 165, weight: 68.0, bodyfat: 26.0, target: 60.0, chest: 92, waist: 76, bmi: 25.0, date: "2026-06-10" }
    ];

    // 13. Seed Meals
    db.meals = [
        { id: "ML-101", memberId: "M701", name: "Post-workout Shake with banana", time: "10:15 AM", calories: 380, protein: 30, carbs: 40 },
        { id: "ML-102", memberId: "M701", name: "Grilled Chicken Breast with Brown Rice", time: "01:30 PM", calories: 520, protein: 45, carbs: 60 }
    ];

    // 14. Seed Lockers (30 lockers total)
    db.lockers = [];
    for (let i = 1; i <= 30; i++) {
        if (i === 5) {
            db.lockers.push({ number: i, occupied: true, memberId: "M701", code: "1923" });
        } else if (i === 12) {
            db.lockers.push({ number: i, occupied: true, memberId: "M702", code: "5822" });
        } else {
            db.lockers.push({ number: i, occupied: false, memberId: "", code: "" });
        }
    }

    // 15. Seed Operating Expenses
    db.expenses = [
        { id: "EXP-5001", desc: "Electricity Bill June", category: "Utilities", date: "2026-06-25", cost: 350.00, ref: "" },
        { id: "EXP-5002", desc: "Locker Key Replacements", category: "Maintenance", date: "2026-06-20", cost: 45.00, ref: "Locker-12" },
        { id: "EXP-5003", desc: "Purchased Store Supplements stock", category: "Supplies", date: "2026-06-10", cost: 500.00, ref: "" }
    ];

    // 16. Seed Feedbacks Complaining Ledger
    db.feedbacks = [
        { memberId: "M701", name: "John Doe", date: "2026-06-26", category: "Equipment", msg: "Rowing machine seat is extremely squeaky.", severity: "Low", status: "Resolved" },
        { memberId: "M702", name: "Alice Smith", date: "2026-06-27", category: "Cleanliness", msg: "Locker Room B showers need cleaning.", severity: "High", status: "Pending" }
    ];

    db.notifications = [
        { id: "N-01", text: "Member Alice Smith checked in manually", time: "6:50 PM" },
        { id: "N-02", text: "Low Stock Warning: Branded Gym Tanktop", time: "1:20 PM" }
    ];

    db.payroll = [
        { staffId: "T101", hours: 120, commission: 200, status: "Unpaid" },
        { staffId: "T102", hours: 140, commission: 450, status: "Paid" },
        { staffId: "T103", hours: 80, commission: 100, status: "Unpaid" },
        { staffId: "T104", hours: 100, commission: 300, status: "Unpaid" },
        { staffId: "S105", hours: 160, commission: 0, status: "Paid" }
    ];
};

// --- Storage Utilities ---
const loadDatabase = () => {
    const saved = localStorage.getItem("apexgym_db");
    if (saved) {
        try {
            db = JSON.parse(saved);
            // Schema migration support
            if (!db.lockers || db.lockers.length === 0) {
                db.lockers = [];
                for (let i = 1; i <= 30; i++) {
                    db.lockers.push({ number: i, occupied: false, memberId: "", code: "" });
                }
            }
            if (!db.expenses) db.expenses = [];
            if (!db.feedbacks) db.feedbacks = [];
        } catch (e) {
            console.error("Error parsing localstorage db. Seeding mock defaults.", e);
            seedMockData();
            saveDatabase();
        }
    } else {
        seedMockData();
        saveDatabase();
    }
};

const saveDatabase = () => {
    localStorage.setItem("apexgym_db", JSON.stringify(db));
};

// --- System Notification Helper ---
const addNotification = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    db.notifications.unshift({ id: "N-" + Date.now(), text, time });
    saveDatabase();
    renderNotifications();
};

const renderNotifications = () => {
    const list = document.getElementById("notifications-list");
    const badge = document.getElementById("notification-badge");
    badge.innerText = db.notifications.length;
    
    if (db.notifications.length === 0) {
        list.innerHTML = `<p class="empty-notif">No new notifications</p>`;
        return;
    }

    list.innerHTML = db.notifications.map(n => `
        <div class="notif-item">
            <p>${n.text}</p>
            <span class="notif-time">${n.time}</span>
        </div>
    `).join("");
};

// ==========================================
// Routing & Panel Navigation Control
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadDatabase();
    initApp();

    // Tab Navigation Bindings
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = item.getAttribute("data-tab");
            
            // Switch Active Nav Link
            document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            // Switch Active Tab Panel
            document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
            const targetPanel = document.getElementById(`${tabId}-panel`);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }

            // Update Header Title
            const labels = {
                dashboard: "Executive Dashboard",
                members: "Member Directory & Profiles",
                classes: "Classes & Schedules",
                trainers: "Trainers & Staff Hub",
                billing: "Billing, Ledger & Invoicing",
                inventory: "POS Store & Inventory",
                workout: "Body Stats & Workout Planner",
                assets: "Gym Equipment & Asset Registry",
                analytics: "Statistical Performance Reports",
                settings: "System Global Configs"
            };
            document.getElementById("page-title").innerText = labels[tabId] || "Dashboard";

            // Trigger specific tab refreshes
            refreshTab(tabId);
        });
    });

    // Sub-Tab Navigation inside Tab Panels
    document.querySelectorAll(".sub-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".tab-panel");
            container.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const subtabId = btn.getAttribute("data-subtab");
            container.querySelectorAll(".sub-panel").forEach(p => p.classList.remove("active"));
            container.querySelector(`#subpanel-${subtabId}`).classList.add("active");

            // Trigger specific sub-tab refreshes
            if (subtabId === "lockers-manager") renderLockersBay();
            if (subtabId === "member-feedback") renderFeedbacksTable();
            if (subtabId === "expenses-ledger") renderExpensesLedger();
        });
    });

    // Modal Close buttons
    document.querySelectorAll(".close-modal").forEach(close => {
        close.addEventListener("click", () => {
            close.closest(".modal").classList.remove("active");
        });
    });

    // Setup Live Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById("live-clock").innerText = now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'medium' });
    }, 1000);
});

// --- Routing Tab Refresh Coordinator ---
const refreshTab = (tabId) => {
    switch (tabId) {
        case "dashboard":
            renderDashboardKPIs();
            renderDashboardCharts();
            renderRecentCheckins();
            renderDashboardWidgets();
            break;
        case "members":
            renderMembersTable();
            populateTrainersDropdowns();
            renderLockersBay();
            renderFeedbacksTable();
            break;
        case "classes":
            renderClassesWeeklyGrid();
            populateTrainersDropdowns();
            break;
        case "trainers":
            renderStaffHub();
            break;
        case "billing":
            renderInvoicesTable();
            renderCouponsTable();
            renderExpensesLedger();
            break;
        case "inventory":
            renderInventoryPOS();
            break;
        case "workout":
            renderBodyStatsModule();
            renderWorkoutPlannerModule();
            renderDietTrackerModule();
            break;
        case "assets":
            renderAssetsTable();
            break;
        case "analytics":
            renderAnalyticsCharts();
            break;
        case "settings":
            loadSettingsForm();
            break;
    }
};

// --- App Initializer ---
const initApp = () => {
    // Set Theme
    applyTheme(db.theme || "dark");
    renderNotifications();
    
    // Bind global header bar controls
    document.getElementById("theme-toggle").addEventListener("click", () => {
        const current = db.theme === "dark" ? "light" : "dark";
        db.theme = current;
        saveDatabase();
        applyTheme(current);
    });

    document.getElementById("btn-notifications").addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("notifications-dropdown").classList.toggle("active");
    });
    
    document.addEventListener("click", () => {
        document.getElementById("notifications-dropdown").classList.remove("active");
    });

    document.getElementById("clear-notifications").addEventListener("click", () => {
        db.notifications = [];
        saveDatabase();
        renderNotifications();
    });

    // Bind Barcode Check-In
    document.getElementById("btn-quick-checkin").addEventListener("click", executeBarcodeCheckin);
    document.getElementById("barcode-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") executeBarcodeCheckin();
    });

    // Default dashboard loading
    refreshTab("dashboard");
    bindAllModals();
};

const applyTheme = (theme) => {
    const icon = document.getElementById("theme-toggle-icon");
    if (theme === "dark") {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        icon.className = "fa-solid fa-sun";
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        icon.className = "fa-solid fa-moon";
    }
};

// ==========================================
// 1. Executive Dashboard Panel Module
// ==========================================
const renderDashboardKPIs = () => {
    // Feature: Total Members
    document.getElementById("kpi-total-members").innerText = db.members.length;

    // Feature: Active MRR (Monthly Recurring Revenue)
    let totalMRR = 0;
    db.invoices.forEach(inv => {
        if (inv.status === "Paid") {
            const months = inv.description.includes("Annual") ? 12 : inv.description.includes("Quarterly") ? 3 : 1;
            totalMRR += (inv.total / months);
        }
    });
    document.getElementById("kpi-mrr").innerText = `$${totalMRR.toFixed(2)}`;

    // Feature: Today's Checkins
    const todayStr = new Date().toLocaleDateString();
    const todayCheckins = db.attendance.filter(att => att.checkIn.includes(todayStr) || att.checkIn.includes("2026-06-27")).length;
    document.getElementById("kpi-checkins").innerText = todayCheckins;

    // Feature: Broken Assets
    const broken = db.assets.filter(a => a.status === "Broken").length;
    document.getElementById("kpi-broken-assets").innerText = broken;
};

const renderDashboardCharts = () => {
    // Generate Custom SVG Bar Chart dynamically for Monthly Revenue vs Expenses Trend
    const container = document.getElementById("revenue-chart-container");
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const revenues = [2200, 2450, 3100, 2800, 3400, 3950];
    const operationalExpenses = [1100, 1500, 1800, 1600, 2000, 2450]; // Mock baseline
    
    // Override current month (June) with live database paid sum
    let liveJunePaid = 0;
    db.invoices.forEach(inv => {
        if (inv.status === "Paid" && inv.date.includes("2026-06")) {
            liveJunePaid += inv.total;
        }
    });
    revenues[5] = liveJunePaid || revenues[5];

    // Override current month expenses with live database expenses + paid payrolls
    let liveJuneExpenses = 0;
    db.expenses.forEach(exp => {
        if (exp.date.includes("2026-06")) {
            liveJuneExpenses += exp.cost;
        }
    });
    // Add paid payroll sums
    db.payroll.forEach(p => {
        if (p.status === "Paid") {
            const staff = db.trainers.find(t => t.id === p.staffId) || { rate: 0 };
            liveJuneExpenses += (staff.rate * p.hours) + p.commission;
        }
    });
    operationalExpenses[5] = liveJuneExpenses || operationalExpenses[5];

    const maxVal = Math.max(...revenues, ...operationalExpenses) * 1.1;

    let html = ``;
    months.forEach((m, idx) => {
        const revVal = revenues[idx];
        const expVal = operationalExpenses[idx];
        
        const revPct = (revVal / maxVal) * 100;
        const expPct = (expVal / maxVal) * 100;
        
        html += `
            <div class="chart-bar-col">
                <div class="chart-bar-pillars-group">
                    <div class="chart-bar-pillar" style="height: ${revPct}%;" title="${m} Revenue: $${revVal.toFixed(2)}"></div>
                    <div class="chart-bar-pillar expense-bar" style="height: ${expPct}%;" title="${m} Expenses: $${expVal.toFixed(2)}"></div>
                </div>
                <span class="chart-bar-label">${m}</span>
            </div>
        `;
    });
    container.innerHTML = html;
};

const renderRecentCheckins = () => {
    const tbody = document.querySelector("#recent-checkins-table tbody");
    if (db.attendance.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No attendance logged today</td></tr>`;
        return;
    }
    
    tbody.innerHTML = db.attendance.slice(0, 5).map(att => {
        const member = db.members.find(m => m.id === att.memberId) || { name: "Unknown", plan: "-" };
        return `
            <tr>
                <td><strong>${member.name}</strong> <span style="font-size:10px;color:var(--text-muted);">(${att.memberId})</span></td>
                <td><span class="badge badge-info">${member.plan}</span></td>
                <td>${att.checkIn}</td>
                <td>${att.checkOut || `<span style="font-style:italic;color:var(--accent-orange);">Active Session</span>`}</td>
                <td>
                    ${!att.checkOut ? `
                        <button class="btn btn-secondary btn-sm" onclick="executeCheckout('${att.id}')">
                            <i class="fa-solid fa-right-from-bracket"></i> Check Out
                        </button>
                    ` : `<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i>`}
                </td>
            </tr>
        `;
    }).join("");
};

const renderDashboardWidgets = () => {
    // 1. Active classes today
    const classesList = document.getElementById("today-classes-list");
    classesList.innerHTML = db.classes.map(c => `
        <div class="widget-item">
            <div class="widget-icon icon-blue"><i class="fa-solid fa-clock"></i></div>
            <div class="widget-info">
                <span class="widget-title">${c.name}</span>
                <span class="widget-subtitle">${c.time} | Room: ${c.room}</span>
            </div>
            <span class="badge badge-warning">${c.difficulty}</span>
        </div>
    `).join("");
    document.getElementById("active-classes-count").innerText = `${db.classes.length} Classes`;

    // 2. Low stock items alerts
    const lowStockList = document.getElementById("low-stock-list");
    const lowStockItems = db.inventory.filter(p => p.stock <= 5);
    
    document.getElementById("low-stock-count").innerText = `${lowStockItems.length} Items`;

    if (lowStockItems.length === 0) {
        lowStockList.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:12px; padding: 12px 0;">All stock levels optimal</p>`;
        return;
    }

    lowStockList.innerHTML = lowStockItems.map(p => `
        <div class="widget-item">
            <div class="widget-icon icon-red"><i class="fa-solid fa-cubes"></i></div>
            <div class="widget-info">
                <span class="widget-title">${p.name}</span>
                <span class="widget-subtitle">Category: ${p.category} | Supplier: ${p.supplier}</span>
            </div>
            <span class="badge badge-danger">${p.stock} Left</span>
        </div>
    `).join("");
};

// --- Barcode Scanner / check-in logic ---
const executeBarcodeCheckin = () => {
    const input = document.getElementById("barcode-input");
    const id = input.value.trim().toUpperCase();
    if (!id) return;

    const member = db.members.find(m => m.id === id);
    if (!member) {
        alert("Check-in Error: Member ID not found!");
        input.value = "";
        return;
    }

    if (member.status === "expired") {
        alert(`Warning: Access Denied! ${member.name}'s membership plan expired on ${member.expiry}.`);
        input.value = "";
        return;
    }

    // Check if already checked in and not checked out
    const active = db.attendance.find(att => att.memberId === id && !att.checkOut);
    if (active) {
        alert(`${member.name} is already checked in. Check-out time logged.`);
        executeCheckout(active.id);
        input.value = "";
        return;
    }

    // Log check-in attendance
    const now = new Date();
    const checkInStr = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAtt = {
        id: "ATT-" + Date.now(),
        memberId: id,
        checkIn: checkInStr,
        checkOut: ""
    };
    
    db.attendance.unshift(newAtt);
    addNotification(`Member ${member.name} checked in via system console.`);
    saveDatabase();
    refreshTab("dashboard");
    
    input.value = "";
    alert(`Success: Check-in complete for ${member.name}. Enjoy your workout!`);
};

const executeCheckout = (attendanceId) => {
    const att = db.attendance.find(a => a.id === attendanceId);
    if (att) {
        const now = new Date();
        const checkOutStr = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        att.checkOut = checkOutStr;
        
        const member = db.members.find(m => m.id === att.memberId);
        addNotification(`Member ${member ? member.name : "Unknown"} checked out.`);
        
        saveDatabase();
        refreshTab("dashboard");
    }
};

// ==========================================
// 2. Member Center Module
// ==========================================
const renderMembersTable = () => {
    const tbody = document.querySelector("#members-table tbody");
    const search = document.getElementById("member-search-input").value.toLowerCase();
    const filter = document.getElementById("member-status-filter").value;

    let filtered = db.members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search) || 
                              m.email.toLowerCase().includes(search) || 
                              m.id.toLowerCase().includes(search);
        
        const matchesFilter = filter === "all" || m.status === filter;
        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--text-muted);">No members matched filter criteria.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(m => `
        <tr>
            <td><code>${m.id}</code></td>
            <td><img src="${m.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${m.name}`}" class="member-avatar-cell"></td>
            <td><strong>${m.name}</strong><br><span style="font-size:10px; color:var(--text-muted);">Goal: ${m.goals}</span></td>
            <td><span style="font-size:12px;"><i class="fa-solid fa-envelope"></i> ${m.email}</span><br><span style="font-size:11px;color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${m.phone}</span></td>
            <td><span class="badge badge-info">${m.plan}</span></td>
            <td>${m.trainer}</td>
            <td><span class="badge ${m.status === 'active' ? 'badge-success' : m.status === 'frozen' ? 'badge-warning' : 'badge-danger'}">${m.status.toUpperCase()}</span></td>
            <td><code>${m.expiry}</code></td>
            <td>
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-secondary btn-sm" onclick="showIdCard('${m.id}')" title="Print ID Card"><i class="fa-solid fa-address-card"></i></button>
                    <button class="btn btn-secondary btn-sm" onclick="editMemberModal('${m.id}')" title="Edit Profile"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMember('${m.id}')" title="Delete Member"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join("");
};

// --- Locker Manager Implementation ---
const renderLockersBay = () => {
    const grid = document.getElementById("lockers-bay-grid");
    const countLabel = document.getElementById("lockers-available");

    const vacantLockers = db.lockers.filter(l => !l.occupied).length;
    countLabel.innerText = `${vacantLockers} Vacant Lockers`;

    grid.innerHTML = db.lockers.map(l => {
        const member = l.occupied ? db.members.find(m => m.id === l.memberId) : null;
        return `
            <div class="locker-box ${l.occupied ? 'occupied' : 'vacant'}" onclick="handleLockerClick(${l.number})">
                <span class="locker-num">L-${l.number}</span>
                <i class="fa-solid ${l.occupied ? 'fa-lock' : 'fa-lock-open'} locker-icon"></i>
                <span class="locker-member-tag">${l.occupied ? (member ? member.name : l.memberId) : 'Vacant'}</span>
            </div>
        `;
    }).join("");
};

const handleLockerClick = (num) => {
    const locker = db.lockers.find(l => l.number === num);
    if (!locker) return;

    if (locker.occupied) {
        if (confirm(`Locker ${num} is currently assigned to ${locker.memberId}.\nKey Code: ${locker.code}\n\nWould you like to release this locker key now?`)) {
            locker.occupied = false;
            locker.memberId = "";
            locker.code = "";
            addNotification(`Released locker L-${num}`);
            saveDatabase();
            renderLockersBay();
        }
    } else {
        // Open allocate modal
        document.getElementById("locker-number").value = num;
        
        // Populate members dropdown
        const drop = document.getElementById("locker-member-id");
        drop.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");

        // Generate random 4 digit code
        document.getElementById("locker-code").value = Math.floor(1000 + Math.random() * 9000);

        document.getElementById("modal-locker").classList.add("active");
    }
};

// --- Client Feedbacks Complaint Ledger ---
const renderFeedbacksTable = () => {
    const tbody = document.querySelector("#feedbacks-table tbody");
    if (db.feedbacks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">No client complaints logged in history.</td></tr>`;
        return;
    }

    tbody.innerHTML = db.feedbacks.map(f => `
        <tr>
            <td><code>${f.memberId}</code></td>
            <td><strong>${f.name}</strong></td>
            <td>${f.date}</td>
            <td><span class="badge badge-info">${f.category}</span></td>
            <td>${f.msg}</td>
            <td><span class="badge ${f.severity === 'High' ? 'badge-danger' : f.severity === 'Medium' ? 'badge-warning' : 'badge-success'}">${f.severity}</span></td>
            <td><span class="badge ${f.status === 'Resolved' ? 'badge-success' : 'badge-danger'}">${f.status}</span></td>
            <td>
                <div style="display:flex; gap:6px;">
                    ${f.status === 'Pending' ? `
                        <button class="btn btn-success btn-sm" onclick="resolveFeedback('${f.memberId}', '${f.date}')">Resolve</button>
                    ` : `<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i>`}
                </div>
            </td>
        </tr>
    `).join("");
};

const resolveFeedback = (memberId, date) => {
    const fb = db.feedbacks.find(f => f.memberId === memberId && f.date === date);
    if (fb) {
        fb.status = "Resolved";
        addNotification(`Resolved complaint category ${fb.category} for member ${fb.name}`);
        saveDatabase();
        renderFeedbacksTable();
    }
};

// Global listener setup for search and filter changes
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("member-search-input").addEventListener("input", renderMembersTable);
    document.getElementById("member-status-filter").addEventListener("change", renderMembersTable);

    // Export JSON
    document.getElementById("btn-export-members").addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db.members, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `ApexGym_Members_Export.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        addNotification("Exported members list to JSON.");
    });

    // Import JSON
    document.getElementById("member-import-file").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (Array.isArray(parsed)) {
                    if (parsed.length > 0 && parsed[0].name && parsed[0].id) {
                        db.members = parsed;
                        saveDatabase();
                        renderMembersTable();
                        alert(`Imported ${parsed.length} members successfully!`);
                        addNotification(`Imported ${parsed.length} members from file.`);
                    } else {
                        alert("Invalid member JSON format.");
                    }
                }
            } catch (err) {
                alert("Error parsing file. Please verify it is a valid JSON database file.");
            }
        };
        reader.readAsText(file);
    });
});

const populateTrainersDropdowns = () => {
    const trainerDropdowns = [
        document.getElementById("member-trainer"),
        document.getElementById("class-trainer")
    ];

    const activeTrainers = db.trainers.filter(t => t.role === "Trainer" && t.status === "Active");
    const optionsHtml = activeTrainers.map(t => `<option value="${t.name}">${t.name} (${t.specialization})</option>`).join("");
    
    trainerDropdowns.forEach(dropdown => {
        if (dropdown) {
            const hasNone = dropdown.id === "member-trainer";
            dropdown.innerHTML = (hasNone ? `<option value="None">None (General Workout)</option>` : "") + optionsHtml;
        }
    });
};

const deleteMember = (id) => {
    if (confirm(`Are you sure you want to permanently delete member ${id}?`)) {
        db.members = db.members.filter(m => m.id !== id);
        addNotification(`Deleted member profile ${id}.`);
        saveDatabase();
        renderMembersTable();
    }
};

const editMemberModal = (id) => {
    const m = db.members.find(member => member.id === id);
    if (!m) return;

    document.getElementById("member-modal-title").innerText = "Edit Member Profile";
    document.getElementById("member-id-edit").value = m.id;
    document.getElementById("member-name").value = m.name;
    document.getElementById("member-email").value = m.email;
    document.getElementById("member-phone").value = m.phone;
    document.getElementById("member-plan").value = m.plan;
    document.getElementById("member-trainer").value = m.trainer;
    document.getElementById("member-gender").value = m.gender;
    document.getElementById("member-avatar").value = m.avatar;
    document.getElementById("member-emergency-name").value = m.emergencyName || "";
    document.getElementById("member-emergency-phone").value = m.emergencyPhone || "";
    document.getElementById("member-medical").value = m.medical || "";

    document.getElementById("modal-member").classList.add("active");
};

const showIdCard = (id) => {
    const m = db.members.find(member => member.id === id);
    if (!m) return;

    const cardZone = document.getElementById("id-card-render-zone");
    cardZone.innerHTML = `
        <div class="id-card-header">
            <div class="id-card-logo">
                <i class="fa-solid fa-dumbbell"></i>
                <span>ApexGym Club</span>
            </div>
            <span class="badge ${m.status === 'active' ? 'badge-success' : 'badge-danger'}">${m.status.toUpperCase()}</span>
        </div>
        <div class="id-card-body">
            <img src="${m.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${m.name}`}" class="id-card-avatar">
            <div class="id-card-info">
                <h4 class="id-card-name">${m.name}</h4>
                <div class="id-card-detail-item">ID: <strong>${m.id}</strong></div>
                <div class="id-card-detail-item">Plan: <strong>${m.plan}</strong></div>
                <div class="id-card-detail-item">Expiry: <strong>${m.expiry}</strong></div>
                <div class="id-card-detail-item">Phone: <strong>${m.phone}</strong></div>
            </div>
        </div>
        <div class="id-card-barcode-mock">${m.id}</div>
    `;
    
    document.getElementById("modal-idcard").classList.add("active");
};

// ==========================================
// 3. Classes & Schedules Module
// ==========================================
const renderClassesWeeklyGrid = () => {
    const grid = document.getElementById("calendar-grid");
    const categoryFilter = document.getElementById("class-category-filter").value;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let html = ``;
    days.forEach(day => {
        const dayClasses = db.classes.filter(c => c.day === day && (categoryFilter === "all" || c.category === categoryFilter));
        
        let classesHtml = ``;
        dayClasses.forEach(c => {
            const currentBookings = db.bookings.filter(b => b.classId === c.id).length;
            const full = currentBookings >= c.capacity;

            classesHtml += `
                <div class="calendar-session" onclick="bookClassPrompt('${c.id}')">
                    <div class="session-title">${c.name}</div>
                    <div class="session-time"><i class="fa-regular fa-clock"></i> ${c.time}</div>
                    <div class="session-trainer"><i class="fa-solid fa-user-instructor"></i> ${c.trainer}</div>
                    <div class="session-cap">Booked: ${currentBookings}/${c.capacity} ${full ? `<span style="color:var(--accent-red);">(Waitlist)</span>` : ""}</div>
                    <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">Room: ${c.room}</div>
                </div>
            `;
        });

        html += `
            <div class="calendar-col">
                <div class="calendar-day-header">${day}</div>
                <div class="calendar-day-sessions">
                    ${classesHtml || `<p style="color:var(--text-muted);text-align:center;font-size:11px;padding:20px 0;">No classes</p>`}
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
};

// Category filter bind
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("class-category-filter").addEventListener("change", renderClassesWeeklyGrid);
});

const bookClassPrompt = (classId) => {
    const c = db.classes.find(cls => cls.id === classId);
    if (!c) return;

    const currentBookings = db.bookings.filter(b => b.classId === classId).length;
    const full = currentBookings >= c.capacity;

    const memberName = prompt(`Booking for class: "${c.name}" (${c.time} on ${c.day})\n\nTotal spaces booked: ${currentBookings}/${c.capacity}.\nEnter Member ID to Book:`);
    if (!memberName) return;

    const member = db.members.find(m => m.id === memberName.toUpperCase());
    if (!member) {
        alert("Error: Invalid Member ID!");
        return;
    }

    if (member.status !== "active") {
        alert("Error: Membership is frozen or expired. Cannot book classes.");
        return;
    }

    // Check duplicate booking
    const alreadyBooked = db.bookings.find(b => b.classId === classId && b.memberId === member.id);
    if (alreadyBooked) {
        alert("Error: Member is already booked for this class!");
        return;
    }

    const bookingId = "BK-" + Date.now();
    db.bookings.push({
        id: bookingId,
        classId,
        memberId: member.id,
        date: new Date().toLocaleDateString(),
        rating: 0
    });

    if (full) {
        alert(`Warning: The class is full. ${member.name} has been added to the WAITLIST.`);
        addNotification(`Member ${member.name} waitlisted for class ${c.name}.`);
    } else {
        alert(`Success! Booking confirmed for ${member.name}.`);
        addNotification(`Member ${member.name} booked for class ${c.name}.`);
    }

    saveDatabase();
    renderClassesWeeklyGrid();
};

// ==========================================
// 4. Trainer & Staff Hub Module
// ==========================================
const renderStaffHub = () => {
    // 1. Staff list cards
    const grid = document.getElementById("staff-grid");
    grid.innerHTML = db.trainers.map(s => {
        const clients = db.members.filter(m => m.trainer === s.name).length;
        return `
            <div class="staff-card card glass">
                <img src="${s.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`}" class="staff-avatar-lg">
                <h4 class="staff-name-card">${s.name}</h4>
                <div class="staff-role-card">${s.role.toUpperCase()}</div>
                <div class="staff-spec-badges">
                    ${s.specialization.split(",").map(tag => `<span class="badge badge-info">${tag.trim()}</span>`).join("")}
                </div>
                <div class="staff-details-list">
                    <div class="staff-detail-row"><span>Hourly rate:</span><strong>$${s.rate}/hr</strong></div>
                    <div class="staff-detail-row"><span>Active Shift:</span><strong>${s.shift}</strong></div>
                    <div class="staff-detail-row"><span>Clients Assigned:</span><strong>${clients} Members</strong></div>
                    <div class="staff-detail-row"><span>Coach Rating:</span><strong>⭐ ${s.rating.toFixed(1)}</strong></div>
                </div>
                <div style="margin-top:12px; display:flex; gap:6px;">
                    <button class="btn btn-secondary btn-sm" onclick="toggleStaffStatus('${s.id}')">${s.status === 'Active' ? 'Set Off-Duty' : 'Set Active'}</button>
                    <button class="btn btn-danger btn-sm" onclick="removeStaff('${s.id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `;
    }).join("");

    renderTaskBoard();
    renderPayroll();
};

const toggleStaffStatus = (id) => {
    const s = db.trainers.find(t => t.id === id);
    if (s) {
        s.status = s.status === 'Active' ? 'On Leave' : 'Active';
        addNotification(`Staff member ${s.name} status changed to ${s.status}.`);
        saveDatabase();
        renderStaffHub();
    }
};

const removeStaff = (id) => {
    if (confirm("Remove this staff member from registry?")) {
        db.trainers = db.trainers.filter(t => t.id !== id);
        saveDatabase();
        renderStaffHub();
    }
};

// --- Task Board Implementation ---
const renderTaskBoard = () => {
    const todo = document.getElementById("todo-tasks-list");
    const progress = document.getElementById("progress-tasks-list");
    const completed = document.getElementById("completed-tasks-list");

    const lists = { todo, progress, completed };
    Object.keys(lists).forEach(key => lists[key].innerHTML = "");

    db.tasks.forEach(t => {
        const list = lists[t.status];
        if (list) {
            list.innerHTML += `
                <div class="task-item" draggable="true" ondragstart="dragTask(event, '${t.id}')">
                    <p class="task-desc"><strong>${t.desc}</strong></p>
                    <div class="task-meta">
                        <span>Assigned to: ${t.staff}</span>
                        <div class="task-actions">
                            ${t.status === 'todo' ? `<i class="fa-solid fa-circle-play task-action-btn" onclick="moveTask('${t.id}', 'progress')"></i>` : ""}
                            ${t.status === 'progress' ? `<i class="fa-solid fa-circle-check task-action-btn" onclick="moveTask('${t.id}', 'completed')"></i>` : ""}
                            <i class="fa-solid fa-trash task-action-btn" style="color:var(--accent-red);" onclick="deleteTask('${t.id}')"></i>
                        </div>
                    </div>
                </div>
            `;
        }
    });
};

const moveTask = (taskId, newStatus) => {
    const t = db.tasks.find(task => task.id === taskId);
    if (t) {
        t.status = newStatus;
        saveDatabase();
        renderTaskBoard();
    }
};

const deleteTask = (taskId) => {
    db.tasks = db.tasks.filter(t => t.id !== taskId);
    saveDatabase();
    renderTaskBoard();
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-add-task-todo").addEventListener("click", () => {
        const desc = prompt("Enter new staff task details:");
        if (!desc) return;
        const staff = prompt("Enter assignee name (Staff):");
        if (!staff) return;

        db.tasks.push({
            id: "TSK-" + Date.now(),
            desc,
            status: "todo",
            date: new Date().toLocaleDateString(),
            staff
        });
        saveDatabase();
        renderTaskBoard();
    });
});

window.dragTask = (ev, taskId) => {
    ev.dataTransfer.setData("taskId", taskId);
};

document.querySelectorAll(".task-list").forEach(list => {
    list.addEventListener("dragover", (ev) => ev.preventDefault());
    list.addEventListener("drop", (ev) => {
        ev.preventDefault();
        const id = ev.dataTransfer.getData("taskId");
        const listId = list.id;
        let newStatus = "todo";
        if (listId === "progress-tasks-list") newStatus = "progress";
        else if (listId === "completed-tasks-list") newStatus = "completed";
        
        moveTask(id, newStatus);
    });
});

// --- Payroll logic ---
const renderPayroll = () => {
    const tbody = document.querySelector("#payroll-table tbody");
    tbody.innerHTML = db.payroll.map(p => {
        const staff = db.trainers.find(t => t.id === p.staffId) || { name: "Unknown", role: "Staff", rate: 0 };
        const grossPay = (staff.rate * p.hours) + p.commission;
        return `
            <tr>
                <td><strong>${staff.name}</strong></td>
                <td>${staff.role}</td>
                <td>$${staff.rate}/hr</td>
                <td>${p.hours} hours</td>
                <td>$${p.commission.toFixed(2)}</td>
                <td><strong>$${grossPay.toFixed(2)}</strong></td>
                <td><span class="badge ${p.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
                <td>
                    ${p.status === 'Unpaid' ? `
                        <button class="btn btn-success btn-sm" onclick="payStaffSalary('${p.staffId}')">
                            <i class="fa-solid fa-dollar-sign"></i> Disburse Pay
                        </button>
                    ` : `<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i> Paid`}
                </td>
            </tr>
        `;
    }).join("");
};

const payStaffSalary = (staffId) => {
    const p = db.payroll.find(pay => pay.staffId === staffId);
    if (p) {
        p.status = "Paid";
        const staff = db.trainers.find(t => t.id === staffId);
        addNotification(`Disbursed payroll salary for ${staff ? staff.name : "Staff"}.`);
        saveDatabase();
        renderPayroll();
    }
};

// Re-calculate Payroll
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-generate-payroll").addEventListener("click", () => {
        db.payroll.forEach(p => {
            p.hours = Math.floor(Math.random() * 40) + 120;
            const staff = db.trainers.find(t => t.id === p.staffId);
            if (staff) {
                const clientsCount = db.members.filter(m => m.trainer === staff.name).length;
                p.commission = clientsCount * 50;
            }
        });
        saveDatabase();
        renderPayroll();
        alert("Payroll disbursements re-calculated!");
    });
});

// ==========================================
// 5. Billing & Invoices Module
// ==========================================
const renderInvoicesTable = () => {
    const tbody = document.querySelector("#invoices-table tbody");
    const search = document.getElementById("invoice-search").value.toLowerCase();
    
    let filtered = db.invoices.filter(inv => {
        const member = db.members.find(m => m.id === inv.memberId) || { name: "Unknown" };
        return inv.id.toLowerCase().includes(search) || member.name.toLowerCase().includes(search);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--text-muted);">No invoices found.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(inv => {
        const member = db.members.find(m => m.id === inv.memberId) || { name: "Unknown" };
        return `
            <tr>
                <td><code>${inv.id}</code></td>
                <td><strong>${member.name}</strong> <span style="font-size:10px; color:var(--text-muted);">(${inv.memberId})</span></td>
                <td>${inv.date}</td>
                <td>$${inv.amount.toFixed(2)}</td>
                <td>$${inv.discount.toFixed(2)}</td>
                <td>$${inv.tax.toFixed(2)}</td>
                <td><strong>$${inv.total.toFixed(2)}</strong></td>
                <td><span class="badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Refunded' ? 'badge-info' : inv.status === 'Unpaid' ? 'badge-danger' : 'badge-warning'}">${inv.status}</span></td>
                <td>
                    <div style="display:flex; gap:6px;">
                        ${inv.status === 'Unpaid' ? `
                            <button class="btn btn-success btn-sm" onclick="markInvoicePaid('${inv.id}')" title="Collect Payment"><i class="fa-solid fa-circle-dollar-to-slot"></i></button>
                        ` : ''}
                        ${inv.status === 'Paid' ? `
                            <button class="btn btn-secondary btn-sm" onclick="processRefund('${inv.id}')" title="Refund Invoice"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                        ` : ''}
                        <button class="btn btn-secondary btn-sm" onclick="printInvoiceWindow('${inv.id}')" title="Print Invoice"><i class="fa-solid fa-print"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
};

const markInvoicePaid = (id) => {
    const inv = db.invoices.find(invoice => invoice.id === id);
    if (inv) {
        inv.status = "Paid";
        addNotification(`Invoice ${id} paid successfully.`);
        
        const member = db.members.find(m => m.id === inv.memberId);
        if (member && member.status === "expired") {
            member.status = "active";
            const exp = new Date();
            exp.setMonth(exp.getMonth() + 1);
            member.expiry = exp.toISOString().split("T")[0];
        }

        saveDatabase();
        renderInvoicesTable();
    }
};

const processRefund = (id) => {
    if (confirm(`Execute refund for invoice ${id}?`)) {
        const inv = db.invoices.find(invoice => invoice.id === id);
        if (inv) {
            inv.status = "Refunded";
            addNotification(`Refunded transaction ${id}.`);
            saveDatabase();
            renderInvoicesTable();
        }
    }
};

const printInvoiceWindow = (id) => {
    const inv = db.invoices.find(invoice => invoice.id === id);
    if (!inv) return;
    const member = db.members.find(m => m.id === inv.memberId) || { name: "Walk-in", email: "N/A", phone: "N/A" };

    const win = window.open("", "_blank");
    win.document.write(`
        <html>
        <head>
            <title>Invoice - ${inv.id}</title>
            <style>
                body { font-family: sans-serif; padding: 40px; color: #333; }
                .inv-header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .company-name { font-size: 28px; font-weight: bold; }
                .company-sub { color: #666; margin-top: 4px; }
                .inv-title { font-size: 24px; font-weight: bold; text-align: right; }
                .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px; }
                .table { width: 100%; border-collapse: collapse; margin-top: 40px; }
                .table th, .table td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
                .table th { background-color: #f5f5f5; }
                .totals { margin-top: 30px; text-align: right; font-size: 16px; line-height: 1.6; }
                .grand { font-size: 20px; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; margin-top: 10px; }
            </style>
        </head>
        <body onload="window.print()">
            <div class="inv-header">
                <div>
                    <div class="company-name">ApexGym Club</div>
                    <div class="company-sub">Luxury Fitness & Health Centers</div>
                </div>
                <div>
                    <div class="inv-title">INVOICE</div>
                    <div>Invoice ID: <strong>${inv.id}</strong></div>
                    <div>Date: <strong>${inv.date}</strong></div>
                </div>
            </div>
            <div class="details-grid">
                <div>
                    <h3>Billed To:</h3>
                    <strong>${member.name}</strong><br>
                    Email: ${member.email}<br>
                    Phone: ${member.phone}
                </div>
                <div>
                    <h3>Payment Details:</h3>
                    Status: <strong>${inv.status}</strong><br>
                    Method: ${inv.method}<br>
                    Currency: USD
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Billing Item Description</th>
                        <th style="text-align: right;">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${inv.description}</td>
                        <td style="text-align: right;">$${inv.amount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div class="totals">
                <div>Subtotal: $${inv.amount.toFixed(2)}</div>
                <div>Discount Applied: -$${inv.discount.toFixed(2)}</div>
                <div>Sales Tax (18%): $${inv.tax.toFixed(2)}</div>
                <div class="grand">Grand Total Paid: $${inv.total.toFixed(2)}</div>
            </div>
        </body>
        </html>
    `);
    win.document.close();
};

const renderCouponsTable = () => {
    const tbody = document.querySelector("#coupons-table tbody");
    tbody.innerHTML = db.coupons.map(c => `
        <tr>
            <td><code>${c.code}</code></td>
            <td>${c.type === 'percentage' ? 'Percentage (%)' : 'Flat Off ($)'}</td>
            <td>${c.type === 'percentage' ? c.value + '%' : '$' + c.value.toFixed(2)}</td>
            <td>$${c.minOrder.toFixed(2)}</td>
            <td><code>${c.expiry}</code></td>
            <td><span class="badge ${c.status === 'Active' ? 'badge-success' : 'badge-danger'}">${c.status}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCoupon('${c.code}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join("");
};

const deleteCoupon = (code) => {
    db.coupons = db.coupons.filter(c => c.code !== code);
    saveDatabase();
    renderCouponsTable();
};

// --- Expenses Ledger Submodule ---
const renderExpensesLedger = () => {
    const tbody = document.querySelector("#expenses-table tbody");
    if (!tbody) return;

    if (db.expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No expenses recorded.</td></tr>`;
        return;
    }

    tbody.innerHTML = db.expenses.map(exp => `
        <tr>
            <td><code>${exp.id}</code></td>
            <td><strong>${exp.desc}</strong></td>
            <td><span class="badge badge-warning">${exp.category}</span></td>
            <td>${exp.date}</td>
            <td>$${exp.cost.toFixed(2)}</td>
            <td>${exp.ref ? `<code>${exp.ref}</code>` : '--'}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense('${exp.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join("");
};

const deleteExpense = (id) => {
    if (confirm(`Delete operational expense entry ${id}?`)) {
        db.expenses = db.expenses.filter(e => e.id !== id);
        addNotification(`Deleted expense entry ${id}`);
        saveDatabase();
        renderExpensesLedger();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("invoice-search").addEventListener("input", renderInvoicesTable);
});

// ==========================================
// 6. POS & Inventory Module
// ==========================================
let posCart = [];

const renderInventoryPOS = () => {
    const grid = document.getElementById("products-catalog-grid");
    const activeCat = document.querySelector(".cat-filter-btn.active")?.getAttribute("data-cat") || "all";

    let filtered = db.inventory.filter(p => activeCat === "all" || p.category === activeCat);

    grid.innerHTML = filtered.map(p => `
        <div class="catalog-item-card card glass">
            <div class="catalog-item-icon">
                <i class="fa-solid ${p.category === 'Supplements' ? 'fa-jar-wheat' : p.category === 'Drinks' ? 'fa-bottle-water' : p.category === 'Apparel' ? 'fa-shirt' : 'fa-dumbbell'}"></i>
            </div>
            <h4 class="catalog-item-name">${p.name}</h4>
            <div class="catalog-item-price">$${p.price.toFixed(2)}</div>
            <div class="catalog-item-stock">
                Stock: ${p.stock <= 0 ? `<span style="color:var(--accent-red); font-weight:700;">OUT OF STOCK</span>` : p.stock <= 5 ? `<span style="color:var(--accent-orange); font-weight:700;">LOW STOCK (${p.stock})</span>` : p.stock}
            </div>
            <button class="btn btn-primary btn-sm btn-full" onclick="addToPOSCart('${p.id}')" ${p.stock <= 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `).join("");

    // Category button binding
    document.querySelectorAll(".cat-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderInventoryPOS();
        });
    });

    const memberDrop = document.getElementById("cart-member-dropdown");
    memberDrop.innerHTML = `<option value="">Walk-In Customer (Anonymous)</option>` + 
        db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");

    renderPOSCart();
};

const addToPOSCart = (prodId) => {
    const prod = db.inventory.find(p => p.id === prodId);
    if (!prod) return;

    const cartItem = posCart.find(item => item.id === prodId);
    if (cartItem) {
        if (cartItem.qty >= prod.stock) {
            alert("Warning: Cannot exceed available store inventory stock limit!");
            return;
        }
        cartItem.qty++;
    } else {
        posCart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
    }

    renderPOSCart();
};

const renderPOSCart = () => {
    const list = document.getElementById("cart-items-list");
    
    if (posCart.length === 0) {
        list.innerHTML = `<p class="empty-cart-message">Shopping cart is empty</p>`;
        updateCartCalculations(0);
        return;
    }

    list.innerHTML = posCart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
            <div class="cart-qty-row">
                <button class="cart-qty-btn" onclick="adjustCartQty('${item.id}', -1)">-</button>
                <span>${item.qty}</span>
                <button class="cart-qty-btn" onclick="adjustCartQty('${item.id}', 1)">+</button>
            </div>
        </div>
    `).join("");

    let subtotal = 0;
    posCart.forEach(item => subtotal += (item.price * item.qty));
    updateCartCalculations(subtotal);
};

const adjustCartQty = (id, diff) => {
    const item = posCart.find(i => i.id === id);
    if (!item) return;

    const prod = db.inventory.find(p => p.id === id);

    item.qty += diff;
    if (item.qty <= 0) {
        posCart = posCart.filter(i => i.id !== id);
    } else if (item.qty > prod.stock) {
        alert("Warning: Cannot exceed available store inventory stock limit!");
        item.qty = prod.stock;
    }

    renderPOSCart();
};

let appliedCoupon = null;

const updateCartCalculations = (subtotal) => {
    const taxRate = db.taxRate / 100;
    
    let discount = 0;
    if (appliedCoupon) {
        if (subtotal >= appliedCoupon.minOrder) {
            if (appliedCoupon.type === "percentage") {
                discount = subtotal * (appliedCoupon.value / 100);
            } else {
                discount = appliedCoupon.value;
            }
        } else {
            appliedCoupon = null;
            document.getElementById("cart-coupon-feedback").innerHTML = `<span style="color:var(--accent-red);">Coupon removed: Min order limit not met</span>`;
        }
    }

    const netSubtotal = Math.max(0, subtotal - discount);
    const tax = netSubtotal * taxRate;
    const total = netSubtotal + tax;

    document.getElementById("cart-subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("cart-tax").innerText = `$${tax.toFixed(2)}`;
    document.getElementById("cart-total").innerText = `$${total.toFixed(2)}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-cart").addEventListener("click", () => {
        posCart = [];
        appliedCoupon = null;
        document.getElementById("cart-coupon-feedback").innerText = "";
        document.getElementById("cart-coupon-input").value = "";
        renderPOSCart();
    });

    document.getElementById("btn-apply-cart-coupon").addEventListener("click", () => {
        const input = document.getElementById("cart-coupon-input").value.trim().toUpperCase();
        const feedback = document.getElementById("cart-coupon-feedback");
        
        if (!input) return;

        const coupon = db.coupons.find(c => c.code === input && c.status === "Active");
        if (!coupon) {
            feedback.innerHTML = `<span style="color:var(--accent-red);">Invalid or Expired Coupon!</span>`;
            return;
        }

        let subtotal = 0;
        posCart.forEach(item => subtotal += (item.price * item.qty));

        if (subtotal < coupon.minOrder) {
            feedback.innerHTML = `<span style="color:var(--accent-red);">Min order required: $${coupon.minOrder}</span>`;
            return;
        }

        appliedCoupon = coupon;
        feedback.innerHTML = `<span style="color:var(--accent-green);">Coupon applied: -${coupon.type === 'percentage' ? coupon.value + '%' : '$' + coupon.value}</span>`;
        renderPOSCart();
    });

    document.getElementById("btn-pos-checkout").addEventListener("click", () => {
        if (posCart.length === 0) {
            alert("Checkout Error: Cart is empty!");
            return;
        }

        const memberId = document.getElementById("cart-member-dropdown").value;
        const totalStr = document.getElementById("cart-total").innerText.replace("$", "");
        const taxStr = document.getElementById("cart-tax").innerText.replace("$", "");
        const subtotalStr = document.getElementById("cart-subtotal").innerText.replace("$", "");

        const totalAmount = parseFloat(totalStr);
        const taxAmount = parseFloat(taxStr);
        const subtotalAmount = parseFloat(subtotalStr);
        const discountAmount = Math.max(0, subtotalAmount - (totalAmount - taxAmount));

        posCart.forEach(item => {
            const prod = db.inventory.find(p => p.id === item.id);
            if (prod) {
                prod.stock -= item.qty;
            }
        });

        const invId = "INV-POS-" + Date.now();
        db.invoices.push({
            id: invId,
            memberId: memberId || "Walk-In Customer",
            description: `POS Checkout Store Sale (${posCart.map(i => `${i.name} x${i.qty}`).join(", ")})`,
            amount: subtotalAmount,
            discount: discountAmount,
            tax: taxAmount,
            total: totalAmount,
            status: "Paid",
            date: new Date().toISOString().split("T")[0],
            method: "Card"
        });

        addNotification(`POS Store Sale checkout complete. Paid Total: $${totalAmount.toFixed(2)}`);

        saveDatabase();
        posCart = [];
        appliedCoupon = null;
        document.getElementById("cart-coupon-feedback").innerText = "";
        document.getElementById("cart-coupon-input").value = "";
        
        alert("POS Checkout Complete!");
        renderInventoryPOS();
    });
});

// ==========================================
// 7. Body & Workouts Module
// ==========================================
const renderBodyStatsModule = () => {
    const dropdown = document.getElementById("metrics-member-id");
    dropdown.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
    dropdown.addEventListener("change", loadBodyMetricsDetails);
    loadBodyMetricsDetails();
};

const loadBodyMetricsDetails = () => {
    const select = document.getElementById("metrics-member-id");
    const display = document.getElementById("metrics-results-display");
    if (!select || !select.value) return;

    const memberId = select.value;
    const member = db.members.find(m => m.id === memberId);
    if (!member) return;

    const stats = db.measurements.filter(st => st.memberId === memberId);
    
    if (stats.length === 0) {
        display.innerHTML = `
            <p class="select-prompt">No measurement records for ${member.name}. Enter statistics to begin tracking.</p>
        `;
        return;
    }

    const latest = stats[stats.length - 1];
    
    let progressHtml = ``;
    if (latest.target) {
        const diffTotal = Math.abs(stats[0].weight - latest.target);
        const diffCurrent = Math.abs(latest.weight - latest.target);
        const progressPct = diffTotal > 0 ? Math.min(100, Math.max(0, ((diffTotal - diffCurrent) / diffTotal) * 100)) : 100;
        
        progressHtml = `
            <div class="goal-tracker mt-2" style="background-color: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md);">
                <div class="calc-row"><span>Goal Progress:</span><strong>Target ${latest.target} kg</strong></div>
                <div class="progress-bar-bg" style="width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; margin-top: 6px; overflow:hidden;">
                    <div class="progress-bar-fill" style="width: ${progressPct}%; height: 100%; background: var(--primary);"></div>
                </div>
                <span style="font-size:10px; color:var(--text-muted); margin-top:4px; display:block;">Current weight: ${latest.weight} kg (${progressPct.toFixed(0)}% reached)</span>
            </div>
        `;
    }

    display.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <h4>${member.name}'s Fitness Stats</h4>
            <span class="badge badge-info">Latest log: ${latest.date}</span>
        </div>
        <div class="kpi-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom:16px;">
            <div class="kpi-card" style="background-color:var(--bg-tertiary); padding: 10px 14px;">
                <div class="kpi-details">
                    <span class="kpi-label">Current Weight</span>
                    <h3 style="font-weight:700;">${latest.weight} kg</h3>
                </div>
            </div>
            <div class="kpi-card" style="background-color:var(--bg-tertiary); padding: 10px 14px;">
                <div class="kpi-details">
                    <span class="kpi-label">Body Mass Index (BMI)</span>
                    <h3 style="font-weight:700; color: ${latest.bmi > 25 ? 'var(--accent-orange)' : latest.bmi < 18.5 ? 'var(--accent-red)' : 'var(--accent-green)'}">${latest.bmi.toFixed(1)}</h3>
                </div>
            </div>
        </div>
        <div class="staff-details-list">
            <div class="staff-detail-row"><span>Height:</span><strong>${latest.height} cm</strong></div>
            <div class="staff-detail-row"><span>Waist circumference:</span><strong>${latest.waist || '--'} cm</strong></div>
            <div class="staff-detail-row"><span>Chest measurement:</span><strong>${latest.chest || '--'} cm</strong></div>
            <div class="staff-detail-row"><span>Estimated Body Fat %:</span><strong>${latest.bodyfat || '--'}%</strong></div>
        </div>
        ${progressHtml}
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("body-metrics-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const memberId = document.getElementById("metrics-member-id").value;
        const height = parseFloat(document.getElementById("metrics-height").value);
        const weight = parseFloat(document.getElementById("metrics-weight").value);
        const bodyfat = parseFloat(document.getElementById("metrics-bodyfat").value || 0);
        const target = parseFloat(document.getElementById("metrics-target-weight").value || 0);
        const chest = parseFloat(document.getElementById("metrics-chest").value || 0);
        const waist = parseFloat(document.getElementById("metrics-waist").value || 0);

        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);

        const newLog = {
            memberId, height, weight, bodyfat, target, chest, waist, bmi,
            date: new Date().toISOString().split("T")[0]
        };

        db.measurements.push(newLog);
        addNotification(`Updated fitness body measurements for member ${memberId}`);
        saveDatabase();
        loadBodyMetricsDetails();

        document.getElementById("metrics-height").value = "";
        document.getElementById("metrics-weight").value = "";
        document.getElementById("metrics-bodyfat").value = "";
        document.getElementById("metrics-target-weight").value = "";
        document.getElementById("metrics-chest").value = "";
        document.getElementById("metrics-waist").value = "";
    });
});

// --- Workout Planner Routine Builder Submodule ---
const renderWorkoutPlannerModule = () => {
    const memberSelect = document.getElementById("workout-member-select");
    memberSelect.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
    memberSelect.addEventListener("change", loadMemberWorkoutRoutine);

    document.getElementById("workout-template-select").addEventListener("change", (e) => {
        const val = e.target.value;
        const container = document.getElementById("exercise-rows-container");
        container.innerHTML = "";

        if (val === "ppl-push") {
            addExerciseRow("Flat Bench Press", 4, 10, 80);
            addExerciseRow("Overhead Dumbbell Press", 3, 12, 22);
            addExerciseRow("Incline Dumbbell Flyes", 3, 12, 18);
            addExerciseRow("Triceps Rope Pushdown", 4, 15, 25);
        } else if (val === "ppl-pull") {
            addExerciseRow("Conventional Deadlift", 3, 5, 120);
            addExerciseRow("Lat Pulldowns", 4, 12, 60);
            addExerciseRow("Seated Cable Rows", 3, 12, 55);
            addExerciseRow("Incline Dumbbell Biceps Curl", 3, 12, 14);
        } else if (val === "ppl-legs") {
            addExerciseRow("Barbell Back Squats", 4, 8, 90);
            addExerciseRow("Romanian Deadlifts", 3, 10, 80);
            addExerciseRow("Leg Extensions", 3, 15, 45);
            addExerciseRow("Seated Calf Raises", 4, 15, 30);
        } else if (val === "cardio-burn") {
            addExerciseRow("High Knees HIIT", 3, 45, 0);
            addExerciseRow("Kettlebell Swings", 3, 20, 16);
            addExerciseRow("Mountain Climbers", 3, 45, 0);
            addExerciseRow("Rowing Machine Sprint", 4, 500, 0);
        }
    });

    loadMemberWorkoutRoutine();
};

const addExerciseRow = (name = "", sets = 3, reps = 12, weight = 15) => {
    const container = document.getElementById("exercise-rows-container");
    const div = document.createElement("div");
    div.className = "exercise-row";
    div.innerHTML = `
        <input type="text" placeholder="Exercise name" value="${name}" required>
        <input type="number" placeholder="Sets" value="${sets}" style="max-width: 60px;" required>
        <input type="number" placeholder="Reps/Secs" value="${reps}" style="max-width: 70px;" required>
        <input type="number" placeholder="Wt(kg)" value="${weight}" style="max-width: 70px;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="this.closest('.exercise-row').remove()" style="padding:4px 8px; color:var(--accent-red);">&times;</button>
    `;
    container.appendChild(div);
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-add-exercise-row").addEventListener("click", () => addExerciseRow());
    
    document.getElementById("btn-save-workout-routine").addEventListener("click", () => {
        const memberId = document.getElementById("workout-member-select").value;
        const container = document.getElementById("exercise-rows-container");
        const rows = container.querySelectorAll(".exercise-row");

        let routineExercises = [];
        rows.forEach(r => {
            const inputs = r.querySelectorAll("input");
            routineExercises.push({
                name: inputs[0].value,
                sets: parseInt(inputs[1].value),
                reps: parseInt(inputs[2].value),
                weight: parseFloat(inputs[3].value || 0)
            });
        });

        db.workouts = db.workouts.filter(w => w.memberId !== memberId);
        db.workouts.push({
            memberId,
            exercises: routineExercises,
            date: new Date().toLocaleDateString()
        });

        addNotification(`Assigned new workout routine for member ${memberId}`);
        saveDatabase();
        loadMemberWorkoutRoutine();
        alert("Workout routine saved successfully!");
    });
});

const loadMemberWorkoutRoutine = () => {
    const memberId = document.getElementById("workout-member-select").value;
    const viewer = document.getElementById("workout-plan-viewer");
    const member = db.members.find(m => m.id === memberId);
    if (!member) return;

    const routine = db.workouts.find(w => w.memberId === memberId);
    if (!routine || routine.exercises.length === 0) {
        viewer.innerHTML = `<p class="select-prompt">No workout routine assigned to ${member.name}. Complete the creator form on the left to assign one.</p>`;
        return;
    }

    viewer.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <h4>${member.name}'s Routine</h4>
            <span style="font-size:10px; color:var(--text-muted);">Assigned: ${routine.date}</span>
        </div>
        <div class="table-responsive">
            <table class="table" style="font-size:12px;">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps/Time</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    ${routine.exercises.map(ex => `
                        <tr>
                            <td><strong>${ex.name}</strong></td>
                            <td>${ex.sets}</td>
                            <td>${ex.reps}</td>
                            <td>${ex.weight > 0 ? ex.weight + ' kg' : 'Bodyweight'}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
};

// --- Diet Tracker Submodule ---
const renderDietTrackerModule = () => {
    const memberSelect = document.getElementById("diet-member-select");
    memberSelect.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
    memberSelect.addEventListener("change", loadDietDetails);
    
    loadWaterTrackerDetails();
    loadDietDetails();
};

const loadDietDetails = () => {
    const memberId = document.getElementById("diet-member-select").value;
    const container = document.getElementById("diet-meals-container");
    const member = db.members.find(m => m.id === memberId);
    if (!member) return;

    const meals = db.meals.filter(ml => ml.memberId === memberId);
    if (meals.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:12px; padding:20px;">No meals logged today for ${member.name}.</p>`;
        return;
    }

    let totCal = 0, totProt = 0, totCarb = 0;
    let mealsHtml = meals.map(ml => {
        totCal += ml.calories;
        totProt += ml.protein;
        totCarb += ml.carbs;
        return `
            <div class="meal-log-item">
                <div>
                    <div class="meal-desc">${ml.name}</div>
                    <span class="meal-stats">${ml.time} | P: ${ml.protein}g, C: ${ml.carbs}g</span>
                </div>
                <div class="meal-cal">${ml.calories} kcal</div>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; background:var(--bg-tertiary); padding:10px; border-radius:var(--radius-md);">
            <span>Daily Totals:</span>
            <strong>${totCal} kcal | P: ${totProt}g | C: ${totCarb}g</strong>
        </div>
        <div class="diet-meals-log">${mealsHtml}</div>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-add-meal-modal").addEventListener("click", () => {
        document.getElementById("modal-diet").classList.add("active");
    });

    document.getElementById("diet-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const memberId = document.getElementById("diet-member-select").value;
        const name = document.getElementById("diet-meal-name").value;
        const time = document.getElementById("diet-meal-time").value;
        const calories = parseInt(document.getElementById("diet-calories").value);
        const protein = parseInt(document.getElementById("diet-protein").value || 0);
        const carbs = parseInt(document.getElementById("diet-carbs").value || 0);

        db.meals.push({
            id: "ML-" + Date.now(), memberId, name, time, calories, protein, carbs
        });
        
        saveDatabase();
        loadDietDetails();
        document.getElementById("modal-diet").classList.remove("active");
        
        document.getElementById("diet-meal-name").value = "";
        document.getElementById("diet-meal-time").value = "";
        document.getElementById("diet-calories").value = "450";
        document.getElementById("diet-protein").value = "35";
        document.getElementById("diet-carbs").value = "45";
    });
});

const loadWaterTrackerDetails = () => {
    const todayStr = new Date().toLocaleDateString();
    const current = db.waterLog[todayStr] || 0.0;
    
    document.getElementById("water-current-liters").innerText = current.toFixed(1);
    
    const pct = Math.min(100, (current / 4.0) * 100);
    document.getElementById("water-intake-percentage").style.height = `${pct}%`;
};

document.addEventListener("DOMContentLoaded", () => {
    const adjustWater = (amount) => {
        const todayStr = new Date().toLocaleDateString();
        const current = db.waterLog[todayStr] || 0.0;
        db.waterLog[todayStr] = Math.max(0, current + amount);
        saveDatabase();
        loadWaterTrackerDetails();
    };

    document.getElementById("btn-add-water-250").addEventListener("click", () => adjustWater(0.25));
    document.getElementById("btn-add-water-500").addEventListener("click", () => adjustWater(0.50));
    document.getElementById("btn-add-water-1000").addEventListener("click", () => adjustWater(1.00));
    document.getElementById("btn-reset-water").addEventListener("click", () => {
        const todayStr = new Date().toLocaleDateString();
        db.waterLog[todayStr] = 0.0;
        saveDatabase();
        loadWaterTrackerDetails();
    });
});

// ==========================================
// 8. Asset Manager Module
// ==========================================
const renderAssetsTable = () => {
    const tbody = document.querySelector("#assets-table tbody");
    tbody.innerHTML = db.assets.map(a => `
        <tr>
            <td><code>${a.serial}</code></td>
            <td><strong>${a.name}</strong></td>
            <td>${a.buyDate}</td>
            <td>
                <span class="badge ${a.status === 'Operational' ? 'badge-success' : a.status === 'Under Maintenance' ? 'badge-warning' : 'badge-danger'}">
                    ${a.status.toUpperCase()}
                </span>
            </td>
            <td>${a.lastMaintenance}</td>
            <td>${a.nextService}</td>
            <td>$${a.cost.toFixed(2)}</td>
            <td>
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-secondary btn-sm" onclick="triggerAssetService('${a.serial}')" title="Log Service Check"><i class="fa-solid fa-wrench"></i> Serviced</button>
                    <button class="btn btn-danger btn-sm" onclick="reportAssetBroken('${a.serial}')" title="Report Out of Order"><i class="fa-solid fa-triangle-exclamation"></i> Broken</button>
                </div>
            </td>
        </tr>
    `).join("");
};

const triggerAssetService = (serial) => {
    const a = db.assets.find(asset => asset.serial === serial);
    if (a) {
        const todayStr = new Date().toISOString().split("T")[0];
        a.lastMaintenance = todayStr;
        a.status = "Operational";
        const nxt = new Date();
        nxt.setMonth(nxt.getMonth() + 6);
        a.nextService = nxt.toISOString().split("T")[0];

        addNotification(`Logged preventive maintenance service for equipment ${a.name}.`);
        saveDatabase();
        renderAssetsTable();
        alert(`Asset ${a.name} is checked off and marked operational!`);
    }
};

const reportAssetBroken = (serial) => {
    const a = db.assets.find(asset => asset.serial === serial);
    if (a) {
        a.status = "Broken";
        const repairCost = parseFloat(prompt(`Enter reported repair cost estimation ($) for ${a.name}:`, "50.00"));
        if (!isNaN(repairCost)) {
            a.cost += repairCost;
            
            // Record in Expenses Ledger
            const expId = "EXP-MNT-" + Date.now();
            db.expenses.push({
                id: expId,
                desc: `Repair and servicing costs for ${a.name}`,
                category: "Maintenance",
                date: new Date().toISOString().split("T")[0],
                cost: repairCost,
                ref: a.serial
            });
        }

        addNotification(`Equipment ${a.name} reported BROKEN. Maintenance requested.`);
        saveDatabase();
        renderAssetsTable();
        refreshTab("billing"); // refreshes expense table
    }
};

// ==========================================
// 9. Analytics Reports Panel Module
// ==========================================
const renderAnalyticsCharts = () => {
    // 1. Membership Package Distribution Donut Chart (SVG)
    const donutContainer = document.getElementById("membership-donut-container");
    
    let plansCount = { "Basic Plan": 0, "Premium Plan": 0, "VIP Elite Plan": 0 };
    db.members.forEach(m => {
        if (plansCount[m.plan] !== undefined) plansCount[m.plan]++;
    });

    const total = db.members.length || 1;
    const basicPct = (plansCount["Basic Plan"] / total) * 100;
    const premPct = (plansCount["Premium Plan"] / total) * 100;
    const vipPct = (plansCount["VIP Elite Plan"] / total) * 100;

    donutContainer.innerHTML = `
        <svg viewBox="0 0 100 100" class="donut-svg">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-green)" stroke-width="12" 
                stroke-dasharray="${basicPct} 100" stroke-dashoffset="0"></circle>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--primary)" stroke-width="12" 
                stroke-dasharray="${premPct} 100" stroke-dashoffset="-${basicPct}"></circle>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-blue)" stroke-width="12" 
                stroke-dasharray="${vipPct} 100" stroke-dashoffset="-${basicPct + premPct}"></circle>
        </svg>
        <div class="donut-legends" style="margin-left: 20px; display:flex; flex-direction:column; gap:8px;">
            <div><span class="legend-dot" style="background-color: var(--accent-green);"></span>Basic: ${plansCount["Basic Plan"]} (${basicPct.toFixed(0)}%)</div>
            <div><span class="legend-dot" style="background-color: var(--primary);"></span>Premium: ${plansCount["Premium Plan"]} (${premPct.toFixed(0)}%)</div>
            <div><span class="legend-dot" style="background-color: var(--accent-blue);"></span>VIP Elite: ${plansCount["VIP Elite Plan"]} (${vipPct.toFixed(0)}%)</div>
        </div>
    `;

    // 2. Attendance Hourly Heatmap Grid
    const heatContainer = document.getElementById("attendance-heatmap-container");
    const hours = ["6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"];
    const frequencies = [2, 5, 8, 12, 10, 4, 3, 2, 4, 6, 9, 14, 15, 11, 7, 3];
    
    let cellHtml = ``;
    hours.forEach((hr, idx) => {
        const val = frequencies[idx];
        const statusClass = val >= 12 ? 'cell-high' : val >= 6 ? 'cell-med' : 'cell-low';
        cellHtml += `
            <div class="heatmap-cell ${statusClass}" title="${hr} hour: ${val} average checkins">
                ${hr}<br><strong>${val}</strong>
            </div>
        `;
    });

    heatContainer.innerHTML = `
        <p style="font-size:11px;color:var(--text-muted);">Darker grids represent peak gym occupancy load hours.</p>
        <div class="heatmap-grid">${cellHtml}</div>
    `;
};

// Global Printing Handler for Reports
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-print-analytics-report").addEventListener("click", () => {
        const totalSales = db.invoices.filter(i => i.status === "Paid").reduce((acc, i) => acc + i.total, 0);
        const outstanding = db.invoices.filter(i => i.status === "Unpaid").reduce((acc, i) => acc + i.total, 0);
        const totalExpenses = db.expenses.reduce((acc, e) => acc + e.cost, 0);
        const profit = totalSales - totalExpenses;
        
        const win = window.open("", "_blank");
        win.document.write(`
            <html>
            <head>
                <title>ApexGym Executive Analytics Report</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    h1 { border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .kpi-row { display: flex; justify-content: space-between; margin: 30px 0; }
                    .kpi { border: 1px solid #ccc; padding: 20px; width: 22%; border-radius: 6px; text-align: center; }
                    .kpi h2 { margin: 10px 0 0 0; font-size: 28px; }
                </style>
            </head>
            <body onload="window.print()">
                <h1>ApexGym Performance Analytics Summary</h1>
                <p>Report Generated On: ${new Date().toLocaleString()}</p>
                <div class="kpi-row">
                    <div class="kpi"><span>Total Members</span><h2>${db.members.length}</h2></div>
                    <div class="kpi"><span>Total Paid Revenue</span><h2>$${totalSales.toFixed(2)}</h2></div>
                    <div class="kpi"><span>Total Expenses</span><h2>$${totalExpenses.toFixed(2)}</h2></div>
                    <div class="kpi"><span>Net Operating Profit</span><h2 style="color: ${profit >= 0 ? 'green' : 'red'};">$${profit.toFixed(2)}</h2></div>
                </div>
                <h3>Smart Locker Allocations</h3>
                <p>Occupied Locker keys: ${db.lockers.filter(l => l.occupied).map(l => `L-${l.number} (${l.memberId})`).join(", ") || "None"}</p>
                <h3>Active Classes & Roster Count</h3>
                <ul>
                    ${db.classes.map(c => `<li>${c.name} - Instructor: ${c.trainer} (${c.time} on ${c.day})</li>`).join("")}
                </ul>
                <h3>Asset Issues Summary</h3>
                <ul>
                    ${db.assets.map(a => `<li>${a.name} (S/N: ${a.serial}) - Status: <strong>${a.status}</strong></li>`).join("")}
                </ul>
            </body>
            </html>
        `);
        win.document.close();
    });
});

// ==========================================
// 10. System Settings Panel Module
// ==========================================
const loadSettingsForm = () => {
    document.getElementById("settings-gym-name").value = db.gymName || "ApexGym Club";
    document.getElementById("settings-currency").value = db.currency || "USD";
    document.getElementById("settings-tax-rate").value = db.taxRate || 18;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-save-settings").addEventListener("click", () => {
        db.gymName = document.getElementById("settings-gym-name").value;
        db.currency = document.getElementById("settings-currency").value;
        db.taxRate = parseFloat(document.getElementById("settings-tax-rate").value || 18);
        
        saveDatabase();
        alert("Global configurations saved!");
        addNotification("Updated global gym settings configurations.");
    });

    document.getElementById("btn-settings-backup").addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "ApexGym_Full_Backup.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        addNotification("Created system database JSON backup.");
    });

    document.getElementById("settings-restore-file").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (parsed.members && parsed.trainers && parsed.invoices) {
                    db = parsed;
                    saveDatabase();
                    alert("Database restored successfully!");
                    addNotification("Restored system database from file backup.");
                    location.reload();
                } else {
                    alert("Invalid backup file format.");
                }
            } catch (err) {
                alert("Error reading file.");
            }
        };
        reader.readAsText(file);
    });

    document.getElementById("btn-settings-reset").addEventListener("click", () => {
        if (confirm("WARNING: Wipe database and reload mock defaults?")) {
            localStorage.removeItem("apexgym_db");
            seedMockData();
            saveDatabase();
            alert("Database reset to factory default demo mock state!");
            location.reload();
        }
    });
});

// ==========================================
// Modal Interactivities Bindings
// ==========================================
const bindAllModals = () => {
    const setupModalTrigger = (btnId, modalId) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        if (btn && modal) {
            btn.addEventListener("click", () => {
                modal.classList.add("active");
            });
        }
    };

    setupModalTrigger("btn-add-member-modal", "modal-member");
    setupModalTrigger("btn-add-staff-modal", "modal-staff");
    setupModalTrigger("btn-create-class-modal", "modal-class");
    setupModalTrigger("btn-create-invoice-modal", "modal-invoice");
    setupModalTrigger("btn-add-coupon-modal", "modal-coupon");
    setupModalTrigger("btn-add-inventory-modal", "modal-inventory");
    setupModalTrigger("btn-add-asset-modal", "modal-asset");
    setupModalTrigger("btn-allocate-locker-modal", "modal-locker");
    setupModalTrigger("btn-add-expense-modal", "modal-expense");
    setupModalTrigger("btn-add-feedback-modal", "modal-feedback");

    // Modal forms submissions

    // Smart Locker Allocation
    document.getElementById("locker-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const num = parseInt(document.getElementById("locker-number").value);
        const memberId = document.getElementById("locker-member-id").value;
        const code = document.getElementById("locker-code").value;

        const locker = db.lockers.find(l => l.number === num);
        if (locker) {
            locker.occupied = true;
            locker.memberId = memberId;
            locker.code = code;

            const member = db.members.find(m => m.id === memberId);
            addNotification(`Allocated Locker key L-${num} to ${member ? member.name : memberId}`);
            saveDatabase();
            renderLockersBay();
            document.getElementById("modal-locker").classList.remove("active");
        }
    });

    // operational expense log
    document.getElementById("expense-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const desc = document.getElementById("exp-desc").value;
        const category = document.getElementById("exp-cat").value;
        const cost = parseFloat(document.getElementById("exp-cost").value);
        const ref = document.getElementById("exp-ref").value;

        const expId = "EXP-" + (5000 + db.expenses.length + 1);
        db.expenses.push({
            id: expId,
            desc,
            category,
            date: new Date().toISOString().split("T")[0],
            cost,
            ref
        });

        addNotification(`Logged Operational Expense ${expId} for $${cost.toFixed(2)}`);
        saveDatabase();
        renderExpensesLedger();
        document.getElementById("modal-expense").classList.remove("active");
        document.getElementById("expense-form").reset();
    });

    // member feedback log
    document.getElementById("feedback-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const memberId = document.getElementById("fb-member-id").value;
        const category = document.getElementById("fb-cat").value;
        const severity = document.getElementById("fb-severity").value;
        const msg = document.getElementById("fb-msg").value;

        const member = db.members.find(m => m.id === memberId) || { name: "Unknown" };
        db.feedbacks.push({
            memberId,
            name: member.name,
            date: new Date().toISOString().split("T")[0],
            category,
            msg,
            severity,
            status: "Pending"
        });

        addNotification(`Recorded client feedback complaint from ${member.name}`);
        saveDatabase();
        renderFeedbacksTable();
        document.getElementById("modal-feedback").classList.remove("active");
        document.getElementById("feedback-form").reset();
    });

    // Add Member
    document.getElementById("member-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("member-id-edit").value;
        const name = document.getElementById("member-name").value;
        const email = document.getElementById("member-email").value;
        const phone = document.getElementById("member-phone").value;
        const plan = document.getElementById("member-plan").value;
        const trainer = document.getElementById("member-trainer").value;
        const gender = document.getElementById("member-gender").value;
        const avatar = document.getElementById("member-avatar").value;
        const emergencyName = document.getElementById("member-emergency-name").value;
        const emergencyPhone = document.getElementById("member-emergency-phone").value;
        const medical = document.getElementById("member-medical").value;

        if (editId) {
            const memberIndex = db.members.findIndex(m => m.id === editId);
            if (memberIndex !== -1) {
                db.members[memberIndex] = {
                    ...db.members[memberIndex],
                    name, email, phone, plan, trainer, gender, avatar, emergencyName, emergencyPhone, medical
                };
                addNotification(`Modified member profile ${editId}`);
            }
        } else {
            const newId = "M" + (700 + db.members.length + 1);
            
            const expDate = new Date();
            expDate.setMonth(expDate.getMonth() + 1);
            const expiry = expDate.toISOString().split("T")[0];

            db.members.push({
                id: newId, name, email, phone, plan, trainer, gender, avatar, status: "active", expiry, medical, emergencyName, emergencyPhone, goals: "Fitness", birthday: "01-01"
            });
            addNotification(`Registered new member profile ${newId} (${name})`);
        }

        saveDatabase();
        renderMembersTable();
        document.getElementById("modal-member").classList.remove("active");
        
        document.getElementById("member-form").reset();
        document.getElementById("member-id-edit").value = "";
        document.getElementById("member-modal-title").innerText = "Add New Member";
    });

    // Register Staff
    document.getElementById("staff-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("staff-name").value;
        const role = document.getElementById("staff-role").value;
        const specialization = document.getElementById("staff-specialization").value || "General Operations";
        const rate = parseFloat(document.getElementById("staff-hourly-rate").value);
        const shift = document.getElementById("staff-shift").value;
        const avatar = document.getElementById("staff-avatar").value;

        const newId = (role === "Trainer" ? "T" : "S") + (100 + db.trainers.length + 1);
        db.trainers.push({
            id: newId, name, role, specialization, rate, shift, avatar, status: "Active", rating: 5.0, certified: true
        });

        db.payroll.push({ staffId: newId, hours: 0, commission: 0, status: "Unpaid" });

        addNotification(`Registered staff member ${newId} (${name})`);
        saveDatabase();
        renderStaffHub();
        document.getElementById("modal-staff").classList.remove("active");
        document.getElementById("staff-form").reset();
    });

    // Schedule Class
    document.getElementById("class-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("class-name").value;
        const category = document.getElementById("class-category").value;
        const trainer = document.getElementById("class-trainer").value;
        const day = document.getElementById("class-day").value;
        const time = document.getElementById("class-time").value;
        const capacity = parseInt(document.getElementById("class-capacity").value);
        const room = document.getElementById("class-room").value;
        const difficulty = document.getElementById("class-difficulty").value;
        const zoom = document.getElementById("class-zoom").value;

        const newId = "C" + (300 + db.classes.length + 1);
        db.classes.push({
            id: newId, name, category, trainer, day, time, capacity, room, difficulty, zoom
        });

        addNotification(`Scheduled new class session ${name} on ${day}`);
        saveDatabase();
        renderClassesWeeklyGrid();
        document.getElementById("modal-class").classList.remove("active");
        document.getElementById("class-form").reset();
    });

    // Create Invoice
    document.getElementById("invoice-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const memberId = document.getElementById("invoice-member-id").value;
        const description = document.getElementById("invoice-description").value;
        const amount = parseFloat(document.getElementById("invoice-amount").value);
        const method = document.getElementById("invoice-payment-method").value;
        const couponCode = document.getElementById("invoice-coupon").value;
        const status = document.getElementById("invoice-status").value;

        let discount = 0;
        if (couponCode) {
            const coupon = db.coupons.find(c => c.code === couponCode);
            if (coupon) {
                if (coupon.type === "percentage") {
                    discount = amount * (coupon.value / 100);
                } else {
                    discount = coupon.value;
                }
            }
        }

        const netBase = Math.max(0, amount - discount);
        const tax = netBase * (db.taxRate / 100);
        const total = netBase + tax;

        const newId = "INV-" + (2000 + db.invoices.length + 1);
        db.invoices.push({
            id: newId, memberId, description, amount, discount, tax, total, status, date: new Date().toISOString().split("T")[0], method
        });

        addNotification(`Generated billing invoice ${newId} for member ${memberId}`);
        saveDatabase();
        renderInvoicesTable();
        document.getElementById("modal-invoice").classList.remove("active");
        document.getElementById("invoice-form").reset();
    });

    // Register Coupon
    document.getElementById("coupon-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const code = document.getElementById("coupon-code").value.trim().toUpperCase();
        const type = document.getElementById("coupon-type").value;
        const value = parseFloat(document.getElementById("coupon-value").value);
        const minOrder = parseFloat(document.getElementById("coupon-min-order").value || 0);
        const expiry = document.getElementById("coupon-expiry").value;

        db.coupons.push({
            code, type, value, minOrder, expiry, status: "Active"
        });

        addNotification(`Added promotional coupon code ${code}`);
        saveDatabase();
        renderCouponsTable();
        document.getElementById("modal-coupon").classList.remove("active");
        document.getElementById("coupon-form").reset();
    });

    // Add Product
    document.getElementById("inventory-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("prod-name").value;
        const category = document.getElementById("prod-category").value;
        const supplier = document.getElementById("prod-supplier").value || "Direct Supply";
        const cost = parseFloat(document.getElementById("prod-cost").value);
        const price = parseFloat(document.getElementById("prod-price").value);
        const stock = parseInt(document.getElementById("prod-stock").value);

        const newId = "P" + (400 + db.inventory.length + 1);
        db.inventory.push({
            id: newId, name, category, cost, price, stock, supplier
        });

        addNotification(`Added inventory product ${name} to shop catalog.`);
        saveDatabase();
        renderInventoryPOS();
        document.getElementById("modal-inventory").classList.remove("active");
        document.getElementById("inventory-form").reset();
    });

    // Register Asset
    document.getElementById("asset-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("asset-name").value;
        const serial = document.getElementById("asset-serial").value.trim();
        const buyDate = document.getElementById("asset-purchase-date").value;
        const status = document.getElementById("asset-status").value;
        const cost = parseFloat(document.getElementById("asset-repair-cost").value || 0);

        const nxt = new Date(buyDate);
        nxt.setMonth(nxt.getMonth() + 6);
        const nextService = nxt.toISOString().split("T")[0];

        db.assets.push({
            serial, name, buyDate, status, lastMaintenance: buyDate, nextService, cost
        });

        addNotification(`Registered new gym equipment ${name}`);
        saveDatabase();
        renderAssetsTable();
        document.getElementById("modal-asset").classList.remove("active");
        document.getElementById("asset-form").reset();
    });

    // Populate dropdowns in modals
    const invoiceMemberDropdown = document.getElementById("invoice-member-id");
    const invoiceCouponDropdown = document.getElementById("invoice-coupon");
    const fbMemberDropdown = document.getElementById("fb-member-id");
    const lockerMemberDropdown = document.getElementById("locker-member-id");

    const populateInvoiceModalDropdowns = () => {
        invoiceMemberDropdown.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
        invoiceCouponDropdown.innerHTML = `<option value="">None</option>` + db.coupons.filter(c => c.status === "Active").map(c => `<option value="${c.code}">${c.code}</option>`).join("");
    };
    
    const populateFeedbackModalDropdowns = () => {
        fbMemberDropdown.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
    };

    const populateLockerModalDropdowns = () => {
        lockerMemberDropdown.innerHTML = db.members.map(m => `<option value="${m.id}">${m.name} (${m.id})</option>`).join("");
    };

    document.getElementById("btn-create-invoice-modal").addEventListener("click", populateInvoiceModalDropdowns);
    document.getElementById("btn-add-feedback-modal").addEventListener("click", populateFeedbackModalDropdowns);
    document.getElementById("btn-allocate-locker-modal").addEventListener("click", populateLockerModalDropdowns);
};

// Global exports
window.executeCheckout = executeCheckout;
window.editMemberModal = editMemberModal;
window.deleteMember = deleteMember;
window.showIdCard = showIdCard;
window.bookClassPrompt = bookClassPrompt;
window.toggleStaffStatus = toggleStaffStatus;
window.removeStaff = removeStaff;
window.moveTask = moveTask;
window.deleteTask = deleteTask;
window.payStaffSalary = payStaffSalary;
window.markInvoicePaid = markInvoicePaid;
window.processRefund = processRefund;
window.printInvoiceWindow = printInvoiceWindow;
window.deleteCoupon = deleteCoupon;
window.addToPOSCart = addToPOSCart;
window.adjustCartQty = adjustCartQty;
window.triggerAssetService = triggerAssetService;
window.reportAssetBroken = reportAssetBroken;
window.handleLockerClick = handleLockerClick;
window.resolveFeedback = resolveFeedback;
window.deleteExpense = deleteExpense;
