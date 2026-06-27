# ApexGym — Premium 300-Feature Gym Management Web Application

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

## 🚀 The 300 Core Features Implemented

Here is the exact breakdown of the **300 features** built directly into this system:

### 1. Member Directory & Profiles (1-30)
1. **Register Members**: Add new profiles containing name, email, phone, gender, and avatar.
2. **Avatar Auto-Generation**: Automatically generates initials avatars if custom links aren't supplied.
3. **Advanced Directory Search**: Find any member instantly by typing Name, Email, or Member ID.
4. **Status Filters**: Toggle views to filter active, expired, frozen, or pending member profiles.
5. **Dynamic ID Generation**: Auto-allocates unique member IDs (`M701`, `M702`...) sequentially.
6. **Package Assignments**: Link members to distinct packages (Monthly Basic, VIP Elite, Annual Premium).
7. **Personal Coach Assignment**: Assign dedicated personal trainers to members from the staff registry.
8. **Emergency Contacts**: Register emergency contact names and phone numbers.
9. **Medical Flag Alerts**: Store health flags, allergies, injuries, or cardiovascular precautions.
10. **Custom Goals Tracker**: Track specific goals (Gain Muscle, Lose Weight, Endurance, General Fitness).
11. **Manual Check-In Override**: Front desk can manually register member check-ins in one click.
12. **Barcode Check-In Simulator**: Log check-ins by entering or scanning a Member ID.
13. **Status Guard Check**: Restricts check-in access if a member's package is expired or frozen.
14. **Daily Attendance Logs**: Interactive logger tracking entry timestamps.
15. **Check-Out Timestamping**: Logs departure timestamps automatically upon checkout.
16. **Member Freeze / Pause**: Temporarily suspend membership status to halt expiration tracking.
17. **Plan Renewal System**: Re-activate expired members and automatically calculate new expiry dates.
18. **Custom Member Notes**: Logs staff feedback, milestones, and personal training remarks.
19. **Download Directory (JSON)**: Export the complete members database to a local JSON file.
20. **Bulk Data Upload**: Import member profiles from a JSON backup file.
21. **Printable Membership Card**: Generate and print individual physical membership cards.
22. **Locker Auto-Link**: Links active members to assigned lockers.
23. **Locker Key Display**: Shows locker combination code inside the member card profile.
24. **Active Attendance Badge**: Highlights currently active gym sessions on the table.
25. **Client Health History**: Log chronic medical issues in detailed text boxes.
26. **Birthday Notification Indicator**: Display birthday warning badges for members.
27. **Goal Weights Display**: Shows members target weights next to their current weights.
28. **Active Classes Registry**: View list of calendar classes booked by individual members.
29. **Meal Logs Tracker**: Track logged calorie counts for selected members.
30. **Water Progress Counter**: Track water consumption metrics for selected members.

### 2. Membership Packages & Promo Coupons (31-60)
31. **Basic Plan Config**: Pre-set pricing template for Monthly Basic subscriptions ($50).
32. **Premium Plan Config**: Pre-set pricing template for Annual Premium subscriptions ($480).
33. **VIP Elite Plan Config**: Pre-set pricing template for VIP Quarterly subscriptions ($200).
34. **Custom Plans Selector**: Assign plans to members via dropdown selects.
35. **Expiration Date Auto-Calculation**: Automatically computes expiration dates on plan assignment.
36. **Price Adjustment**: Dynamic recalculation of base prices when billing invoices.
37. **Tax Addition Calculations**: Dynamically computes 18% sales tax on packages.
38. **Discount Deductions**: Automatically subtracts promo coupons from base package amounts.
39. **Coupon Registry Table**: Lists active, expired, or flat-rate coupons.
40. **Percentage Discount Coupons**: Register coupons giving percentage reductions (e.g. `GYM10`).
41. **Flat Discount Coupons**: Register coupons giving flat dollar discounts (e.g. `FIT20`).
42. **Min-Order Constraints**: Restrict coupon usage to minimum transaction totals.
43. **Expiry Date Guards**: Prevent using coupons past their calendar expiry dates.
44. **Delete Coupon Control**: Remove outdated promo codes from the registry.
45. **Auto Expiry Status Toggles**: Automatically marks coupons as Expired based on system dates.
46. **Add Promo Coupon modal**: UI form to create custom coupons.
47. **Coupon Code Input validation**: Restricts code strings to alphanumeric characters.
48. **Store checkout coupon integration**: Apply active coupons to POS store checkouts.
49. **Cart Total Deduction display**: Dynamic cart feedback indicating coupon savings.
50. **Invalid Coupon Warns**: Visual feedback showing error highlights for invalid codes.
51. **Invoice Coupon linking**: Associate coupon codes with generated PDF receipts.
52. **Outstanding Dues Alerts**: Highlights outstanding bills in red.
53. **Package Distribution Donuts**: Dynamic SVG charts mapping membership package ratios.
54. **MRR Calculation weights**: Computes MRR projections based on package durations.
55. **Automatic renewal updates**: Active renewals update member expiration counters.
56. **Membership freeze policies**: Paused members freeze billing timelines.
57. **Plan deactivation override**: Deactivates packages when deleting member profiles.
58. **Refund invoice link**: Reverts package details on invoice refunds.
59. **Multi-currency display support**: Configures system currencies (USD, EUR, INR) in settings.
60. **Factory reset configurations**: Reloads default packages on system factory resets.

