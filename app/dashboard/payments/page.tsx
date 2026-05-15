"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function PaymentsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [onlineRevenue, setOnlineRevenue] =
    useState(0);

  const [walkinRevenue, setWalkinRevenue] =
    useState(0);

  async function loadPayments() {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        selectedDate
      )
      .order("created_at", {
        ascending: false,
      });

    setBookings(data || []);

    /* ONLINE REVENUE */

    const online =
      data
        ?.filter(
          (item) =>
            item.booking_type ===
            "Online"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(
              item.total_amount || 0
            ),
          0
        ) || 0;

    setOnlineRevenue(
      online
    );

    /* WALK-IN REVENUE */

    const walkin =
      data
        ?.filter(
          (item) =>
            item.booking_type ===
            "Walk-In"
        )
        .reduce(
          (acc, item) =>
            acc +
            Number(
              item.total_amount || 0
            ),
          0
        ) || 0;

    setWalkinRevenue(
      walkin
    );

  }

  useEffect(() => {

    loadPayments();

  }, [selectedDate]);

  return (

    <div>

      {/* TOP */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
            Revenue Analytics
          </p>

          <h1 className="text-6xl font-bold">
            Payments 😎
          </h1>

        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="bg-white px-6 py-4 rounded-2xl shadow-sm"
        />

      </div>

      {/* TOP CARDS */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* ONLINE */}

        <div className="bg-black text-white p-10 rounded-[35px] shadow-sm">

          <p className="text-zinc-400 mb-4 text-xl">
            Online Revenue
          </p>

          <h2 className="text-6xl font-bold">
            ₹{onlineRevenue}
          </h2>

        </div>

        {/* WALKIN */}

        <div className="bg-[#e5cfaa] p-10 rounded-[35px] shadow-sm">

          <p className="text-black/70 mb-4 text-xl">
            Walk-In Revenue
          </p>

          <h2 className="text-6xl font-bold">
            ₹{walkinRevenue}
          </h2>

        </div>

      </div>

      {/* PAYMENTS */}

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
                    💰 ₹{booking.total_amount}
                  </p>

                  <p>
                    💳 {booking.payment_status}
                  </p>

                  <p>
                    📅 {booking.booking_date}
                  </p>

                  <p>
                    🧾 {booking.booking_type}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="h-fit bg-black text-white px-6 py-4 rounded-2xl">

                {booking.payment_mode}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}