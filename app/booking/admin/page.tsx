"use client";

import { useEffect, useState } from "react";

import { supabase } from "../supabase";

export default function AdminPage() {

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchBookings();

    const channel = supabase
      .channel("admin-bookings")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },

        () => {

          fetchBookings();

        }
      )

      .subscribe();

    return () => {

      supabase.removeChannel(channel);

    };

  }, []);

  const fetchBookings = async () => {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setBookings(data);

    }

    setLoading(false);

  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    fetchBookings();

  };

  const deleteBooking = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    fetchBookings();

  };

  return (

    <main className="min-h-screen bg-[#f7f1eb] p-5 md:p-10 text-black">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-3">
            Admin Panel
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            MR BEAUTYLAND
          </h1>

        </div>

        <div className="bg-black text-white px-8 py-4 rounded-full text-lg">
          Total Bookings: {bookings.length}
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-[30px] p-6">

          <p className="text-neutral-500 mb-2">
            Total
          </p>

          <h2 className="text-4xl font-bold">
            {bookings.length}
          </h2>

        </div>

        <div className="bg-black text-white rounded-[30px] p-6">

          <p className="text-neutral-300 mb-2">
            Confirmed
          </p>

          <h2 className="text-4xl font-bold">
            {
              bookings.filter(
                (b) => b.status === "Confirmed"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-[30px] p-6">

          <p className="text-neutral-500 mb-2">
            Pending
          </p>

          <h2 className="text-4xl font-bold">
            {
              bookings.filter(
                (b) => b.status === "Pending"
              ).length
            }
          </h2>

        </div>

        <div className="bg-gradient-to-br from-[#d6b98c] to-[#f1dfc2] rounded-[30px] p-6">

          <p className="text-black/70 mb-2">
            Cancelled
          </p>

          <h2 className="text-4xl font-bold">
            {
              bookings.filter(
                (b) => b.status === "Cancelled"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* EXTRA STATS */}
      <div className="bg-white rounded-[35px] p-5 md:p-8 mb-10">

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-[#f7f1eb] rounded-[25px] p-6">

            <p className="text-neutral-500 mb-2">
              Total Revenue
            </p>

            <h2 className="text-4xl font-bold">
              ₹
              {
                bookings.reduce(
                  (acc, item) =>
                    acc + Number(item.amount || 0),
                  0
                )
              }
            </h2>

          </div>

          <div className="bg-black text-white rounded-[25px] p-6">

            <p className="text-neutral-300 mb-2">
              Today's Bookings
            </p>

            <h2 className="text-4xl font-bold">
              {
                bookings.filter(
                  (b) =>
                    b.date ===
                    new Date()
                      .toISOString()
                      .split("T")[0]
                ).length
              }
            </h2>

          </div>

          <div className="bg-[#f7f1eb] rounded-[25px] p-6">

            <p className="text-neutral-500 mb-3">
              Search Booking
            </p>

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white px-5 py-4 rounded-2xl outline-none"
            />

          </div>

        </div>

      </div>

      {/* BOOKINGS */}
      <div className="bg-white rounded-[35px] p-5 md:p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl md:text-4xl font-bold">
            Live Bookings
          </h2>

        </div>

        {
          loading ? (

            <p>
              Loading...
            </p>

          ) : (

            <div className="grid gap-5">

              {
                bookings
                  .filter((booking) =>
                    booking.name
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((booking) => (

                    <div
                      key={booking.id}
                      className="border border-neutral-200 rounded-[25px] p-5 md:p-6"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className="grid gap-2">

                          <h3 className="text-2xl font-bold">
                            {booking.name}
                          </h3>

                          <p className="text-lg">
                            {booking.service}
                          </p>

                          <p className="text-neutral-500">
                            {booking.date} • {booking.time}
                          </p>

                          <p className="text-neutral-500">
                            {booking.mobile}
                          </p>

                          <p className="text-neutral-500 break-all">
                            {booking.email}
                          </p>

                          <div className="mt-2">

                            <span
                              className={`px-4 py-2 rounded-full text-sm ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {booking.status}
                            </span>

                          </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                          <button
                            onClick={() =>
                              updateStatus(
                                booking.id,
                                "Confirmed"
                              )
                            }
                            className="bg-black text-white px-5 py-3 rounded-full"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                booking.id,
                                "Pending"
                              )
                            }
                            className="bg-[#f7f1eb] px-5 py-3 rounded-full"
                          >
                            Pending
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                booking.id,
                                "Cancelled"
                              )
                            }
                            className="bg-red-500 text-white px-5 py-3 rounded-full"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() =>
                              deleteBooking(
                                booking.id
                              )
                            }
                            className="bg-black text-white px-5 py-3 rounded-full"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  ))
              }

            </div>

          )
        }

      </div>

    </main>
  );
}