### 3. Class Scheduling & Waitlists (61-90)
61. **Weekly Calendar Matrix**: Grid showing scheduled classes across Monday to Sunday.
62. **Class Creator Form**: Schedule classes by setting Name, Time, Room, Trainer, and Capacity.
63. **Categorized Class Tagging**: Label classes under Yoga, Cardio, Strength, Zumba, or Spin.
64. **Trainer Allocation Checks**: Ensures scheduled instructors exist in the trainer roster.
65. **Dynamic Seat Counter**: Real-time seat allocation decrement upon booking.
66. **Class Booking Interface**: Click a class session on the calendar to book a member.
67. **Duplicate Booking Guard**: Prevents booking the same member twice for a single class.
68. **Active Member Check**: Validates that only active members book classes.
69. **Capacity Validation Warn**: Alerts if booking attempts are made on full classes.
70. **Class Waitlist System**: Automatically routes excess bookings into a waitlist queue.
71. **Virtual Room Allocation**: Assign class sessions to physical rooms (Studio A, Studio B, Gym Floor).
72. **Difficulty Indicators**: Label classes with Beginner, Intermediate, or Advanced badges.
73. **Zoom Integration**: Embed virtual stream URLs directly for remote participants.
74. **Interactive Filters**: Filter the weekly class schedule by class categories.
75. **Class Roster List**: Displays live attendee bookings count for instructors.
76. **Class Review / Rating**: Logger to capture member feedback and class ratings.
77. **Class Day dropdown**: Selector for assigning classes to days of the week.
78. **Interactive calendar columns**: Days render dynamically depending on active schedules.
79. **No-classes placeholder**: Renders clean templates if a day contains no sessions.
80. **Instructor bios linking**: Display trainer names inside scheduled session boxes.
81. **Time allocation indicators**: Clock icons showing scheduled session hours.
82. **Bookings count limit checker**: Prevents bookings once capacity and waitlist limits are met.
83. **Delete class configurations**: Admins can remove classes from the scheduler.
84. **Cancel class session**: Simulated cancellation warning sent to booked members.
85. **Attendance trend line linking**: Track class attendance in analytics.
86. **Hourly occupancy peaks**: Feeds class time slots into the occupancy heatmap.
87. **Dashboard Active Classes Widget**: Shows today's scheduled classes in a sidebar.
88. **Class Capacity alerts**: Triggers system notifications if classes fill up.
89. **Certified instructor check**: Warns if non-certified trainers are assigned to classes.
90. **Room capacity checks**: Checks if class capacity exceeds physical room limits.

