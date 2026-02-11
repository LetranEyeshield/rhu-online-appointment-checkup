import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Appointment } from "@/app/models/Appointment";

const defaultTimes = [
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 NN",
   "12:00 NN - 1:00 PM",
  "1:00 PM - 2:00 PM",
   "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
     "4:00 PM - 5:00 PM",
];

const MAX_SLOTS = 4;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ message: "Date required" }, { status: 400 });
    }

    await connectDB();

    const appointments = await Appointment.find({ date });

    const slots = defaultTimes.map((time) => {
      const booked = appointments.filter((a) => a.time === time).length;

      return {
        time,
        available: MAX_SLOTS - booked,
      };
    });

    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json({ message: "Failed to load slots" }, { status: 500 });
  }
}
