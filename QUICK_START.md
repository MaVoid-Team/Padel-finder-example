# Quick Start Guide - Padel Booking System

## 🚀 Getting Started (30 seconds)

```bash
# Terminal should already be running:
pnpm dev
# Server: http://localhost:3000
```

---

## 📖 Step-by-Step Booking Test

### 1️⃣ Page Load (Check Console)
```
Expected console output:
  "🔧 Initializing demo data..."
  "✓ Courts loaded: 4, [array of courts]"
```

**Action**: F12 → Console → Look for these messages

---

### 2️⃣ Select a Court
```
Action: Click on "Court 1 - Premium" card
Expected console output:
  "✓ Court selected: Court 1 - Premium"
Visual: Card should have blue border
```

---

### 3️⃣ Pick a Date
```
Action: Click on tomorrow's date in calendar
Expected console output:
  "🔍 Fetching availability for Court 1 - Premium on [Date]..."
Visual: Calendar prevents past dates
```

---

### 4️⃣ Check Available Slots
```
Expected console output:
  "✓ Available slots: 8/8"
Visual: Time slots appear (15:00, 16:30, 18:00, etc.)
Note: 90-minute slots throughout court hours
```

---

### 5️⃣ Book a Slot
```
Action: Click "Book Now" on any slot (e.g., 15:00)
Expected console output:
  "✓ Booking slot: {time: "15:00", duration: 90, isAvailable: true}"
  "✓ Court selected: Court 1 - Premium"
Visual: Modal appears with booking details
```

---

### 6️⃣ Fill Booking Form
```
Action: Fill form fields:
  - Full Name: "Test User"
  - Email: "test@example.com"
  - Phone: (optional) "+1234567890"

Expected visual: Input fields accept text, no validation errors yet
```

---

### 7️⃣ Submit Booking
```
Action: Click "Book for $180" button

Validation Checks (in order):
  ✓ Check: Name is required
    If empty → Toast: "Please enter your name"
  ✓ Check: Email is required
    If empty → Toast: "Please enter your email"
  ✓ Check: Email format is valid (must be test@example.com format)
    If invalid (e.g., "test@") → Toast: "Please enter a valid email"
```

---

### 8️⃣ Success Confirmation
```
Expected console output:
  "✓ Booking created successfully: {
    _id: "booking_xxxxx",
    courtId: "court_1",
    date: "2026-03-05",
    time: "15:00",
    duration: 90,
    playerEmail: "test@example.com",
    playerName: "Test User",
    playerPhone: "+1234567890",
    totalPrice: 180,
    status: "confirmed"
  }"

Expected visual:
  1. Toast appears: "Booking Confirmed! 🎉"
     Message: "Your court reservation has been confirmed"
  2. Modal closes (after 800ms)
  3. Availability refreshes
  4. 15:00 slot now grayed out (booked)
```

---

### 9️⃣ Verify in My Bookings
```
Action: 
  1. Click "My Bookings" in navigation
  2. Enter email: "test@example.com"
  3. Click "Search"

Expected:
  - Your booking appears in the list
  - Status: "Confirmed" (green badge)
  - Court: "Court 1 - Premium"
  - Date: "March 5, 2026"
  - Time: "15:00"
  - Total: "$180"
  - Can cancel with button
```

---

### 🔟 Check Admin Dashboard
```
Action:
  1. Click "Admin Dashboard" in navigation
  2. Review statistics

Expected:
  - Total Bookings: ≥ 1
  - Revenue: ≥ $180
  - Recent Bookings section shows your booking
  - Court Management tab available
```

---

## 🐛 Troubleshooting

### "Courts don't load"
```
Console shows: Error initializing demo data
Solution:
  1. Clear browser cache (Cmd+Shift+R)
  2. Check console for specific error
  3. Verify localStorage is enabled
```

### "Slots don't appear after selecting date"
```
Console shows: "✓ Available slots: 0/X"
Causes:
  - All slots already booked (try different date/court)
  - Date in past (calendar should prevent this)
  - Court not selected (check console for "Court selected")
Solution: Try different court or future date
```

### "Form validation fails oddly"
```
Symptom: Can't submit form even with valid data
Solution:
  1. Check browser console for validation messages
  2. Verify email format: test@example.com (must have @)
  3. Verify name is not empty
  4. Try: console.clear() then retry
```

### "Booking disappears after refresh"
```
Problem: Booking was not actually saved to localStorage
Diagnosis: 
  1. Check console for: "✓ Booking created successfully:"
  2. Open DevTools → Application → Storage → Local Storage
  3. Look for key: "demo_bookings"
  4. Should contain your booking

If missing:
  - localStorage might be disabled
  - Check private/incognito mode (disables storage)
  - Try in regular browsing mode
```

---

## 🧪 Console Debugging Commands

### View All Bookings
```javascript
JSON.parse(localStorage.getItem('demo_bookings'))
```
Output: Array of all bookings with full details

### View All Courts
```javascript
JSON.parse(localStorage.getItem('demo_courts'))
```
Output: Array of 4 courts with pricing

### Find Your Booking
```javascript
JSON.parse(localStorage.getItem('demo_bookings')).find(b => 
  b.playerEmail === 'test@example.com'
)
```
Output: Your booking object (or undefined if not found)

### Count Bookings
```javascript
JSON.parse(localStorage.getItem('demo_bookings')).length
```
Output: Number (e.g., 3)

### Clear Everything (Fresh Start)
```javascript
localStorage.clear()
```
Action: Deletes all demo data

### Check Booking Status
```javascript
var booking = JSON.parse(localStorage.getItem('demo_bookings'))[0]
console.log(booking.status) // Should be "confirmed"
```

---

## 📱 Font Check

After hard refresh (Cmd+Shift+R):
- [ ] Text appears in Cairo font (rounded, Arabic-friendly)
- [ ] No jagged or pixelated text
- [ ] Navigation menu readable
- [ ] Form labels clear
- [ ] Buttons text visible

---

## ✅ Success Criteria

Your system is working when:
1. ✅ Court selection works (console shows "✓ Court selected:")
2. ✅ Date picker works (can select future dates)
3. ✅ Availability loads (shows 8-10 slots)
4. ✅ Modal opens (displays court info and pricing)
5. ✅ Form validation works (prevents invalid submissions)
6. ✅ Booking saves (console shows "✓ Booking created successfully:")
7. ✅ Toast appears (green confirmation message)
8. ✅ Modal closes (after success)
9. ✅ Slot becomes unavailable (grayed out)
10. ✅ My Bookings finds it (email search returns result)
11. ✅ Admin stats update (booking count increased)
12. ✅ Cairo font applied (text looks Arabic-optimized)

---

## 🆘 Still Having Issues?

**Open browser console (F12) and try booking again**

Share the console output:
1. Console tab
2. Filter by: `✓` or `✗` or `error`
3. Copy all relevant messages
4. This shows exactly where the process breaks

**Common Console Messages to Expect:**
```
✓ Courts loaded: 4
✓ Court selected: Court 1 - Premium
✓ Booking slot: {time: "15:00", duration: 90, isAvailable: true}
✓ Booking created successfully: {...}
```

If you see errors or the flow stops, the console message before the error shows where to fix.

---

**Last Updated**: March 1, 2026