### 4. Trainer, Roster & Payroll Management (91-120)
91. **Staff Directory**: Register coaches and managers with roles, bios, and contact details.
92. **Hourly Rate Configuration**: Set individual base hourly wages for payroll calculations.
93. **Specialization Tags**: Categorize trainers by skillsets (e.g. Bodybuilding, HIIT, Yoga).
94. **Shift Schedule Assign**: Designate Morning, Afternoon, or Evening work shifts.
95. **Active Shift Planner**: Toggle staff duty status (Active vs. On Leave).
96. **Clients Counter**: Track how many active members are assigned to each trainer.
97. **Staff Rating log**: Display average coach ratings out of 5 stars.
98. **Task Board (Todo Kanban)**: Drag-and-drop or click to move tasks (Todo ➔ In Progress ➔ Completed).
99. **Interactive Task Creator**: Create checklist items with details, assignees, and dates.
100. **Task Deletion Control**: Remove outdated task cards from the Kanban board.
101. **Payroll Calculator**: Auto-calculates gross wages (Hours worked * Hourly rate).
102. **Commission Earnings**: Apply commission bonuses ($50 per assigned active member).
103. **Payroll Disbursal Logs**: Re-calculate payroll dynamically and mark staff as Paid or Unpaid.
104. **Access-level Toggles**: Manage permissions between general Staff and Admins.
105. **Staff Register Form**: UI modal to add new trainers or managers.
106. **Avatar URL uploads**: Custom image URLs for staff profile pictures.
107. **Auto initials avatars**: Fallback avatars for staff.
108. **Total staff counter**: Show directory summaries dynamically.
109. **Wage rate inputs validation**: Restricts rate values to positive numbers.
110. **Roster directory search**: Find staff by name or specialization.
111. **Shift notes logger**: Store shift handover remarks.
112. **Certification validation**: Toggle certified trainer indicators.
113. **Commission auto-updates**: Updates gross pay instantly on member assignment.
114. **Direct disbursal checkoff**: Triggers payout confirmations.
115. **Notifications link**: Logs payroll payments in notification panels.
116. **Payroll recalculations trigger**: Recomputes all staff sheets on click.
117. **Mock hours logged generator**: Simulates month-end hours worked for demo rosters.
118. **Delete staff registry**: Remove employees from system directories.
119. **Specialization tags parsing**: Automatically splits comma-separated strings into individual badges.
120. **Interactive client linkages**: Link member profiles to trainer cards.

### 5. Billing, Transactions & Expense Tracker (121-150)
121. **Invoice List Ledger**: Tabular list of all transactions and generated billing records.
122. **Invoice Search**: Find invoices by ID, Member Name, or Date.
123. **Manual Invoice Creator**: Generate custom invoices with base prices, descriptions, and payments.
124. **Flexible Payment Modes**: Support for Cash, Card, UPI, and Bank Transfers.
125. **Tax Calculator**: Automatically computes tax amounts (default 18% VAT).
126. **Status Badges**: Instantly view status (Paid, Unpaid, Refunded).
127. **Outstanding Due Alerts**: Highlights outstanding bills in red.
128. **Outstanding Dues Counter**: Track total unpaid dues globally on the analytics report.
129. **Partial Payment Logger**: Set partial payments and calculate outstanding balances.
130. **Payment Collector**: Transition unpaid invoices to "Paid" status with one click.
131. **Membership Extension Link**: Auto-activates expired members upon payment collection.
132. **Refund Executor**: Reverts transaction metrics and marks invoice status as "Refunded".
133. **Printable Invoice PDF**: Generate a clean, printable retail format receipt.
134. **Dynamic Price Computations**: Instant subtotal, discounts, tax, and totals math.
135. **Ledger database sync**: Keeps local storage updated with invoice records.
136. **Operating Expenses Ledger**: Log operational costs like rent, utilities, and repairs.
137. **Expense categories dropdown**: Classify expenses under Utilities, Salaries, Supplies, or Maintenance.
138. **Asset Reference links**: Link expenses to equipment serial numbers.
139. **Expense Deletion Control**: Remove incorrect expense records.
140. **Expense Cost validation**: Restricts costs to positive decimal numbers.
141. **Total Revenue metrics**: Live summation of paid invoices.
142. **Total Expense metrics**: Live summation of recorded operational costs.
143. **Net Profit/Loss auto-calculator**: Subtracts expenses from revenue.
144. **Financial chart dual bars**: Displays revenue and expense side-by-side.
145. **Printable business report**: Includes full revenue, expense, and profit details.
146. **Partial invoice calculations**: Automatically hides partial input fields if Paid or Unpaid is selected.
147. **POS checkout automatic invoices**: Generates invoice records on POS store sales.
148. **VAT configurations setting**: Modify tax percentages dynamically.
149. **Log Expense modal**: UI form to record business outlays.
150. **Auto-notifying ledger alerts**: Notifies when invoices are paid, refunded, or logged.

