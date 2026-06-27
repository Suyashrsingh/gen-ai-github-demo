# ApexGym — Premium Gym Management Web Application

ApexGym is a premium, client-side, all-in-one Gym Management System designed with a beautiful, modern, dark glassmorphism user interface. 

It is a **fully working** Single Page Application (SPA) designed to help gym owners, managers, receptionists, and personal trainers organize and manage a commercial fitness center. 

Because it operates entirely on the client side using browser `localStorage` for data persistence, it requires **zero server installation or database configuration**. You can run it immediately by opening `index.html` in any browser!

---

## ⚡ Quick Start / How to Run

### Method 1: Double Click (Simplest)
1. Clone this repository or download the files.
2. Double-click the [`index.html`](index.html) file to open it directly in your web browser (Chrome, Edge, Safari, Firefox).

### Method 2: Local Dev Server (Recommended)
Starting a local server prevents potential browser restriction issues and allows features like imports/exports to work optimally.

1. **Open your terminal or command prompt (cmd)**.
2. **Navigate into this project directory**:
   ```bash
   cd "projects/gym-management-system"
   ```
3. **Start the local Python server**:
   ```bash
   python -m http.server 8080
   ```
4. **Open your browser** and visit: [http://localhost:8080](http://localhost:8080)

---

## 🚀 The 100 Core Features Implemented

Here is the exact breakdown of the **100 features** built directly into this system:

### 1. Member Management (1-20)
1. **Register Members**: Add new profiles containing name, email, phone, gender, and avatar URLs.
2. **Profile Avatars**: Automatically generates beautiful placeholder avatars if custom links aren't supplied.
3. **Advanced Directory Search**: Find any member instantly by typing their Name, Email, or Member ID.
4. **Interactive Filters**: Toggle views to filter active, expired, frozen, or pending member profiles.
5. **Dynamic ID Generation**: Auto-allocates unique member IDs (`M701`, `M702`, etc.) sequentially.
6. **Membership Assignment**: Link members to distinct packages (Monthly Basic, VIP Elite, Annual Premium).
7. **Personal Coach Assignment**: Assign dedicated personal trainers to members from the staff registry.
8. **Emergency Contacts**: Register emergency contact names and phone numbers.
9. **Medical Flag Alerts**: Store health flags, allergies, injuries, or cardiovascular precautions.
10. **Custom Goals Tracker**: Track specific goals (Gain Muscle, Lose Weight, Endurance, General Fitness).
11. **Barcode / Card Check-In Simulator**: Log check-ins by entering or scanning a Member ID.
12. **Status Guard Check**: Restricts check-in access if a member's package is expired or frozen.
13. **Manual Check-In Override**: Front desk can manually register member check-ins in one click.
14. **Daily Attendance Logs**: Interactive logger tracking entry timestamps.
15. **Check-Out Timestamping**: Logs departure timestamps automatically upon checkout.
16. **Member Freeze / Pause**: Temporarily suspend membership status to halt expiration tracking.
17. **Plan Renewal System**: Re-activate expired members and automatically calculate new expiry dates.
18. **Custom Member Notes**: Logs staff feedback, milestones, and personal training remarks.
19. **Download Directory (JSON)**: Export the complete members database to a local JSON file.
20. **Printable Membership ID Card**: Generate and print individual physical membership cards.

### 2. Classes & Schedules (21-36)
21. **Weekly Calendar Matrix**: Grid showing scheduled classes across Monday to Sunday.
22. **Class Creator Form**: Schedule classes by setting Name, Time, Room, Trainer, and Capacity.
23. **Categorized Class Tagging**: Label classes under Yoga, Cardio, Strength, Zumba, or Spin.
24. **Trainer Allocation Checks**: Ensures instructors scheduled exist in the trainer roster.
25. **Seat Counter**: Real-time seat allocation decrement upon booking.
26. **Class Booking Interface**: Simply click a class session on the calendar to book a member.
27. **Duplicate Booking Guard**: Prevents booking the same member twice for a single class.
28. **Active Member Check**: Validates that only active (unfrozen/unexpired) members book classes.
29. **Capacity Validation Warn**: Alerts if booking attempts are made on full classes.
30. **Class Waitlist System**: Automatically routes excess bookings into a waitlist queue.
31. **Virtual Room Allocation**: Assign class sessions to physical rooms (Studio A, Studio B, Gym Floor).
32. **Difficulty Indicators**: Label classes with Beginner, Intermediate, or Advanced badges.
33. **Zoom Integration**: Embed virtual stream URLs directly for remote participants.
34. **Interactive Filters**: Filter the weekly class schedule by class categories.
35. **Class Roster List**: Displays live attendee bookings count for instructors.
36. **Class Review / Rating**: Logger to capture member feedback and class ratings.

### 3. Staff & Trainer Hub (37-50)
37. **Staff Directory**: Register coaches and managers with roles, bios, and contact details.
38. **Hourly Rate Configuration**: Set individual base hourly wages for payroll calculations.
39. **Specialization Tags**: Categorize trainers by skillsets (e.g. Bodybuilding, HIIT, Yoga).
40. **Shift Schedule Assign**: Designate Morning, Afternoon, or Evening work shifts.
41. **Active Shift Planner**: Toggle staff duty status (Active vs. On Leave).
42. **Clients Counter**: Track how many active members are assigned to each trainer.
43. **Staff Rating log**: Display average coach ratings out of 5 stars.
44. **Task Board (Todo Kanban)**: Drag-and-drop or click to move tasks (Todo ➔ In Progress ➔ Completed).
45. **Interactive Task Creator**: Create checklist items with details, assignees, and dates.
46. **Task Deletion Control**: Remove outdated task cards from the Kanban board.
47. **Payroll Calculator**: Auto-calculates gross wages (Hours worked * Hourly rate).
48. **Commission Earnings**: Apply commission bonuses ($50 per assigned active member).
49. **Payroll Disbursal Logs**: Re-calculate payroll dynamically and mark staff as Paid or Unpaid.
50. **Access-level Toggles**: Manage permissions between general Staff and Admins.

### 4. Billing, Invoices & Payments (51-64)
51. **Invoice List Ledger**: Tabular list of all transactions and generated billing records.
52. **Invoice Search**: Find invoices by ID, Member Name, or Date.
53. **Manual Invoice Creator**: Generate custom invoices with base prices, descriptions, and payments.
54. **Flexible Payment Modes**: Support for Cash, Card, UPI, and Bank Transfers.
55. **Tax Calculator**: Automatically computes tax amounts (default 18% VAT).
56. **Status Badges**: Instantly view status (Paid, Unpaid, Refunded).
57. **Outstanding Due Alerts**: Highlights outstanding bills in red.
58. **Outstanding Dues Counter**: Track total unpaid dues globally on the analytics report.
59. **Partial Payment Logger**: Set partial payments and calculate outstanding balances.
60. **Payment Collector**: Transition unpaid invoices to "Paid" status with one click.
61. **Membership Extension Link**: Auto-activates expired members upon payment collection.
62. **Refund Executor**: Reverts transaction metrics and marks invoice status as "Refunded".
63. **Printable Invoice PDF**: Generate a clean, printable retail format receipt.
64. **Dynamic Price Computations**: Instant subtotal, discounts, tax, and totals math.

### 5. Inventory & POS Store (65-74)
65. **POS Catalog Display**: Grid layout displaying supplement tubs, energy drinks, and apparel.
66. **Supplier Directory**: Register product suppliers and contact details.
67. **POS Interactive Shopping Cart**: Add and remove items, adjust quantities.
68. **Stock Guard limits**: Restricts adding items to the cart beyond available inventory levels.
69. **Out of stock badges**: Dynamic alerts for sold-out catalog items.
70. **Low Stock Warnings**: Highlights items with stock level ≤ 5 on the dashboard.
71. **Dynamic Cart Math**: Recalculates subtotals, taxes, and totals in real time.
72. **Store Coupon Application**: Verify and apply promo coupons directly in the cart.
73. **Deduct Stock on Checkout**: Automatically decrements product stock counts on checkout.
74. **Walk-In / Member POS Sales**: Assign checkout sales to specific member accounts.

### 6. Body & Workout Planner (75-84)
75. **Measurement Logs**: Record Weight, Height, Waist, Hips, and Body Fat % per member.
76. **BMI Calculator**: Automatically computes Body Mass Index (BMI).
77. **Target Goal Weight**: Set objective weight goals.
78. **Goal Progress Tracker**: Dynamic progress bars tracking how close a member is to their goal weight.
79. **Workout Routine Builder**: Input exercises, sets, reps, and target weights.
80. **Pre-Loaded Templates**: Inject workouts like PPL (Push/Pull/Legs) or Cardio Burn in one click.
81. **Nutrition Planner**: Log meal schedules, timings, calories, and macronutrient splits (g).
82. **Diet Macros Calculator**: Auto-calculates daily totals for calories, protein, and carbs.
83. **Water Intake Logger**: Virtual glass animation tracking daily water logs.
84. **Progress History logs**: View past body metric entries.

### 7. Asset & Equipment Manager (85-90)
85. **Equipment Registry**: Log name, serial number, and purchase date of machines.
86. **Status Indicators**: Classify assets as Operational, Under Maintenance, or Broken.
87. **Repair Cost Log**: Accumulates all repair costs incurred per machine.
88. **Asset Service Logger**: Log service checks and automatically schedule next inspection date (+6 months).
89. **Quick Broken Report Form**: Report broken machines and specify repair budget estimates.
90. **Technician Directory**: Link equipment to service vendors.

### 8. Analytics & Dashboard Reports (91-96)
91. **Executive KPI Cards**: Real-time widgets for Total Members, Active MRR, Today's Check-ins, and Broken Equipment.
92. **Revenue Bar Chart**: Visualizes monthly earnings trends.
93. **Plan Distribution Chart**: Visualizes membership packages using an SVG donut chart.
94. **Peak Hours Heatmap**: Attendance grid displaying busiest hours (e.g. 5 PM - 7 PM).
95. **System Notification Center**: Logs chronological system activities (e.g. check-ins, low stock warnings).
96. **Full Analytics Report Print**: Print layout summarizing total sales, outstanding dues, and active rosters.

### 9. System Settings & Utilities (97-100)
97. **Settings Configurator**: Customize gym name, currency, and VAT rates.
98. **Theme Controller**: Dark Mode and Light Mode toggle with state preservation.
99. **Database Backup**: Download the entire application state as a JSON file.
100. **Factory Reset**: Clear local storage and reload pre-configured demo mock data instantly.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Clean HTML5 semantic layout.
- **Styling**: Vanilla CSS3 utilizing flexbox, grid, glassmorphism filters, variables, and responsive media queries.
- **Application Engine**: Vanilla ES6 JavaScript implementing event listeners, validation rules, state management, and local storage bindings.
- **Graphics/Charts**: Inline responsive SVG graphics generated dynamically by JS.
- **Persistence Layer**: Browser `localStorage` (Namespace: `apexgym_db`).
