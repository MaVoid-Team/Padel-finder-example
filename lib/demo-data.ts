// Demo Data Manager - Simulates backend with localStorage
import type { Court } from './models/Court'
import type { Booking } from './models/Booking'

const DEMO_COURTS_KEY = 'demo_courts'
const DEMO_BOOKINGS_KEY = 'demo_bookings'
const DEMO_USERS_KEY = 'demo_users'

export interface DemoUser {
  id: string
  name: string
  email: string
  phone: string
}

// Generate mock courts
const generateDemoCourts = (): Court[] => [
  {
    _id: 'court_1',
    name: 'Court 1 - Premium',
    description: 'Indoor court with premium lighting and AC',
    isActive: true,
    openTime: '06:00',
    closeTime: '23:00',
    pricePerHour: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'court_2',
    name: 'Court 2 - Standard',
    description: 'Standard indoor court',
    isActive: true,
    openTime: '06:00',
    closeTime: '23:00',
    pricePerHour: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'court_3',
    name: 'Court 3 - Outdoor',
    description: 'Beautiful outdoor court with natural light',
    isActive: true,
    openTime: '08:00',
    closeTime: '20:00',
    pricePerHour: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'court_4',
    name: 'Court 4 - Premium Indoor',
    description: 'Top-tier indoor facility with professional grade equipment',
    isActive: true,
    openTime: '06:00',
    closeTime: '23:00',
    pricePerHour: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Generate mock bookings
const generateDemoBookings = (): Booking[] => {
  const today = new Date()
  const bookings: Booking[] = []

  const bookingsData = [
    { courtId: 'court_1', playerName: 'John Doe', playerEmail: 'john@example.com', playerPhone: '+1234567890', time: '10:00', duration: 90 },
    { courtId: 'court_2', playerName: 'Jane Smith', playerEmail: 'jane@example.com', playerPhone: '+1987654321', time: '14:00', duration: 120 },
    { courtId: 'court_3', playerName: 'Mike Johnson', playerEmail: 'mike@example.com', playerPhone: '+1555555555', time: '18:00', duration: 60 },
    { courtId: 'court_1', playerName: 'Sarah Williams', playerEmail: 'sarah@example.com', playerPhone: '+1666666666', time: '16:00', duration: 90 },
    { courtId: 'court_4', playerName: 'Alex Brown', playerEmail: 'alex@example.com', playerPhone: '+1777777777', time: '19:00', duration: 120 },
  ]

  bookingsData.forEach((booking, idx) => {
    const court = generateDemoCourts().find(c => c._id === booking.courtId)
    bookings.push({
      _id: `booking_${idx + 1}`,
      courtId: booking.courtId,
      courtName: court?.name || 'Unknown Court',
      date: today.toISOString().split('T')[0],
      time: booking.time,
      duration: booking.duration,
      playerName: booking.playerName,
      playerEmail: booking.playerEmail,
      playerPhone: booking.playerPhone,
      totalPrice: (court?.pricePerHour || 100) * (booking.duration / 60),
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })

  return bookings
}

// Initialize localStorage with demo data if needed
export function initializeDemoData() {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(DEMO_COURTS_KEY)) {
    localStorage.setItem(DEMO_COURTS_KEY, JSON.stringify(generateDemoCourts()))
  }

  if (!localStorage.getItem(DEMO_BOOKINGS_KEY)) {
    localStorage.setItem(DEMO_BOOKINGS_KEY, JSON.stringify(generateDemoBookings()))
  }
}

// Get all courts
export function getDemoCourts(): Court[] {
  if (typeof window === 'undefined') return generateDemoCourts()
  
  const courts = localStorage.getItem(DEMO_COURTS_KEY)
  return courts ? JSON.parse(courts) : generateDemoCourts()
}

// Get all bookings
export function getDemoBookings(): Booking[] {
  if (typeof window === 'undefined') return generateDemoBookings()
  
  const bookings = localStorage.getItem(DEMO_BOOKINGS_KEY)
  return bookings ? JSON.parse(bookings) : generateDemoBookings()
}

// Add a new booking
export function addDemoBooking(booking: Omit<Booking, '_id' | 'createdAt' | 'updatedAt'>): Booking {
  if (typeof window === 'undefined') throw new Error('Cannot add booking outside browser')
  
  const bookings = getDemoBookings()
  const court = getDemoCourts().find(c => c._id === booking.courtId)
  
  const newBooking: Booking = {
    ...booking,
    _id: `booking_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    courtName: court?.name || booking.courtId,
  }
  
  bookings.push(newBooking)
  localStorage.setItem(DEMO_BOOKINGS_KEY, JSON.stringify(bookings))
  return newBooking
}

// Update a booking
export function updateDemoBooking(id: string, updates: Partial<Booking>): Booking | null {
  if (typeof window === 'undefined') throw new Error('Cannot update booking outside browser')
  
  const bookings = getDemoBookings()
  const index = bookings.findIndex(b => b._id === id)
  
  if (index === -1) return null
  
  bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date() }
  localStorage.setItem(DEMO_BOOKINGS_KEY, JSON.stringify(bookings))
  return bookings[index]
}

// Cancel a booking
export function cancelDemoBooking(id: string): Booking | null {
  return updateDemoBooking(id, { status: 'cancelled' })
}

// Get bookings for a specific date
export function getDemoBookingsByDate(date: string): Booking[] {
  return getDemoBookings().filter(b => b.date === date)
}

// Get bookings for a specific court and date
export function getDemoAvailability(courtId: string, date: string): Array<{ time: string; duration: number; isAvailable: boolean }> {
  const court = getDemoCourts().find(c => c._id === courtId)
  if (!court) return []

  const timeSlots = generateTimeSlots(court.openTime, court.closeTime)
  const bookingsForDay = getDemoBookingsByDate(date).filter(b => b.courtId === courtId)

  return timeSlots.map(slot => ({
    time: slot,
    duration: 90,
    isAvailable: !bookingsForDay.some(
      b => b.time === slot && b.status !== 'cancelled'
    ),
  }))
}

// Add or update a court
export function saveDemoCourt(court: Court): Court {
  if (typeof window === 'undefined') throw new Error('Cannot save court outside browser')
  
  const courts = getDemoCourts()
  const index = courts.findIndex(c => c._id === court._id)
  
  const courtToSave: Court = {
    ...court,
    updatedAt: new Date(),
    createdAt: court.createdAt || new Date(),
  }
  
  if (index === -1) {
    courtToSave._id = `court_${Date.now()}`
    courts.push(courtToSave)
  } else {
    courts[index] = courtToSave
  }
  
  localStorage.setItem(DEMO_COURTS_KEY, JSON.stringify(courts))
  return courtToSave
}

// Delete a court
export function deleteDemoCourt(id: string): boolean {
  if (typeof window === 'undefined') throw new Error('Cannot delete court outside browser')
  
  const courts = getDemoCourts()
  const index = courts.findIndex(c => c._id === id)
  
  if (index === -1) return false
  
  courts.splice(index, 1)
  localStorage.setItem(DEMO_COURTS_KEY, JSON.stringify(courts))
  return true
}

// Helper to generate time slots
function generateTimeSlots(openTime: string, closeTime: string): string[] {
  const slots: string[] = []
  const [openHour, openMin] = openTime.split(':').map(Number)
  const [closeHour, closeMin] = closeTime.split(':').map(Number)

  let currentHour = openHour
  let currentMin = openMin

  while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
    slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`)
    currentHour += 1
    if (currentMin === 30) {
      currentMin = 0
    } else {
      currentMin = 30
    }
  }

  return slots
}

// Get dashboard stats
export function getDashboardStats() {
  const bookings = getDemoBookings()
  const courts = getDemoCourts()

  const totalBookings = bookings.length
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? b.totalPrice : 0), 0)
  const uniquePlayers = new Set(bookings.map(b => b.playerEmail)).size
  const averageBookingDuration = bookings.length > 0 
    ? bookings.reduce((sum, b) => sum + b.duration, 0) / bookings.length 
    : 0

  return {
    totalBookings,
    totalRevenue,
    activeUsers: uniquePlayers,
    averageBookingDuration: Math.round(averageBookingDuration),
    activeCourts: courts.filter(c => c.isActive).length,
    totalCourts: courts.length,
  }
}

// Clear all demo data
export function clearDemoData() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(DEMO_COURTS_KEY)
  localStorage.removeItem(DEMO_BOOKINGS_KEY)
  initializeDemoData()
}