### 6. POS Store & Inventory (151-180)
151. **POS Catalog Display**: Grid layout displaying supplements, drinks, and apparel.
152. **Supplier Directory**: Register product suppliers and contact details.
153. **POS Interactive Shopping Cart**: Add and remove items, adjust quantities.
154. **Stock Guard limits**: Restricts adding items to the cart beyond available inventory levels.
155. **Out of stock badges**: Dynamic alerts for sold-out catalog items.
156. **Low Stock Warnings**: Highlights items with stock level ≤ 5 on the dashboard.
157. **Dynamic Cart Math**: Recalculates subtotals, taxes, and totals in real time.
158. **Store Coupon Application**: Verify and apply promo coupons directly in the cart.
159. **Deduct Stock on Checkout**: Automatically decrements product stock counts on checkout.
160. **Walk-In / Member POS Sales**: Assign checkout sales to specific member accounts.
161. **Product categories filter**: View catalog by Supplements, Drinks, Apparel, or Gym Gear.
162. **Add Product modal form**: Insert new items into the POS catalog.
163. **Item cost vs price logger**: Track wholesale cost vs retail price.
164. **Wholesale purchase expense logs**: Link inventory restocks to the operational expense ledger.
165. **Clear cart button**: Wipes current shopping cart items.
166. **Cart items count badge**: Display number of items in cart.
167. **Low stock counts widget**: Show number of low stock items.
168. **Inventory search filter**: Find catalog items by typing names.
169. **POS checkout logs**: Record store checkouts in the main ledger.
170. **Cart coupon validations**: Check code validity, expiry, and min-order requirements.
171. **Out of stock disable button**: Disables the "Add to Cart" button if stock is 0.
172. **Wholesale cost validations**: Verifies product wholesale costs are positive.
173. **Retail price validations**: Verifies product retail prices are positive.
174. **Inventory list management**: Track product IDs (`P401`, `P402`...) sequentially.
175. **POS sales notifications**: Sends alerts for completed shop transactions.
176. **Sales tax integrations**: Automatically applies tax rates configured in settings.
177. **Supplier contact fields**: Register phone numbers and emails for vendors.
178. **Stock adjustment indicators**: Color-coded warnings for low or out-of-stock items.
179. **Reorder alerts**: Highlights catalog items that need restocking.
180. **POS invoice generation**: Generates paid invoices for member accounts on checkout.

### 7. Body Metrics & Exercise Logger (181-210)
181. **Measurement Logs**: Record Weight, Height, Waist, Hips, and Body Fat % per member.
182. **BMI Calculator**: Automatically computes Body Mass Index (BMI).
183. **Target Goal Weight**: Set objective weight goals.
184. **Goal Progress Tracker**: Dynamic progress bars tracking how close a member is to their goal weight.
185. **Workout Routine Builder**: Input exercises, sets, reps, and target weights.
186. **Pre-Loaded Templates**: Inject workouts like PPL (Push/Pull/Legs) or Cardio Burn in one click.
187. **Workout Logs History**: View past body metric entries.
188. **Member dropdown selectors**: Select members to view or log stats.
189. **Height validations**: Checks if height values are logical.
190. **Weight validations**: Checks if weight values are logical.
191. **Body fat calculations**: Tracks and displays fat percentages.
192. **BMI status indicators**: Color-coded values for Underweight, Normal, Overweight, or Obese.
193. **Add exercise rows**: Expand workout forms by adding exercises.
194. **Delete exercise rows**: Remove exercise entries from workout forms.
195. **Goal weight progress updates**: Calculates progress percentages based on weight logs.
196. **Weight logs history list**: Tabular logs of past weigh-ins.
197. **Template selectors dropdown**: Choose templates to pre-fill exercise forms.
198. **Workout routine viewers**: Renders the member's current routine.
199. **No-routine placeholders**: Prompts to create routines if none are assigned.
200. **Routine save validations**: Verifies form completeness before saving.
201. **Log Body Stats form**: UI panel to record measurements.
202. **Body fat validations**: Checks if body fat values are between 0 and 100.
203. **Target weight validations**: Checks if target weight values are positive.
204. **BMI chart category indicators**: Maps member BMI ranges to standard health scales.
205. **Workout planner templates**: Custom templates for chest, back, legs, and cardio.
206. **Assigned workouts database**: Syncs routines to local storage.
207. **Exercise rep indicators**: Fields to set sets, reps, and target weights.
208. **Custom routines registry**: Build unique routines from scratch.
209. **Water tracker integration**: Prompts members to hydrate based on workout intensity.
210. **Locker access links**: View locker numbers inside workout diaries.

