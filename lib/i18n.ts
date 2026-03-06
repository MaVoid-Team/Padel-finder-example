export type Language = "ar" | "en"

export const DEFAULT_LANGUAGE: Language = "ar"

export const LOCALES: Record<Language, string> = {
  ar: "ar-EG",
  en: "en-US",
}

const translations = {
  appTitle: { ar: "بادل كلوب", en: "PadelClub" },
  navBookCourts: { ar: "حجز الملاعب", en: "Book Courts" },
  navMyBookings: { ar: "حجوزاتي", en: "My Bookings" },
  navAdmin: { ar: "لوحة التحكم", en: "Admin" },
  navDbDisabled: { ar: "قاعدة البيانات غير مفعلة", en: "DB disabled" },
  languageToggle: { ar: "EN", en: "AR" },
  languageLabel: { ar: "اللغة", en: "Language" },

  demoModeTitle: { ar: "وضع تجريبي:", en: "Demo Mode:" },
  demoModeDescription: {
    ar: "يتم حفظ كل البيانات محليا في المتصفح. قم بتحديث الصفحة للحفاظ على حجوزاتك!",
    en: "All data is stored locally in your browser. Refresh the page to keep your bookings!",
  },

  heroTitleLine1: { ar: "احجز", en: "Book Your Perfect" },
  heroTitleLine2: { ar: "ملعب البادل المثالي", en: "Padel Court" },
  heroSubtitle: {
    ar: "استمتع بتجربة البادل في ملاعبنا المميزة. احجز فورا والعب مباشرة.",
    en: "Experience the thrill of padel on our premium courts. Book instantly, play immediately.",
  },
  heroInstantBooking: { ar: "حجز فوري", en: "Instant Booking" },
  heroSessionDuration: { ar: "جلسات 90 دقيقة", en: "90-Min Sessions" },
  heroPlayers: { ar: "حتى 4 لاعبين", en: "Up to 4 Players" },
  heroCta: { ar: "احجز الآن - بدون تسجيل دخول", en: "Book Now - No Login Required" },

  bookingTitle: { ar: "اختر ملعبك ووقتك", en: "Choose Your Court & Time" },
  bookingSubtitle: {
    ar: "اختر من ملاعبنا المميزة وحدد الوقت المناسب لمباراتك",
    en: "Select from our premium courts and find the perfect time slot for your game",
  },
  availableCourts: { ar: "الملاعب المتاحة", en: "Available Courts" },
  noCourts: { ar: "لا توجد ملاعب متاحة حاليا.", en: "No courts available at the moment." },
  ratingLabel: { ar: "تقييم 4.8", en: "4.8 rating" },
  availableTimesFor: { ar: "الأوقات المتاحة ليوم", en: "Available Times for" },
  minutesShort: { ar: "دقيقة", en: "min" },
  noSlotsDate: { ar: "لا توجد مواعيد متاحة لهذا التاريخ", en: "No available slots for this date" },
  selectDate: { ar: "اختر التاريخ", en: "Select Date" },
  perHour: { ar: "/ساعة", en: "/hour" },

  bookingModalTitle: { ar: "أكمل حجزك", en: "Complete Your Booking" },
  totalPrice: { ar: "السعر الإجمالي:", en: "Total Price:" },
  fullName: { ar: "الاسم الكامل *", en: "Full Name *" },
  emailAddress: { ar: "البريد الإلكتروني *", en: "Email Address *" },
  phoneOptional: { ar: "رقم الهاتف (اختياري)", en: "Phone Number (Optional)" },
  enterFullName: { ar: "أدخل اسمك الكامل", en: "Enter your full name" },
  enterEmail: { ar: "أدخل بريدك الإلكتروني", en: "Enter your email" },
  enterPhone: { ar: "أدخل رقم هاتفك", en: "Enter your phone number" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  bookingProgress: { ar: "جارٍ الحجز...", en: "Booking..." },
  bookFor: { ar: "احجز مقابل", en: "Book for" },
  validationError: { ar: "خطأ في التحقق", en: "Validation Error" },
  enterNameError: { ar: "يرجى إدخال الاسم", en: "Please enter your name" },
  enterEmailError: { ar: "يرجى إدخال البريد الإلكتروني", en: "Please enter your email" },
  validEmailError: { ar: "يرجى إدخال بريد إلكتروني صحيح", en: "Please enter a valid email" },
  bookingConfirmedTitle: { ar: "تم تأكيد الحجز!", en: "Booking Confirmed! 🎉" },
  bookingConfirmedDescription: {
    ar: "تم حجز ملعبك ليوم {date} الساعة {time}. تم إرسال رسالة التأكيد إلى {email}",
    en: "Your court is reserved for {date} at {time}. Confirmation email sent to {email}",
  },
  bookingFailed: { ar: "فشل الحجز", en: "Booking Failed" },
  tryAgain: { ar: "يرجى المحاولة مرة أخرى", en: "Please try again" },
  minutesWord: { ar: "دقيقة", en: "minutes" },

  featuresTitle: { ar: "مميزات النسخة التجريبية", en: "Demo Features" },
  featuresSubtitle: {
    ar: "اكتشف جميع مميزات بادل كلوب. هذه نسخة تجريبية متكاملة ببيانات وتفاعلات واقعية.",
    en: "Explore all the features of PadelClub. This is a fully functional demo with realistic data and interactions.",
  },
  howToUseDemo: { ar: "طريقة استخدام النسخة التجريبية", en: "How to Use This Demo" },

  myBookingsLookupTitle: { ar: "ابحث عن حجوزاتك", en: "Find Your Bookings" },
  myBookingsLookupSubtitle: { ar: "أدخل بريدك الإلكتروني لعرض وإدارة حجوزاتك", en: "Enter your email to view and manage your reservations" },
  searching: { ar: "جارٍ البحث...", en: "Searching..." },
  findMyBookings: { ar: "اعرض حجوزاتي", en: "Find My Bookings" },
  myBookingsTitle: { ar: "حجوزاتي", en: "My Bookings" },
  myBookingsSubtitle: { ar: "إدارة حجوزات الملاعب", en: "Manage your court reservations" },
  differentEmail: { ar: "بريد إلكتروني آخر", en: "Different Email" },
  total: { ar: "الإجمالي:", en: "Total:" },
  bookedOn: { ar: "تم الحجز بتاريخ", en: "Booked on" },
  cancelBookingTitle: { ar: "إلغاء الحجز", en: "Cancel Booking" },
  cancelBookingConfirm: { ar: "هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟", en: "Are you sure you want to cancel this booking?" },
  keepBooking: { ar: "الاحتفاظ بالحجز", en: "Keep Booking" },
  cancelBooking: { ar: "إلغاء الحجز", en: "Cancel Booking" },
  noBookingsFound: { ar: "لم يتم العثور على حجوزات", en: "No bookings found" },
  noBookingsYet: { ar: "لا توجد لديك حجوزات بعد. احجز ملعبا للبدء!", en: "You don't have any bookings yet. Book a court to get started!" },
  bookingsFoundTitle: { ar: "تم العثور على الحجوزات!", en: "Bookings Found!" },
  bookingsFoundDescription: { ar: "تم العثور على {count} حجز باستخدام {email}", en: "Found {count} booking(s) for {email}" },
  noBookingsForEmail: { ar: "لا توجد حجوزات لهذا البريد الإلكتروني", en: "No bookings found for this email address" },
  bookingCancelled: { ar: "تم إلغاء الحجز", en: "Booking Cancelled" },
  bookingCancelledSuccess: { ar: "تم إلغاء حجزك بنجاح", en: "Your booking has been cancelled successfully" },
  error: { ar: "خطأ", en: "Error" },
  failedCancelBooking: { ar: "فشل في إلغاء الحجز", en: "Failed to cancel booking" },

  adminDashboard: { ar: "لوحة التحكم", en: "Admin Dashboard" },
  adminSubtitle: { ar: "إدارة عمليات نادي البادل (وضع تجريبي)", en: "Manage your padel club operations (Demo Mode)" },
  quickActions: { ar: "إجراءات سريعة", en: "Quick Actions" },
  totalBookings: { ar: "إجمالي الحجوزات", en: "Total Bookings" },
  allTimeBookings: { ar: "إجمالي الحجوزات الكلي", en: "All time bookings" },
  totalRevenue: { ar: "إجمالي الإيرادات", en: "Total Revenue" },
  totalEarnings: { ar: "إجمالي الأرباح", en: "Total earnings" },
  activeUsers: { ar: "المستخدمون النشطون", en: "Active Users" },
  uniquePlayers: { ar: "لاعبون فريدون", en: "Unique players" },
  avgSession: { ar: "متوسط الجلسة", en: "Avg. Session" },
  averageDuration: { ar: "متوسط المدة", en: "Average duration" },
  calendarTab: { ar: "التقويم", en: "Calendar" },
  courtsTab: { ar: "الملاعب", en: "Courts" },
  usersTab: { ar: "المستخدمون", en: "Users" },
  reportsTab: { ar: "التقارير", en: "Reports" },
  analyticsTab: { ar: "التحليلات", en: "Analytics" },
  recentBookings: { ar: "أحدث الحجوزات", en: "Recent Bookings" },
  atWord: { ar: "الساعة", en: "at" },

  calendarView: { ar: "عرض التقويم", en: "Calendar View" },
  bookingsForDate: { ar: "الحجوزات ليوم", en: "Bookings for" },
  noBookingsDate: { ar: "لا توجد حجوزات لهذا التاريخ", en: "No bookings for this date" },

  courtManagement: { ar: "إدارة الملاعب", en: "Court Management" },
  addCourt: { ar: "إضافة ملعب", en: "Add Court" },
  editCourt: { ar: "تعديل ملعب", en: "Edit Court" },
  addNewCourt: { ar: "إضافة ملعب جديد", en: "Add New Court" },
  courtName: { ar: "اسم الملعب", en: "Court Name" },
  description: { ar: "الوصف", en: "Description" },
  openTime: { ar: "وقت الفتح", en: "Open Time" },
  closeTime: { ar: "وقت الإغلاق", en: "Close Time" },
  pricePerHourLabel: { ar: "السعر لكل ساعة ($)", en: "Price per Hour ($)" },
  courtNameExample: { ar: "مثال: ملعب 1 - مميز", en: "e.g., Court 1 - Premium" },
  courtDescriptionPlaceholder: { ar: "وصف الملعب", en: "Court description" },
  updating: { ar: "جارٍ التحديث...", en: "Updating..." },
  creating: { ar: "جارٍ الإنشاء...", en: "Creating..." },
  updateCourt: { ar: "تحديث الملعب", en: "Update Court" },
  createCourt: { ar: "إنشاء الملعب", en: "Create Court" },
  active: { ar: "نشط", en: "Active" },
  inactive: { ar: "غير نشط", en: "Inactive" },
  edit: { ar: "تعديل", en: "Edit" },
  courtUpdated: { ar: "تم تحديث الملعب", en: "Court Updated" },
  courtCreated: { ar: "تم إنشاء الملعب", en: "Court Created" },
  courtUpdatedSuccess: { ar: "تم تحديث الملعب بنجاح", en: "Court has been updated successfully" },
  courtCreatedSuccess: { ar: "تمت إضافة ملعب جديد بنجاح", en: "New court has been added successfully" },
  failedSaveCourt: { ar: "فشل في حفظ الملعب", en: "Failed to save court" },

  userManagement: { ar: "إدارة المستخدمين", en: "User Management" },
  searchUsers: { ar: "ابحث عن المستخدمين...", en: "Search users..." },
  totalSpent: { ar: "إجمالي الإنفاق", en: "Total Spent" },
  lastBooking: { ar: "آخر حجز", en: "Last Booking" },
  noUsersFound: { ar: "لا يوجد مستخدمون مطابقون لبحثك", en: "No users found matching your search" },

  reportsAnalytics: { ar: "التقارير والتحليلات", en: "Reports & Analytics" },
  peakHours: { ar: "ساعات الذروة", en: "Peak Hours" },
  mostPopularSlots: { ar: "أكثر الأوقات شعبية", en: "Most popular time slots" },
  avgRevenueDay: { ar: "متوسط الإيراد/اليوم", en: "Avg Revenue/Day" },
  basedLast30: { ar: "استنادا إلى آخر 30 يوما", en: "Based on last 30 days" },
  repeatCustomers: { ar: "العملاء المتكررون", en: "Repeat Customers" },
  retentionRate: { ar: "معدل الاحتفاظ بالعملاء", en: "Customer retention rate" },
  growthRate: { ar: "معدل النمو", en: "Growth Rate" },
  monthOverMonth: { ar: "مقارنة بالشهر السابق", en: "Month over month" },
  bookingsByHour: { ar: "الحجوزات حسب الساعة", en: "Bookings by Hour" },
  courtUsageDistribution: { ar: "توزيع استخدام الملاعب", en: "Court Usage Distribution" },

  advancedReports: { ar: "تقارير متقدمة", en: "Advanced Reports" },
  last7Days: { ar: "آخر 7 أيام", en: "Last 7 days" },
  last30Days: { ar: "آخر 30 يوما", en: "Last 30 days" },
  last90Days: { ar: "آخر 90 يوما", en: "Last 90 days" },
  lastYear: { ar: "العام الماضي", en: "Last year" },
  exportCsv: { ar: "تصدير CSV", en: "Export CSV" },
  avgBookingValue: { ar: "متوسط قيمة الحجز", en: "Avg Booking Value" },
  perReservation: { ar: "لكل حجز", en: "Per reservation" },
  repeatRate: { ar: "معدل التكرار", en: "Repeat Rate" },
  customerRetention: { ar: "الاحتفاظ بالعملاء", en: "Customer retention" },
  uniqueCustomers: { ar: "العملاء الفريدون", en: "Unique Customers" },
  individualPlayers: { ar: "لاعبون أفراد", en: "Individual players" },
  dailyAverage: { ar: "المتوسط اليومي", en: "Daily Average" },
  bookingsPerDay: { ar: "حجوزات في اليوم", en: "Bookings per day" },
  revenueTrend: { ar: "اتجاه الإيرادات", en: "Revenue Trend" },
  peakHoursAnalysis: { ar: "تحليل ساعات الذروة", en: "Peak Hours Analysis" },
  topCustomers: { ar: "أفضل العملاء", en: "Top Customers" },
  bookingsCount: { ar: "حجوزات", en: "bookings" },

  featureCard1Title: { ar: "حجز الملاعب", en: "Court Booking" },
  featureCard1Desc: { ar: "تصفح الملاعب المتاحة واحجز الوقت المناسب فوريا", en: "Browse available courts and book your preferred time slot instantly" },
  featureCard1Item1: { ar: "4 ملاعب مميزة", en: "4 Premium Courts" },
  featureCard1Item2: { ar: "توافر فوري", en: "Real-time availability" },
  featureCard1Item3: { ar: "مواعيد مرنة", en: "Flexible time slots" },
  featureCard1Item4: { ar: "تأكيد فوري", en: "Instant confirmation" },

  featureCard2Title: { ar: "إدارة الحجوزات", en: "Booking Management" },
  featureCard2Desc: { ar: "تتبع وإدارة جميع حجوزاتك في مكان واحد", en: "Track and manage all your reservations in one place" },
  featureCard2Item1: { ar: "عرض جميع الحجوزات", en: "View all bookings" },
  featureCard2Item2: { ar: "إلغاء في أي وقت", en: "Cancel anytime" },
  featureCard2Item3: { ar: "سجل الحجوزات", en: "Booking history" },
  featureCard2Item4: { ar: "بيانات اللاعبين", en: "Player details" },

  featureCard3Title: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
  featureCard3Desc: { ar: "تحكم كامل في عمليات الملاعب والتحليلات", en: "Complete control over court operations and analytics" },
  featureCard3Item1: { ar: "متابعة الإيرادات", en: "Revenue tracking" },
  featureCard3Item2: { ar: "إدارة الملاعب", en: "Court management" },
  featureCard3Item3: { ar: "تقويم الحجوزات", en: "Booking calendar" },
  featureCard3Item4: { ar: "تحليلات المستخدمين", en: "User analytics" },
  featureCard3Item5: { ar: "تقارير ورؤى", en: "Reports & insights" },

  featureCard4Title: { ar: "إدارة المستخدمين", en: "User Management" },
  featureCard4Desc: { ar: "تتبع بيانات اللاعبين وأنماط الاستخدام", en: "Track player information and usage patterns" },
  featureCard4Item1: { ar: "ملفات اللاعبين", en: "Player profiles" },
  featureCard4Item2: { ar: "سجل الحجوزات", en: "Booking history" },
  featureCard4Item3: { ar: "إحصائيات الأداء", en: "Performance stats" },
  featureCard4Item4: { ar: "بيانات التواصل", en: "Contact info" },

  howToStep1Title: { ar: "1. احجز ملعبا", en: "1. Book a Court" },
  howToStep1Desc: { ar: "انتقل إلى \"حجز الملاعب\" واختر الملعب والتاريخ والوقت. أدخل بياناتك وأكمل الحجز. يتم حفظ البيانات محليا في متصفحك.", en: "Go to \"Book Courts\" and select a court, date, and time slot. Fill in your details and complete the booking. Data is saved locally in your browser." },
  howToStep2Title: { ar: "2. راجع حجوزاتك", en: "2. Check Your Bookings" },
  howToStep2Desc: { ar: "انتقل إلى \"حجوزاتي\" وابحث باستخدام بريدك الإلكتروني لرؤية جميع حجوزاتك. يمكنك إلغاء الحجوزات من هناك.", en: "Visit \"My Bookings\" and search for your email to see all your reservations. You can cancel bookings here." },
  howToStep3Title: { ar: "3. لوحة الإدارة", en: "3. Admin Dashboard" },
  howToStep3Desc: { ar: "ادخل قسم \"لوحة التحكم\" لعرض التحليلات وإدارة الملاعب ومتابعة حجوزات المستخدمين وإصدار التقارير. كل الميزات تفاعلية بالكامل!", en: "Access the \"Admin\" section to see analytics, manage courts, view user bookings, and generate reports. All features are fully interactive!" },

  statusConfirmed: { ar: "مؤكد", en: "confirmed" },
  statusCancelled: { ar: "ملغي", en: "cancelled" },
  statusCompleted: { ar: "مكتمل", en: "completed" },
} as const

export type TranslationKey = keyof typeof translations

export function translate(key: TranslationKey, language: Language): string {
  return translations[key][language]
}

export function interpolate(template: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), template)
}

