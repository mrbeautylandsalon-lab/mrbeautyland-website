"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase.js";

export default function BookingsPage() {

  const [bookings, setBookings] = useState<any[]>([]);

  async function loadBookings() {

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    console.log(data);
    console.log(error);

    setBookings(data || []);
  }

  async function updateStatus(
    id: string,
    status: string
  ) {

    console.log("Updating:", id, status);

    const { data, error } = await supabase
      .from("bookings")
      .update({
        booking_status: status,
      })
      .eq("id", id)
      .select();

    console.log(data);
    console.log(error);

    if (error) {

      alert(error.message);

    } else {

      alert("Status Updated");

      loadBookings();

    }
  }

  useEffect(() => {

  loadBookings();

  const channel = supabase
    .channel("realtime-bookings")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookings",
      },
      () => {
        loadBookings();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };

}, []);
  return (

    <div>

      <h1 className="text-5xl font-bold mb-10 text-black">
        Bookings
      </h1>

      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-zinc-100 rounded-3xl p-8 shadow"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <h2 className="text-3xl font-bold">
                  {booking.customer_name}
                </h2>

                <p className="mt-2">
                  📞 {booking.phone}
                </p>

                <p>
                  ✂️ {booking.service}
                </p>

                <p>
                  💰 ₹{booking.amount}
                </p>

                <p className="mt-3 font-semibold">

                  Status:
                  {" "}

                  <span className="text-yellow-600">
                    {booking.booking_status}
                  </span>

                </p>

              </div>

              <div className="flex flex-wrap gap-3 h-fit">

                <button
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "Confirmed"
                    )
                  }
                  className="bg-green-500 text-white px-5 py-3 rounded-2xl"
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "Completed"
                    )
                  }
                  className="bg-blue-500 text-white px-5 py-3 rounded-2xl"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "Cancelled"
                    )
                  }
                  className="bg-red-500 text-white px-5 py-3 rounded-2xl"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}