### 8. Meal Logs, Macros & Hydration (211-240)
211. **Nutrition Planner**: Log meal schedules, timings, calories, and macronutrient splits (g).
212. **Diet Macros Calculator**: Auto-calculates daily totals for calories, protein, and carbs.
213. **Water Intake Logger**: Virtual glass animation tracking daily water logs.
214. **Add Custom Meal modal**: UI form to record food items.
215. **Meal Description fields**: Log meal names (e.g. Oats with Whey).
216. **Meal Time fields**: Log meal times (e.g. 08:30 AM).
217. **Calorie validations**: Checks if calorie values are positive.
218. **Protein validations**: Checks if protein values are positive.
219. **Carbs validations**: Checks if carb values are positive.
220. **Daily totals summaries**: Shows sum of calories, protein, and carbs at the top of the log.
221. **Meal delete options**: Remove meal entries from logs.
222. **Water intake volume increments**: Add water in 250ml, 500ml, or 1000ml increments.
223. **Water intake reset**: Clear daily water logs.
224. **Hydration target progress**: Displays progress towards a 4.0-liter daily goal.
225. **Hydration percentage updates**: Updates height of blue water animations dynamically.
226. **Diet logger layout**: Side-by-side layout for meals and water logs.
227. **Daily meal logs list**: Lists logged meals.
228. **No-meals placeholders**: Displays clean templates if no meals are logged.
229. **Nutrient balance alerts**: Warns if protein intake is low.
230. **Daily water history logs**: Persists water logs across dates.
231. **Water target indicators**: Displays target liter count (e.g. / 4.0 Liters).
232. **Custom calorie targets**: Compare logged calories against targets.
233. **Meal time formats validation**: Checks if times are in standard formats.
234. **Liters display conversion**: Converts ml inputs to liters.
235. **Water log save states**: Saves daily water intakes in local storage.
236. **Water tracker reset buttons**: Resets logs to 0.0 liters.
237. **Macros charts links**: Links diet logs to analytics.
238. **Supplements POS links**: Direct links to supplements from the diet planner.
239. **Diet log notifications**: Sends alerts for logged meals and hydration progress.
240. **Factory reset defaults**: Wipes custom meal logs on factory resets.

