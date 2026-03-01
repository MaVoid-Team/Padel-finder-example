# 🏗️ System Architecture & Data Flow

## Complete Booking System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE LAYER                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  BOOKING FLOW    │  │  ADMIN PANEL     │  │  MY BOOKINGS │  │
│  │                  │  │                  │  │              │  │
│  │ • Court select   │  │ • Statistics     │  │ • Email      │  │
│  │ • Date picker    │  │ • Court mgmt     │  │   lookup     │  │
│  │ • Time slots     │  │ • Bookings list  │  │ • Cancel     │  │
│  │ • Form input     │  │ • Revenue chart  │  │   booking    │  │
│  │ • Validation     │  │ • User tracking  │  │ • Status     │  │
│  │ • Confirmation   │  │                  │  │   display    │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬──────┘  │
│           │                      │                      │        │
└───────────┼──────────────────────┼──────────────────────┼────────┘
            │                      │                      │
            ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER (React)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  components/
│  ├── booking-modal.tsx ───────────── Form + Validation          │
│  ├── court-booking.tsx ───────────── Court/Date/Slot selection  │
│  ├── my-bookings.tsx ────────────── Email lookup & cancel       │
│  ├── admin/
│  │   ├── admin-dashboard.tsx ──── Statistics & recent bookings  │
│  │   └── court-management.tsx ──── Add/edit courts              │
│  └── ui/
│      ├── dialog.tsx, input.tsx, button.tsx, calendar.tsx ...    │
│                                                                  │
└───────────────────────┬───────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  lib/demo-data.ts                                               │
│  ├── initializeDemoData() ─── Sets up localStorage with courts  │
│  ├── getDemoCourts() ─────── Fetches 4 court objects            │
│  ├── addDemoBooking() ────── Saves new booking                  │
│  ├── getDemoAvailability() ─ Calculates 90-min time slots       │
│  ├── updateDemoBooking() ─── Modifies booking                   │
│  ├── cancelDemoBooking() ──── Changes status to "cancelled"     │
│  ├── getDemoBookingsByDate() ─ Filters bookings by date         │
│  └── getDashboardStats() ──── Computes revenue & stats          │
│                                                                  │
└───────────────────────┬───────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATA STORAGE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Browser localStorage (Client-Side)                             │
│  ├── demo_courts ───── 4 court objects with pricing             │
│  │    ├── Court 1 - Premium ($120/hr)                           │
│  │    ├── Court 2 - Standard ($90/hr)                           │
│  │    ├── Court 3 - Outdoor ($80/hr)                            │
│  │    └── Court 4 - Premium Indoor ($150/hr)                    │
│  │                                                              │
│  ├── demo_bookings ─── Array of booking objects                 │
│  │    ├── booking_1xxx {courtId, date, time, duration, ...}    │
│  │    ├── booking_2xxx {...}                                   │
│  │    └── booking_nxxx {...}                                   │
│  │                                                              │
│  └── demo_users ────── User profile data                        │
│       └── [{id, name, email, phone}]                           │
│                                                                  │
│  JSON Structure Examples:                                        │
│  ────────────────────────────────────────────────────────       │
│  Court: {                                                        │
│    _id: "court_1",                                              │
│    name: "Court 1 - Premium",                                   │
│    pricePerHour: 120,                                           │
│    openTime: "06:00",                                           │
│    closeTime: "23:00"                                           │
│  }                                                               │
│                                                                  │
│  Booking: {                                                      │
│    _id: "booking_1709200000",                                   │
│    courtId: "court_1",                                          │
│    date: "2026-03-05",                                          │
│    time: "15:00",                                               │
│    duration: 90,                                                │
│    playerName: "Test User",                                     │
│    playerEmail: "test@example.com",                             │
│    totalPrice: 180,                                             │
│    status: "confirmed"                                          │
│  }                                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detailed Booking Flow Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│                   STEP-BY-STEP BOOKING FLOW                     │
└─────────────────────────────────────────────────────────────────┘

1. PAGE LOAD
   ┌─────────────────┐
   │  Browser opens  │
   │ http://localhost:3000
   └────────┬────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ layout.tsx executes                  │
   │ • Loads Cairo font from Google Fonts │
   │ • Renders Toaster component          │
   │ • Loads page content                 │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ page.tsx mounts CourtBooking         │
   │ component                            │
   └────────┬─────────────────────────────┘
            │
            ▼