export function localizeStatus(status: string, language: Language) {
  switch (status) {
    case "confirmed":
      return translate("statusConfirmed", language)
    case "cancelled":
      return translate("statusCancelled", language)
    case "completed":
      return translate("statusCompleted", language)
    default:
      return status
  }
}

const courtNameMap: Record<string, { ar: string; en: string }> = {
  "Court 1 - Premium": { ar: "الملعب 1 - مميز", en: "Court 1 - Premium" },
  "Court 2 - Standard": { ar: "الملعب 2 - قياسي", en: "Court 2 - Standard" },
  "Court 3 - Outdoor": { ar: "الملعب 3 - خارجي", en: "Court 3 - Outdoor" },
  "Court 4 - Premium Indoor": { ar: "الملعب 4 - داخلي مميز", en: "Court 4 - Premium Indoor" },
  "الملعب 1 - مميز": { ar: "الملعب 1 - مميز", en: "Court 1 - Premium" },
  "الملعب 2 - قياسي": { ar: "الملعب 2 - قياسي", en: "Court 2 - Standard" },
  "الملعب 3 - خارجي": { ar: "الملعب 3 - خارجي", en: "Court 3 - Outdoor" },
  "الملعب 4 - داخلي مميز": { ar: "الملعب 4 - داخلي مميز", en: "Court 4 - Premium Indoor" },
}