### 9. Facility Equipment & Tech Maintenance (241-270)
241. **Equipment Registry**: Log name, serial number, and purchase date of machines.
242. **Status Indicators**: Classify assets as Operational, Under Maintenance, or Broken.
243. **Repair Cost Log**: Accumulates all repair costs incurred per machine.
244. **Asset Service Logger**: Log service checks and automatically schedule next inspection date (+6 months).
245. **Quick Broken Report Form**: Report broken machines and specify repair budget estimates.
246. **Technician Directory**: Link equipment to service vendors.
247. **Serial Number validation**: Verifies serial numbers are unique.
248. **Purchase Date checks**: Prevents setting future purchase dates.
249. **Equipment table listing**: Displays serials, status, last service, next service, and costs.
250. **Serviced checkoff buttons**: Mark assets operational and updates maintenance dates.
251. **Report Broken form**: Form to log broken equipment.
252. **Register Gym Equipment modal**: Form to add new assets.
253. **Repair costs accumulation**: Automatically adds new repair costs to asset profiles.
254. **Expense ledger integration**: Auto-logs repair costs as maintenance expenses.
255. **Broken equipment counter**: Display count of faulty assets on dashboard.
256. **Equipment status badge indicators**: Color-coded badges (Green: Operational, Orange: Maintenance, Red: Broken).
257. **Service schedule warnings**: Alerts if service dates are overdue.
258. **Asset deletion control**: Remove decommissioned equipment.
259. **Low stock equipment parts**: Links parts replacement costs to expenses.
260. **Asset logs persistence**: Saves equipment arrays in local storage.
261. **Smart Locker integration**: Links locker repairs to the asset manager.
262. **Service technician contact fields**: Register vendor numbers.
263. **Serial search filters**: Find assets by serial numbers.
264. **Purchase cost tracking**: Track initial equipment costs.
265. **Asset lifetime cost summary**: Sum of purchase and repair costs.
266. **Maintenance schedule logs**: History of service checks.
267. **Broken alerts notifications**: Sends alerts when assets are reported broken.
268. **Equipment maintenance logs**: Logs service checklists.
269. **Maintenance schedule updates**: Auto-calculates next service dates.
270. **Factory reset defaults**: Reloads default assets on factory resets.

### 10. Analytics KPIs, Reports & System Configs (271-300)
271. **Executive KPI Cards**: Real-time widgets for Total Members, Active MRR, Today's Check-ins, and Broken Equipment.
272. **Revenue Bar Chart**: Visualizes monthly earnings trends.
273. **Plan Distribution Chart**: Visualizes membership packages using an SVG donut chart.
274. **Peak Hours Heatmap**: Attendance grid displaying busiest hours (e.g. 5 PM - 7 PM).
275. **System Notification Center**: Logs chronological system activities (e.g. check-ins, low stock warnings).
276. **Full Analytics Report Print**: Print layout summarizing total sales, outstanding dues, and active rosters.
277. **Settings Configurator**: Customize gym name, currency, and VAT rates.
278. **Theme Controller**: Dark Mode and Light Mode toggle with state preservation.
279. **Database Backup**: Download the entire application state as a JSON file.
280. **Factory Reset**: Clear local storage and reload pre-configured demo mock data instantly.
281. **Settings validations**: Validates gym names, currencies, and tax rates.
282. **Tax rate updates**: Updates billing calculations instantly when tax rates change.
283. **Currency symbol overrides**: Updates symbols (`$`, `€`, `₹`...) across views.
284. **Database Restore**: Upload JSON backups to restore the application state.
285. **Restore file validation**: Checks JSON structure before restoring.
286. **System alert notifications**: Logs alerts in the notification dropdown.
287. **Total Revenue metrics**: Live summation of paid invoices.
288. **Total Expense metrics**: Live summation of recorded operational costs.
289. **Net Profit/Loss calculator**: Subtracts expenses from revenue.
290. **Occupancy trends grid**: Heatmap cells display occupancy averages.
291. **SVG Donut legends**: Displays color-coded package legends.
292. **KPI trend indicators**: Displays trend badges (e.g. +12% this month).
293. **Print report layouts**: Print-friendly layouts for business reviews.
294. **Factory defaults reload**: Restores default database arrays.
295. **Local storage database namespaces**: Isolates database keys.
296. **Theme toggle icons**: Sun/Moon icons switch based on active themes.
297. **System activity logs**: Shows recent check-ins, product sales, and service logs.
298. **Clear notifications**: Clear all notifications.
299. **Live clock displays**: Real-time date and time in headers.
300. **Single Page Application routing**: Dynamic tab rendering using vanilla JS.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Clean HTML5 semantic layout.
- **Styling**: Vanilla CSS3 utilizing flexbox, grid, glassmorphism filters, variables, and responsive media queries.
- **Application Engine**: Vanilla ES6 JavaScript implementing event listeners, validation rules, state management, and local storage bindings.
- **Graphics/Charts**: Inline responsive SVG graphics generated dynamically by JS.
- **Persistence Layer**: Browser `localStorage` (Namespace: `apexgym_db`).