2. INITIALIZATION (CourtBooking.tsx - useEffect)
   ┌──────────────────────────────────────┐
   │ initializeDemoData()                 │
   │ • Checks localStorage for demo_courts
   │ • If missing, creates 4 default courts
   │ • Sets localStorage[demo_courts]     │
   │ CONSOLE: "🔧 Initializing demo data..."
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ getDemoCourts()                      │
   │ • Fetches courts from localStorage   │
   │ CONSOLE: "✓ Courts loaded: 4, [...]"
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ setStates([courts, selectedCourt])   │
   │ • Display 4 court cards on UI        │
   │ RENDER: Court cards visible          │
   └──────────────────────────────────────┘

3. COURT SELECTION
   ┌──────────────────────────────────────┐
   │ User clicks "Court 1 - Premium" card │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ handleCourtSelect(court_1)           │
   │ • setSelectedCourt(court_1)          │
   │ CONSOLE: "✓ Court selected: Court 1 -
   │           Premium"
   │ RENDER: Court card highlighted       │
   └──────────────────────────────────────┘

4. DATE SELECTION
   ┌──────────────────────────────────────┐
   │ User opens calendar, clicks date     │
   │ (only future dates enabled)          │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ handleDateSelect(date)               │
   │ • setSelectedDate(date)              │
   │ • Trigger fetchAvailability          │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ fetchAvailability(courtId, date)     │
   │ CONSOLE: "🔍 Fetching availability   │
   │           for [Court] on [Date]..."  │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ getDemoAvailability(courtId, date)   │
   │ • Parse court hours (6:00-23:00)     │
   │ • Generate 90-min time slots         │
   │ • Check if slots are booked          │
   │ Returns: [                           │
   │   {time: "15:00", duration: 90, 
   │    isAvailable: true},               │
   │   ...8 more slots...                 │
   │ ]                                     │
   │ CONSOLE: "✓ Available slots: 8/8"    │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ setAvailableSlots([...])             │
   │ RENDER: Time slots displayed         │
   │ Each shows "Book Now" button         │
   └──────────────────────────────────────┘

5. SLOT SELECTION
   ┌──────────────────────────────────────┐
   │ User clicks "Book Now" at 15:00      │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ handleBookSlot(timeSlot)             │
   │ • setSelectedSlot(timeSlot)          │
   │ • setShowBookingModal(true)          │
   │ CONSOLE: "✓ Booking slot: {time:
   │           '15:00', duration: 90, ...}"│
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ <BookingModal> renders               │
   │ • Displays court info                │
   │ • Shows date & time                  │
   │ • Calculates total: $120/hr * 1.5hr
   │   = $180                             │
   │ • Shows form fields                  │
   │ RENDER: Modal dialog visible         │
   └──────────────────────────────────────┘

6. FORM INPUT
   ┌──────────────────────────────────────┐
   │ User fills form:                     │
   │ • Full Name: "Test User"             │
   │ • Email: "test@example.com"          │
   │ • Phone: "+1234567890" (optional)    │
   │                                      │
   │ setFormData({                        │
   │   playerName: "Test User",           │
   │   playerEmail: "test@example.com",   │
   │   playerPhone: "+1234567890"         │
   │ })                                   │
   │ RENDER: Form fields updated          │
   └──────────────────────────────────────┘

7. FORM SUBMISSION
   ┌──────────────────────────────────────┐
   │ User clicks "Book for $180"          │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ handleSubmit(event)                  │
   │ • event.preventDefault()             │
   │ • setLoading(true)                   │
   └────────┬─────────────────────────────┘
            │
            ▼

