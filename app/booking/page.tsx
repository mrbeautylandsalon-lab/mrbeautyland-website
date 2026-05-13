"use client";

import { useState } from "react";

import { supabase } from "../supabase";
import emailjs from "@emailjs/browser";

const services = [

  {
    name: "MEN'S HAIR CUT",
    price: 189,
    duration: "30 mins",
  },

  {
    name: "MEN'S HAIR COLOUR",
    price: 489,
    duration: "60 mins",
  },

  {
    name: "FACIAL TREATMENT",
    price: 489,
    duration: "45 mins",
  },

  {
    name: "BODY SPA",
    price: 989,
    duration: "90 mins",
  },

  {
    name: "BODY MASSAGE",
    price: 789,
    duration: "75 mins",
  },

  {
    name: "AROMA MAGIC COMBO",
    price: 989,
    duration: "120 mins",
  },

];

const slots = [

  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",

];

export default function BookingPage() {

  const [selectedService, setSelectedService] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [orderId, setOrderId] = useState("");

const handleBooking = async () => {

  if (
    !selectedService ||
    !selectedDate ||
    !selectedSlot ||
    !name ||
    !mobile ||
    !email
  ) {

    alert("Please Fill All Details");

    return;

  }

  const generatedOrderId =
    "MRB" + Math.floor(Math.random() * 999999);

  const { error } = await supabase
    .from("bookings")
    .insert([
      {
  name: name,
  mobile: mobile,
  email: email,
  service: selectedService.name,
  date: selectedDate,
  time: selectedSlot,
  status: "Confirmed",
  amount: selectedService.price,
}
    ]);

  if (error) {

    console.log(error);

    alert("Booking Failed");

    return;

  }

  await supabase
    .from("history")
    .insert([
      {
        service: selectedService.name,
        status: "Confirmed",
        date: selectedDate,
      },
    ]);

  await supabase
    .from("notifications")
    .insert([
      {
        title: "Booking Confirmed",
        message: `${selectedService.name} booked successfully.`,
        date: selectedDate,
      },
    ]);

  await supabase
    .from("payments")
    .insert([
      {
        amount: selectedService.price,
        service: selectedService.name,
        status: "Pending",
        date: selectedDate,
      },
    ]);



  setOrderId(generatedOrderId);
try {

  const response = await emailjs.send(
    "service_zxaqz7b",
    "template_1jyruf5",
    {
      customer_name: name,
      order_id: generatedOrderId,
      service_name: selectedService.name,
      booking_date: selectedDate,
      booking_time: selectedSlot,
      amount: selectedService.price,
      to_email: email,
    },
    "f0a-zPukkYnc3HI2T"
  );

  console.log("EMAIL SENT", response);

} catch (error) {

  console.log("EMAIL ERROR", error);

}
  setShowPopup(true);

};

  return (

    <main className="min-h-screen bg-[#f7f1eb] text-black px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">

          <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
            Book Appointment
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Premium Salon Booking Experience
          </h1>

        </div>

        {/* SERVICES */}
        <div className="mb-20">

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Select Service
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              services.map((service, index) => (

                <div
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className={`bg-white rounded-[35px] p-8 cursor-pointer transition duration-300 border-2 ${
                    selectedService?.name === service.name
                      ? "border-black scale-[1.02]"
                      : "border-transparent"
                  }`}
                >

                  <h3 className="text-3xl font-bold mb-4">
                    {service.name}
                  </h3>

                  <p className="text-5xl font-bold mb-5">
                    ₹{service.price}
                  </p>

                  <p className="text-neutral-500 mb-8">
                    Premium salon experience crafted by professional experts.
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="text-sm text-neutral-500">
                      {service.duration}
                    </span>

                    <button className="bg-black text-white px-5 py-2 rounded-full">
                      BOOK
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

        {/* DATE + SLOT */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">

          <div className="bg-white rounded-[40px] p-10">

            <h2 className="text-3xl font-bold mb-8">
              Select Date
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

          </div>

          <div className="bg-white rounded-[40px] p-10">

            <h2 className="text-3xl font-bold mb-8">
              Select Time Slot
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {
                slots.map((slot, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-4 rounded-2xl transition ${
                      selectedSlot === slot
                        ? "bg-black text-white"
                        : "bg-[#f7f1eb]"
                    }`}
                  >
                    {slot}
                  </button>

                ))
              }

            </div>

          </div>

        </div>

        {/* CUSTOMER DETAILS */}
        <div className="bg-white rounded-[40px] p-10 mb-20">

          <h2 className="text-3xl font-bold mb-10">
            Customer Details
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="email"
              placeholder="Enter Gmail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

          </div>

        </div>

        {/* SUMMARY */}
        <div className="bg-black text-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Booking Summary
          </h2>

          <div className="grid gap-5 text-lg">

            <div className="flex justify-between">
              <span>Service</span>
              <span>
                {selectedService?.name || "Not Selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>
                {selectedDate || "Not Selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Time Slot</span>
              <span>
                {selectedSlot || "Not Selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Amount</span>
              <span>
                ₹{selectedService?.price || 0}
              </span>
            </div>

          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-white text-black py-5 rounded-full text-lg font-semibold mt-10 hover:scale-[1.01] transition"
          >
            Confirm Booking
          </button>

        </div>

      </div>

      {/* POPUP */}
      {
        showPopup && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">

            <div className="bg-white max-w-xl w-full rounded-[40px] p-10 text-center">

              <h2 className="text-5xl font-bold mb-6">
                Booking Confirmed 😎🔥
              </h2>

              <p className="text-xl mb-4">
                Order ID:
              </p>

              <h3 className="text-4xl font-bold mb-8">
                {orderId}
              </h3>

              <p className="text-neutral-600 mb-10 leading-8">
                Confirmation details will be received on your Gmail shortly.
              </p>

              <div className="flex flex-col md:flex-row gap-5">

                <a
                  href="/"
                  className="flex-1 bg-black text-white py-5 rounded-full"
                >
                  Back To Home
                </a>

                <a
                  href="/dashboard"
                  className="flex-1 bg-[#f7f1eb] py-5 rounded-full"
                >
                  Go To Dashboard
                </a>

              </div>

            </div>

          </div>

        )
      }

    </main>
  );
}