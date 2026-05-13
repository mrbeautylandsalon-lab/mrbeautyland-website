"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

import { supabase } from "../supabase";

export default function AdminPage() {

  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {

        router.push("/login");

        return;

      }

      if (user.email !== "mrbeautylandsalon@gmail.com") {

        router.push("/");

        return;

      }

      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("id", { ascending: false });

      if (data) {

        setBookings(data);

      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );

  };

  return (

    <main className="min-h-screen bg-[#f7f1eb] text-black p-5 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-3">
            MR BEAUTYLAND
          </p>

          <h1 className="text-3xl md:text-5xl font-bold">
            Admin Dashboard
          </h1>

        </div>

        <button
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
          className="bg-black text-white px-6 py-4 rounded-full"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-[30px] p-8">

          <p className="text-neutral-500 mb-3">
            Total Bookings
          </p>

          <h2 className="text-5xl font-bold">
            {bookings.length}
          </h2>

        </div>

        <div className="bg-white rounded-[30px] p-8">

          <p className="text-neutral-500 mb-3">
            Confirmed
          </p>

          <h2 className="text-5xl font-bold">
            {
              bookings.filter(
                (b) => b.status === "Confirmed"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-[30px] p-8">

          <p className="text-neutral-500 mb-3">
            Pending
          </p>

          <h2 className="text-5xl font-bold">
            {
              bookings.filter(
                (b) => b.status === "Pending"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* BOOKINGS */}
      <div className="grid gap-6">

        {
          loading ? (

            <div className="text-xl font-medium">
              Loading Bookings...
            </div>

          ) : bookings.length === 0 ? (

            <div className="bg-white rounded-[30px] p-10 text-center text-xl">
              No Bookings Found
            </div>

          ) : (

            bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white text-black rounded-[35px] p-6 md:p-8"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* LEFT */}
                  <div className="grid gap-3">

                    <h2 className="text-2xl md:text-3xl font-bold">
                      {booking.name}
                    </h2>

                    <p className="text-neutral-600">
                      {booking.service}
                    </p>

                    <p className="text-neutral-600">
                      {booking.date} • {booking.time}
                    </p>

                    <p className="text-neutral-600">
                      {booking.mobile}
                    </p>

                    <p className="text-neutral-600 break-all">
                      {booking.email}
                    </p>

                    <p className="font-semibold">
                      ₹{booking.amount}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col gap-4">

                    <span
                      className={`px-5 py-3 rounded-full text-center font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>

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
                          "Cancelled"
                        )
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-full"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </div>

            ))

          )
        }

      </div>

    </main>
  );
}