const courtDescriptionMap: Record<string, { ar: string; en: string }> = {
  "Indoor court with premium lighting and AC": {
    ar: "ملعب داخلي بإضاءة مميزة وتكييف",
    en: "Indoor court with premium lighting and AC",
  },
  "Standard indoor court": { ar: "ملعب داخلي قياسي", en: "Standard indoor court" },
  "Beautiful outdoor court with natural light": {
    ar: "ملعب خارجي رائع بإضاءة طبيعية",
    en: "Beautiful outdoor court with natural light",
  },
  "Top-tier indoor facility with professional grade equipment": {
    ar: "منشأة داخلية عالية المستوى بمعدات احترافية",
    en: "Top-tier indoor facility with professional grade equipment",
  },
  "ملعب داخلي بإضاءة مميزة وتكييف": {
    ar: "ملعب داخلي بإضاءة مميزة وتكييف",
    en: "Indoor court with premium lighting and AC",
  },
  "ملعب داخلي قياسي": { ar: "ملعب داخلي قياسي", en: "Standard indoor court" },
  "ملعب خارجي رائع بإضاءة طبيعية": {
    ar: "ملعب خارجي رائع بإضاءة طبيعية",
    en: "Beautiful outdoor court with natural light",
  },
  "منشأة داخلية عالية المستوى بمعدات احترافية": {
    ar: "منشأة داخلية عالية المستوى بمعدات احترافية",
    en: "Top-tier indoor facility with professional grade equipment",
  },
}

export function localizeCourtName(name: string, language: Language) {
  return courtNameMap[name]?.[language] ?? name
}

export function localizeCourtDescription(description: string, language: Language) {
  return courtDescriptionMap[description]?.[language] ?? description
}