8. VALIDATION (3-TIER CHECK)
   ┌──────────────────────────────────────┐
   │ Validation Tier 1: Name Required     │
   │ if (!formData.playerName.trim()) {   │
   │   toast.error("Please enter your name")
   │   return                             │
   │ }                                     │
   └────────┬─────────────────────────────┘
            │
            ▼ (if pass)
   ┌──────────────────────────────────────┐
   │ Validation Tier 2: Email Required    │
   │ if (!formData.playerEmail.trim()) {  │
   │   toast.error("Please enter your email")
   │   return                             │
   │ }                                     │
   └────────┬─────────────────────────────┘
            │
            ▼ (if pass)
   ┌──────────────────────────────────────┐
   │ Validation Tier 3: Email Format      │
   │ const regex = /^[^\s@]+@[^\s@]+\.    │
   │             [^\s@]+$/                │
   │ if (!regex.test(email)) {            │
   │   toast.error("Invalid email")       │
   │   return                             │
   │ }                                     │
   └────────┬─────────────────────────────┘
            │
            ▼ (all pass)
   ┌──────────────────────────────────────┐
   │ All validations passed               │
   │ Proceed to booking creation          │
   └────────┬─────────────────────────────┘
            │
            ▼

9. BOOKING CREATION
   ┌──────────────────────────────────────┐
   │ await Promise(600ms delay)           │
   │ • Simulates network request          │
   │ • Shows loading state to user        │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ const booking = addDemoBooking({     │
   │   courtId: "court_1",                │
   │   date: "2026-03-05",                │
   │   time: "15:00",                     │
   │   duration: 90,                      │
   │   playerName: "Test User",           │
   │   playerEmail: "test@example.com",   │
   │   playerPhone: "+1234567890",        │
   │   totalPrice: 180,                   │
   │   status: "confirmed"                │
   │ })                                    │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ Inside addDemoBooking():             │
   │ 1. Generate unique ID                │
   │    _id: "booking_" + Date.now()      │
   │ 2. Get existing bookings from        │
   │    localStorage[demo_bookings]       │
   │ 3. Push new booking to array         │
   │ 4. Save back to localStorage         │
   │    localStorage.setItem(             │
   │      'demo_bookings',                │
   │      JSON.stringify(bookings)        │
   │    )                                  │
   │ 5. Return new booking object         │
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ CONSOLE: "✓ Booking created         │
   │           successfully: {...}"       │
   │                                      │
   │ STORAGE: localStorage[demo_bookings] │
   │  ├── booking_1709200000 {...}       │
   │  ├── booking_1709201234 {...}       │
   │  └── booking_1709203000 (NEW) {...} │
   └────────┬─────────────────────────────┘
            │
            ▼

10. SUCCESS FEEDBACK
    ┌──────────────────────────────────────┐
    │ toast({                              │
    │   title: "Booking Confirmed! 🎉",    │
    │   description: "Confirmation email   │
    │                sent to              │
    │                test@example.com"     │
    │ })                                    │
    │ setLoading(false)                    │
    │ setFormData({...empty...})           │
    │ RENDER: Green toast appears          │
    │         Button changes state         │
    └────────┬─────────────────────────────┘
             │
             ▼ (wait 800ms)
    ┌──────────────────────────────────────┐
    │ setTimeout(() => {                   │
    │   onSuccess()                        │
    │ }, 800)                              │
    │                                      │
    │ onSuccess() = modal close callback   │
    │ • setShowBookingModal(false)         │
    │ • setSelectedSlot(null)              │
    │ RENDER: Modal fades out              │
    └────────┬─────────────────────────────┘
             │
             ▼ (wait 300ms)

11. AVAILABILITY REFRESH
    ┌──────────────────────────────────────┐
    │ setTimeout(() => {                   │
    │   fetchAvailability(courtId, date)   │
    │ }, 300)                              │
    │                                      │
    │ getDemoAvailability() runs again     │
    │ • Checks ALL bookings in localStorage
    │ • Recalculates which slots booked    │
    │ • 15:00 slot now: isAvailable: false │
    │ CONSOLE: "✓ Available slots: 7/8"    │
    └────────┬─────────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────┐
    │ setAvailableSlots([...refreshed...])│
    │ RENDER:                              │
    │ • 15:00 slot now grayed out          │
    │ • "Book Now" button disabled         │
    │ • Remaining 7 slots still available  │
    └──────────────────────────────────────┘

