"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function LiveQueuePage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  async function updateBookingStatus(
    id: string,
    status: string
  ) {

    const { error } = await supabase
      .from("bookings")
      .update({
        booking_status: status,
      })
      .eq("id", id);

    if (error) {

      alert(error.message);

      return;

    }

    loadBookings();

  }

  async function loadBookings() {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        new Date()
          .toISOString()
          .split("T")[0]
      )
      .order("created_at", {
        ascending: false,
      });

    setBookings(data || []);

  }

  useEffect(() => {

    loadBookings();

  }, []);

  return (

    <div>

      {/* TOP */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
            Realtime Queue
          </p>

          <h1 className="text-6xl font-bold">
            Live Queue 😎
          </h1>

        </div>

      </div>

      {/* BOOKINGS */}

      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white rounded-[35px] p-8 shadow-sm"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              {/* LEFT */}

              <div>

                <h2 className="text-3xl font-bold mb-4">
                  {booking.customer_name}
                </h2>

                <div className="space-y-2 text-lg">

                  <p>
                    ✂️ {booking.service}
                  </p>

                  <p>
                    ➕ {booking.addons}
                  </p>

                  <p>
                    👨‍🔧 {booking.assigned_staff}
                  </p>

                  <p>
                    💰 ₹{booking.total_amount}
                  </p>

                  <p>
                    💳 {booking.payment_status}
                  </p>

                  <p>
                    📌 {booking.booking_status}
                  </p>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 h-fit">

                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.id,
                      "In Service"
                    )
                  }
                  className="bg-green-500 text-white px-6 py-4 rounded-2xl"
                >
                  In Service
                </button>

                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.id,
                      "Completed"
                    )
                  }
                  className="bg-black text-white px-6 py-4 rounded-2xl"
                >
                  Completed
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}