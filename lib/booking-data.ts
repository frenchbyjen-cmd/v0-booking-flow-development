export interface Formula {
  id: string
  name: string
  price: number
  maxActivities: number
  description: string
  tagline: string
}

export interface Activity {
  id: string
  name: string
  duration: number
  price: number
  calUrl: string
  meetingPoint: string
  meetingTime?: string
}

export const formulas: Formula[] = [
  {
    id: "easy-flow",
    name: "Easy Flow",
    price: 300,
    maxActivities: 1,
    description: "Perfect for a first taste of the Tamraght flow. Pick one activity and enjoy.",
    tagline: "Dip your toes in",
  },
  {
    id: "social-flow",
    name: "Social Flow",
    price: 400,
    maxActivities: 3,
    description: "Mix and match up to 3 activities. Great for connecting and exploring.",
    tagline: "Find your rhythm",
  },
  {
    id: "full-flow",
    name: "Full Flow",
    price: 500,
    maxActivities: 5,
    description: "The complete experience. Access up to 5 activities for the ultimate flow.",
    tagline: "Go all in",
  },
]

export const activities: Activity[] = [
  {
    id: "move-walk-meditate",
    name: "Move, Walk & Meditate on the Beach",
    duration: 60,
    price: 90,
    calUrl: "https://cal.com/sportswithjen-flow/move-walk-meditate?overlayCalendar=true",
    meetingPoint: "G847+PG5, Tamraght",
    meetingTime: "08:00",
  },
  {
    id: "french-workshop",
    name: "French Workshop + Breakfast",
    duration: 90,
    price: 95,
    calUrl: "https://cal.com/sportswithjen-flow/90min?overlayCalendar=true",
    meetingPoint: "G879+37, Tamraght",
  },
  {
    id: "multisport-beach",
    name: "Multisport on the Beach",
    duration: 120,
    price: 80,
    calUrl: "https://cal.com/sportswithjen-flow/120?overlayCalendar=true",
    meetingPoint: "G857+W4, Tamraght",
  },
  {
    id: "sunset-yoga",
    name: "Sunset Yoga & Flow",
    duration: 75,
    price: 90,
    calUrl: "https://cal.com/sportswithjen-flow/sunset-yoga-flow?overlayCalendar=true",
    meetingPoint: "G857+W4, Tamraght",
  },
]