12. PERSISTENCE VERIFICATION
    ┌──────────────────────────────────────┐
    │ Data persists across:                │
    │ ✓ Page refresh                       │
    │ ✓ Browser restart                    │
    │ ✓ Tab closure & reopening            │
    │ ✗ Browser cache clear                │
    │ ✗ localStorage clear                 │
    │ ✗ Private browsing mode              │
    │                                      │
    │ Location: DevTools →                 │
    │           Application →              │
    │           Local Storage →            │
    │           http://localhost:3000/     │
    │           • demo_courts (4 items)    │
    │           • demo_bookings (N items)  │
    │           • demo_users (N items)     │
    └──────────────────────────────────────┘
```

---

## Component Interaction Map

```
App Layout (app/layout.tsx)
│
├─ Navigation (components/navigation.tsx)
│  └─ Routes to all pages
│
├─ Toaster (from shadcn/ui)
│  └─ Shows all toast notifications
│
├─ HomePage (app/page.tsx)
│  ├─ HeroSection (components/hero-section.tsx)
│  ├─ FeaturesSection (components/features-section.tsx)
│  │
│  └─ CourtBooking (components/court-booking.tsx)
│     │
│     ├─ Calls: getDemoCourts()
│     │          getDemoAvailability()
│     │
│     └─ Opens: BookingModal (components/booking-modal.tsx)
│        │
│        └─ Calls: addDemoBooking()
│           └─ Updates: localStorage[demo_bookings]
│
├─ MyBookingsPage (app/my-bookings/page.tsx)
│  └─ MyBookings (components/my-bookings.tsx)
│     │
│     └─ Calls: getDemoBookings()
│              cancelDemoBooking()
│              findByEmail()
│
└─ AdminPage (app/admin/page.tsx)
   ├─ AdminDashboard (components/admin/admin-dashboard.tsx)
   │  │
   │  └─ Calls: getDashboardStats()
   │           getDemoBookings()
   │
   ├─ BookingsCalendar (components/admin/bookings-calendar.tsx)
   │  └─ Displays bookings by date
   │
   ├─ CourtManagement (components/admin/court-management.tsx)
   │  │
   │  └─ Calls: saveDemoCourt()
   │           getDemoCourts()
   │
   └─ ReportsSection (components/admin/reports-section.tsx)
      └─ Displays analytics
```

---

## Data Model Schema

```
Court {
  _id: string (unique ID)
  name: string (court name)
  description: string
  pricePerHour: number (price in currency)
  openTime: string (format: "HH:MM")
  closeTime: string (format: "HH:MM")
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

Booking {
  _id: string (unique ID)
  courtId: string (reference to Court._id)
  courtName: string (denormalized)
  date: string (format: "YYYY-MM-DD")
  time: string (format: "HH:MM")
  duration: number (minutes, usually 90)
  playerName: string
  playerEmail: string (used for lookup)
  playerPhone: string (optional)
  totalPrice: number
  status: "confirmed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

User {
  id: string
  name: string
  email: string (unique)
  phone: string
  createdAt: Date
  updatedAt: Date
}

TimeSlot {
  time: string (format: "HH:MM")
  duration: number (minutes)
  isAvailable: boolean (not booked)
}
```

---

## State Management (React Hooks)

```
CourtBooking.tsx States:
├─ courts: Court[] (from getDemoCourts)
├─ selectedCourt: Court | null
├─ selectedDate: Date | null
├─ selectedSlot: TimeSlot | null
├─ availableSlots: TimeSlot[]
├─ showBookingModal: boolean
├─ loading: boolean
└─ error: string | null

BookingModal.tsx States:
├─ formData: {
│  ├─ playerName: string
│  ├─ playerEmail: string
│  └─ playerPhone: string
├─ loading: boolean
└─ error: string | null

MyBookings.tsx States:
├─ searchEmail: string
├─ foundBookings: Booking[]
├─ loading: boolean
└─ error: string | null

AdminDashboard.tsx States:
├─ stats: {
│  ├─ totalBookings: number
│  ├─ totalRevenue: number
│  └─ recentBookings: Booking[]
└─ loading: boolean
```

---

**This architecture ensures:**
- ✅ Separation of concerns (UI, Logic, Storage)
- ✅ Easy debugging (console logging at each layer)
- ✅ Scalability (can replace localStorage with API)
- ✅ Type safety (TypeScript interfaces)
- ✅ User feedback (toast notifications)
- ✅ Data persistence (localStorage)

