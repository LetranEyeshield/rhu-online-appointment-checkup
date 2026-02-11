import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/app/lib/mongodb";
import { Appointment } from "@/app/models/Appointment";

const appointmentSchema = z.object({
  appointmentCode: z.string(),
  firstName: z.string().min(1),
  middleName: z.string(),
  lastName: z.string().min(1),
  address: z.string().min(2),
  contactNumber: z.string().min(9).max(15),
  date: z.string(),
  time: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = appointmentSchema.parse(body);

    await connectDB();

    // ❗ Prevent same patient booking twice same day
    const existing = await Appointment.findOne({
      appointmentCode: data.appointmentCode,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      address: data.address,
      contactNumber: data.contactNumber,
      date: data.date,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Patient already has an appointment for this date" },
        { status: 400 }
      );
    }

    await Appointment.create({
      appointmentCode: data.appointmentCode,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      address: data.address,
      contactNumber: data.contactNumber,
      date: data.date,
      time: data.time,
    });

    return NextResponse.json(
      { message: "Appointment Successfully Registered" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Appointment Registration failed" },
      { status: 500 }
    );
  }
}
