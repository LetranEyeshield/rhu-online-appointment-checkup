import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema(
  {
     appointmentCode: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: String,
    lastName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment = models.Appointment || model("Appointment", AppointmentSchema);
