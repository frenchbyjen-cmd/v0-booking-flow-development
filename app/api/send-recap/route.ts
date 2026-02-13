import { NextResponse } from "next/server"

interface ActivityPayload {
  name: string
  duration: number
  time: string
  meetingPoint: string
}

interface RecapPayload {
  firstName: string
  email: string
  formula: {
    name: string
    price: number
  }
  activities: ActivityPayload[]
}

export async function POST(request: Request) {
  try {
    const body: RecapPayload = await request.json()

    // Validate required fields
    if (!body.firstName || !body.email || !body.formula || !body.activities?.length) {
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

    // Build the email content
    const activitiesText = body.activities
      .map(
        (a) =>
          `  \u2022 ${a.name} \u2013 ${a.time}\n    Meeting point: ${a.meetingPoint}`
      )
      .join("\n\n")

    const emailContent = `Hi ${body.firstName},

Your Flow booking in Tamraght is confirmed!
Here is your recap:

Selected Flow:
  \u2022 ${body.formula.name}
  \u2022 Price: ${body.formula.price} dirhams

Your activities & meeting points:
${activitiesText}

Please arrive 5\u201310 minutes before the start time.

If you have any questions, feel free to reply to this email.

Looking forward to flowing with you!
Jen
Sports With Jen`

    // Log the email for development/demo purposes
    console.log("=== EMAIL RECAP ===")
    console.log(`To: ${body.email}`)
    console.log(`Subject: Your Sports With Jen \u2013 Flow Booking in Tamraght \ud83c\udf0a`)
    console.log(`Body:\n${emailContent}`)
    console.log("===================")

    // In production, integrate with an email service like Resend, SendGrid, etc.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Sports With Jen <bookings@sportswithjen.com>',
    //   to: body.email,
    //   subject: 'Your Sports With Jen – Flow Booking in Tamraght 🌊',
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
