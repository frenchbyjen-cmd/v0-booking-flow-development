import { NextResponse } from "next/server"

interface ActivityPayload {
  name: string
  duration: number
  price: number
  meetingPoint: string
  meetingTime: string
}

interface RecapPayload {
  firstName: string
  email: string
  activities: ActivityPayload[]
  total: number
}

export async function POST(request: Request) {
  try {
    const body: RecapPayload = await request.json()

    if (!body.firstName || !body.email || !body.activities?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!body.email.includes("@") || !body.email.includes(".")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    const activitiesText = body.activities
      .map(
        (a) =>
          `  - ${a.name}\n    Duration: ${a.duration} min | Price: ${a.price} MAD\n    Time: ${a.meetingTime}\n    Meeting point: ${a.meetingPoint}`
      )
      .join("\n\n")

    const emailContent = `Hi ${body.firstName},

Here is your Simple Flow booking recap for Tamraght!

Your selected activities:

${activitiesText}

---
Total: ${body.total} MAD
---

Payment is made on arrival at the activity location (cash or card).
Please arrive 5-10 minutes before the start time at the meeting point.

If you have any questions, feel free to reply to this email.

Looking forward to flowing with you!
Jen
Sports With Jen - Tamraght, Morocco`

    // Log the email for development/demo purposes
    console.log("=== EMAIL RECAP ===")
    console.log(`To: ${body.email}`)
    console.log(`Subject: Your Simple Flow Recap - Sports With Jen`)
    console.log(`Body:\n${emailContent}`)
    console.log("===================")

    // In production, integrate with an email service like Resend, SendGrid, etc.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Sports With Jen <bookings@sportswithjen.com>',
    //   to: body.email,
    //   subject: 'Your Simple Flow Recap - Sports With Jen',
    //   text: emailContent,
    // })

    return NextResponse.json({ success: true, message: "Recap sent successfully" })
  } catch (error) {
    console.error("Error sending recap:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
