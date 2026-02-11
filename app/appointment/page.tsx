"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import toast from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Link from "next/link";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";


type Slot = {
  time: string;
  available: number;
};



// const slotValue = 4;

// const initialSlots: Slot[] = [
//   { time: "08:00 AM - 09:00 AM", available: slotValue },
//   { time: "09:00 AM - 10:00 AM", available: slotValue },
//   { time: "10:00 AM - 11:00 AM", available: slotValue },
//   { time: "11:00 PM - 12:00 NN", available: slotValue },
//    { time: "12:00 NN - 1:00 PM", available: slotValue },
//   { time: "01:00 PM - 2:00 PM", available: slotValue },
//   { time: "2:00 PM - 3:00 PM", available: slotValue },
//   { time: "3:00 PM - 4:00 PM", available: slotValue },
//     { time: "4:00 PM - 5:00 PM", available: slotValue },
// ];


function generateAppointmentCode(length = 10): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    result += characters[randIndex];
  }
  return result;
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    appointmentCode: generateAppointmentCode(),
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    contactNumber: "",
    date: "",
    time: "",
  });

  //const [slots] = useState(initialSlots);

  const [slots, setSlots] = useState<Slot[]>([]);

  const [loading, setLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);


  const holidays = [
    new Date("2026-02-17"),
    new Date("2026-04-02"),
    new Date("2026-04-03"),
    new Date("2026-04-09"),
    new Date("2026-06-12"),
    new Date("2026-08-31"),
    new Date("2026-08-21"),
    new Date("2026-11-01"),
    new Date("2026-11-02"),
    new Date("2026-11-30"),
    new Date("2026-12-24"),
    new Date("2026-12-25"),
    new Date("2026-12-30"),
    new Date("2026-12-31"),
  ];

  useEffect(() => {
    const today = new Date();
    setForm((prev) => ({
      ...prev,
      date: formatLocalDate(today),
    }));
  }, []);


  function formatLocalDate(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const loadSlots = async (date: string) => {
  try {
    const res = await api.get(`/slots?date=${date}`);
    setSlots(res.data);
  } catch {
    toast.error("Failed to load slots");
  }
};

useEffect(() => {
  const today = formatLocalDate(new Date());

  setForm((prev) => ({
    ...prev,
    date: today,
  }));

  loadSlots(today);
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.time) {
      toast.error("Please select a time slot");
      return;
    }

    // IMPORTANT: reload slots
    await loadSlots(form.date);

    // // Optional: clear selected time
    // setForm((prev) => ({
    //   ...prev,
    //   time: "",
    // }));

    try {
      setLoading(true);
      const res = await api.post("/appointment", form);
      toast.success(res.data.message,{
        duration: 3000,
        style:{
          padding: '16px',
        }
      });
      setLoading(false);
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed");
    }
  }


    //FOR SUCCESS VIEW
function successView() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-6 animate-fade-in">

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600">
            Appointment Confirmed
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please save your appointment details
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Appointment Code
          </p>
          <p className="text-2xl md:text-3xl font-bold tracking-widest text-green-700">
            {form.appointmentCode}
          </p>
        </div>

        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Patient</span>
            <span className="font-medium text-right">
              {form.firstName} {form.middleName} {form.lastName}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Address</span>
            <span className="font-medium">{form.address}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{form.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>
            <span className="font-medium">{form.time}</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs md:text-sm text-center">
          Please take a screenshot or print this ticket.
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 border rounded-xl py-2 hover:bg-gray-100 transition"
          >
            Print
          </button>

          <Link
            href="/"
            className="flex-1 bg-blue-600 text-white text-center rounded-xl py-2 hover:bg-blue-500 transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}


return(
 <>
  {isSuccess && successView()}
  <Header />
  <Banner />

  <div className="bg-gray-50 min-h-screen py-10 px-4">
    <form onSubmit={submit} className="max-w-6xl mx-auto space-y-8">

      {/* Page Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          RHU Manaoag Online Appointment
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Schedule your medical consultation easily
        </p>
      </div>

      {/* DATE + TIME SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* DATE PICKER */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Select Date
          </h3>

          <DayPicker
            className="w-full"
            mode="single"
            selected={form.date ? new Date(form.date) : undefined}
            onSelect={(date) => {
              if (!date) return;

              const formatted = formatLocalDate(date);

              setForm((prev) => ({
                ...prev,
                date: formatted,
                time: "",
              }));

              loadSlots(formatted);
            }}
            disabled={[
              { before: new Date() },
              { dayOfWeek: [0, 6] },
              holidays,
            ]}
            modifiersClassNames={{
              disabled: "text-red-500 opacity-40",
              selected: "bg-green-600 text-white rounded-full",
            }}
          />
        </div>

        {/* TIME SLOTS */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Select Time
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {slots.map((slot) => (
              <label
                key={slot.time}
                className={`flex justify-between items-center border p-4 rounded-xl cursor-pointer transition
                ${
                  slot.available <= 0
                    ? "opacity-50 text-red-500 cursor-not-allowed"
                    : "hover:border-green-400 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="time"
                    value={slot.time}
                    disabled={slot.available <= 0}
                    checked={form.time === slot.time}
                    onChange={handleChange}
                  />
                  <span className="text-sm md:text-base">
                    {slot.time}
                  </span>
                </div>

                <span className="text-xs md:text-sm font-medium">
                  {slot.available <= 0
                    ? "Fully Booked"
                    : `Available ${slot.available}`}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PATIENT INFORMATION */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-700">
          Patient Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          <input
            name="middleName"
            placeholder="Middle Name"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          required
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          required
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-center">
        <button
          disabled={loading}
          className="w-full md:w-1/3 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Book Appointment"}
        </button>
      </div>

    </form>
  </div>

  <Footer />
</>
);
}