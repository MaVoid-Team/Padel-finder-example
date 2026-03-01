## Padel Booking System - Troubleshooting & Testing Guide

### System Status ✓
- **Server**: Running on localhost:3000
- **Font**: Updated to Cairo (Arabic-optimized font)
- **Demo Mode**: All data stored in browser localStorage
- **Compilation**: Successful

---

## Booking Flow Troubleshooting Checklist

### 1. **Demo Data Initialization** 
   - [ ] Check browser console: Look for "✓ Courts loaded" message
   - [ ] Verify 4 courts are displayed: Court 1-4 Premium/Standard/Outdoor
   - [ ] Open DevTools > Application > Local Storage and check `demo_courts` key

### 2. **Court Selection**
   - [ ] Click on a court card (should highlight with blue ring)
   - [ ] Console should show "✓ Court selected: [Court Name]"
   - [ ] Expected output: `Court 1 - Premium`, `Court 2 - Standard`, `Court 3 - Outdoor`, `Court 4 - Premium Indoor`

### 3. **Date Selection**
   - [ ] Calendar should only allow future dates (grayed out past dates)
   - [ ] Click on any future date
   - [ ] Check console: Should show "🔍 Fetching availability for [Court] on [Date]..."

### 4. **Time Slot Availability**
   - [ ] Console should show available slots (15:00, 16:30, 18:00, etc. - 90 min slots)
   - [ ] Verify message: "✓ Available slots: X/Y" where Y = total slots
   - [ ] Time slots should display with "Book Now" button for available times
   - [ ] Booked slots should be grayed out

### 5. **Booking Modal Open**
   - [ ] Click "Book Now" on any available slot
   - [ ] Modal should appear with court details and pricing
   - [ ] Check console: "✓ Booking slot: {time, duration, isAvailable} Court: [name]"

### 6. **Form Validation**
   **Required Fields:**
   - [ ] Full Name: Must not be empty
   - [ ] Email: Must be valid email format (test@example.com)
   - [ ] Phone: Optional (can be left blank)
   
   **Test validation by:**
   - [ ] Click Submit without filling form → Should show "Please enter your name"
   - [ ] Fill name only → Should show "Please enter your email"
   - [ ] Enter invalid email (test@) → Should show "Please enter a valid email"
   - [ ] Fill all required fields → Should proceed

### 7. **Booking Submission**
   - [ ] Fill form: Name, Email, optional Phone
   - [ ] Click "Book for $[amount]" button
   - [ ] Button should show "Booking..." during submission
   - [ ] Wait ~1-2 seconds for completion
   - [ ] Toast notification should appear: "Booking Confirmed! 🎉"
   - [ ] Console should show: "✓ Booking created successfully: {booking object}"

### 8. **State & Modal Closure**
   - [ ] Modal closes after 800ms (after success message)
   - [ ] Form clears (all fields empty again)
   - [ ] Check DevTools > Application > Local Storage > `demo_bookings`
   - [ ] Your booking should appear in the bookings array
   - [ ] Available slots refresh - the booked time should now be grayed out

### 9. **Persistence**
   - [ ] Refresh page (Cmd+R)
   - [ ] Your booking should still be there
   - [ ] Go to "My Bookings" page
   - [ ] Search by email → Your booking should appear
   - [ ] Status should show as "Confirmed"

### 10. **Admin Dashboard**
   - [ ] Stats should update after booking (Bookings +1, Revenue updated)
   - [ ] Recent bookings list should show your new booking
   - [ ] Court Management → should allow adding/editing courts

---

## Common Issues & Solutions

### **Booking Modal Doesn't Open**
   ```
   Symptom: Click "Book Now" but nothing happens
   Causes: 
   - Court not selected (check console for "No court selected")
   - Modal not rendering (check court._id exists)
   Solution: Hard refresh (Cmd+Shift+R), check console errors
   ```

### **Form Submits But Nothing Happens**
   ```
   Symptom: Click submit button but no confirmation
   Causes:
   - Missing required fields (check validation)
   - localStorage disabled (check Settings)
   - Browser private mode (localStorage disabled)
   Solution: Use regular browsing mode, enable localStorage
   ```

### **No Available Slots Shown**
   ```
   Symptom: "No available slots for this date"
   Causes:
   - All slots booked for that court/date
   - Date in past (calendar filters this)
   - Demo data not initialized
   Solution: Select different date/court, refresh page
   ```

### **Booking Doesn't Persist After Refresh**
   ```
   Symptom: Refresh page and booking is gone
   Causes:
   - localStorage disabled
   - Private/Incognito mode
   - Local storage corrupted
   Solution: Check localStorage in DevTools, clear cache, try different date
   ```

---

## Console Commands for Manual Testing

```javascript
// Check all bookings
JSON.parse(localStorage.getItem('demo_bookings'))

// Check all courts
JSON.parse(localStorage.getItem('demo_courts'))

// Clear all data (start fresh)
localStorage.clear()

// Add test booking manually
localStorage.getItem('demo_bookings')

// Check specific booking
var bookings = JSON.parse(localStorage.getItem('demo_bookings'))
bookings.find(b => b.playerEmail === 'your@email.com')
```

---

## Expected Test Results

### Successful Booking Flow:
1. ✓ Select Court 1 Premium
2. ✓ Select date: March 5, 2026
3. ✓ See available slots at 15:00, 16:30, 18:00, 19:30 (90-min slots)
4. ✓ Click "Book Now" at 15:00
5. ✓ Modal appears showing Court 1, March 5, 15:00, Total: $180 (120/hour × 1.5 hours)
6. ✓ Fill: Name="Test User", Email="test@example.com"
7. ✓ Click "Book for $180"
8. ✓ See confirmation toast
9. ✓ Modal closes
10. ✓ Console shows booking created
11. ✓ 15:00 slot now shows as booked (grayed out)
12. ✓ localStorage has booking record

---

## Font Changes
- Changed from Geist to **Cairo** (optimized for Arabic text)
- Fallback to Tajawal if Cairo unavailable
- Applied to all text elements site-wide
- Loaded from Google Fonts

---

**Last Updated**: March 1, 2026
**Test Version**: 1.0
