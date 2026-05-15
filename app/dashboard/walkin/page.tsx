"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";
import html2canvas from "html2canvas";

import LuxuryInvoice from "../../../components/LuxuryInvoice";

export default function WalkinPage() {

  const [customerName, setCustomerName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [gender, setGender] = useState("");

  const [service, setService] = useState("");

  const [addons, setAddons] = useState("");

  const [assignedStaff, setAssignedStaff] = useState("");

  const [paymentMode, setPaymentMode] = useState("Cash");

  const [bookingDate, setBookingDate] = useState("");

  const [bookingTime, setBookingTime] = useState("");

  const [amount, setAmount] = useState(0);

  const [addonAmount, setAddonAmount] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);
const [selectedBooking, setSelectedBooking] =
  useState<any>(null);
  useEffect(() => {

    setTotalAmount(
      Number(amount) + Number(addonAmount)
    );

  }, [amount, addonAmount]);

  async function createWalkinBooking() {
function sendPaymentLink() {

  const message = `Hi 👋

Your MR BEAUTY LAND booking is ready ✨

Service: ${service}

Total Amount: ₹${totalAmount}

Payment Mode: ${paymentMode}

Please complete your payment 😎`;

  const whatsappUrl =
    `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl);

}
    const { error } = await supabase
      .from("bookings")
      .insert([

        {
          customer_name: customerName,
          phone,
          email,
          gender,
          service,
          addons,
          assigned_staff: assignedStaff,
          payment_status: "Pending",
          payment_mode: paymentMode,
          booking_status: "Walk-In",
          booking_date: bookingDate,
          booking_time: bookingTime,
          amount,
          addon_amount: addonAmount,
          total_amount: totalAmount,
        },

      ]);

    if (error) {

      alert(error.message);

      return;
    }

    alert("Walk-In Booking Created 😎🔥");

    setCustomerName("");
    setPhone("");
    setEmail("");
    setGender("");
    setService("");
    setAddons("");
    setAssignedStaff("");
    setBookingDate("");
    setBookingTime("");
    setAmount(0);
    setAddonAmount(0);
    setTotalAmount(0);
  }

  return (

    <div>

      {/* TOP */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
            Reception Panel
          </p>

          <h1 className="text-6xl font-bold">
            Walk-In POS 😎
          </h1>

        </div>

        <button className="bg-black text-white px-8 py-4 rounded-full">
          Live Queue
        </button>

      </div>

      {/* FORM */}

      <div className="bg-white rounded-[40px] p-10 shadow-sm">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

          <select
            value={service}
            onChange={(e) => {

              setService(e.target.value);

              if (
                e.target.value === "Hair Cut"
              ) {
                setAmount(199);
              }

              if (
                e.target.value === "Hair Spa"
              ) {
                setAmount(799);
              }

              if (
                e.target.value === "Facial"
              ) {
                setAmount(599);
              }

            }}
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option>
              Select Service
            </option>

            <option>
              Hair Cut
            </option>

            <option>
              Hair Spa
            </option>

            <option>
              Facial
            </option>

          </select>

          <select
            value={addons}
            onChange={(e) => {

              setAddons(e.target.value);

              if (
                e.target.value === "Hair Wash"
              ) {
                setAddonAmount(99);
              }

              if (
                e.target.value === "Massage"
              ) {
                setAddonAmount(299);
              }

            }}
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option>
              Select Addon
            </option>

            <option>
              Hair Wash
            </option>

            <option>
              Massage
            </option>

          </select>

          <input
            type="text"
            placeholder="Assigned Staff"
            value={assignedStaff}
            onChange={(e) =>
              setAssignedStaff(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <select
            value={paymentMode}
            onChange={(e) =>
              setPaymentMode(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option>
              Cash
            </option>

            <option>
              UPI
            </option>

            <option>
              Card
            </option>

            <option>
              Pending
            </option>

          </select>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <input
            type="time"
            value={bookingTime}
            onChange={(e) =>
              setBookingTime(e.target.value)
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

        </div>

        {/* TOTAL */}

        <div className="mt-10 bg-black text-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-6">
            Billing Summary
          </h2>

          <div className="space-y-4 text-xl">

            <p>
              Service Amount:
              ₹{amount}
            </p>

            <p>
              Addon Amount:
              ₹{addonAmount}
            </p>

            <p className="text-5xl font-bold mt-6">
              Total:
              ₹{totalAmount}
            </p>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-4 mt-10">

          <button
  onClick={createWalkinBooking}
  className="bg-black text-white px-8 py-5 rounded-full"
          >
            Create Walk-In Booking
          </button>

          <button
            className="bg-[#e5cfaa] px-8 py-5 rounded-full"
          >
            Send Payment Link
          </button>

          <button
            className="bg-green-500 text-white px-8 py-5 rounded-full"
          >
            WhatsApp Customer
          </button>

        </div>

      </div>

    </div>

  );
}