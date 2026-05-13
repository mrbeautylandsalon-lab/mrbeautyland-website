"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

import { supabase } from "../supabase";

export default function AdminPage() {

  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);

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

    });

    return () => unsubscribe();

  }, []);

  return (

    <main className="min-h-screen bg-[#f7f1eb] p-5 md:p-10">

      <h1 className="text-3xl md:text-5xl font-bold mb-10">
        ADMIN PANEL
      </h1>

      <div className="grid gap-6">

        {
          bookings.map((booking) => (

            <div
              key={booking.id}
              className="bg-white p-6 rounded-[30px]"
            >

              <h2 className="text-2xl font-bold mb-2">
                {booking.name}
              </h2>

              <p className="mb-1">
                {booking.service}
              </p>

              <p className="mb-1">
                {booking.date} • {booking.time}
              </p>

              <p className="mb-1">
                {booking.mobile}
              </p>

              <p>
                {booking.email}
              </p>

            </div>

          ))
        }

      </div>

    </main>
  );
}
