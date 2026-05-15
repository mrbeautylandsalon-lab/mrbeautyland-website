"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { supabase } from "../supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [tillNowRevenue, setTillNowRevenue] =
    useState(0);

  async function loadRevenue() {

    const { data } =
      await supabase
        .from("bookings")
        .select("*");

    const totalRevenue =
      data?.reduce(
        (acc, item) =>
          acc +
          Number(
            item.total_amount || 0
          ),
        0
      ) || 0;

    setTillNowRevenue(
      totalRevenue
    );

  }

  useEffect(() => {

    loadRevenue();

  }, []);

  return (

    <div className="flex min-h-screen bg-[#f7f1eb] text-black">

      {/* SIDEBAR */}

      <div className="w-[300px] bg-black text-white p-6 flex flex-col justify-between">

        <div>

          {/* LOGO */}

          <div className="flex items-center gap-4 mb-12">

            <Image
              src="/images/logo.png"
              alt="logo"
              width={70}
              height={70}
              className="rounded-full"
            />

            <div>

              <h1 className="text-2xl font-bold leading-tight text-white">

                MR BEAUTY LAND

              </h1>

              <p className="text-zinc-400 text-sm">

                Luxury Salon OS

              </p>

            </div>

          </div>

          {/* MENU */}

          <div className="space-y-4">

            <Link
              href="/dashboard"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Overview
            </Link>

            <Link
              href="/dashboard/walkin-pay"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Walk-In Pay System
            </Link>

            <Link
              href="/dashboard/bookings"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Bookings
            </Link>

            <Link
              href="/dashboard/customers"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Customers
            </Link>

            <Link
              href="/dashboard/staff"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Staff
            </Link>

            <Link
              href="/dashboard/attendance"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Attendance
            </Link>

            <Link
              href="/dashboard/payments"
              className="block bg-white text-black hover:bg-[#e5cfaa] transition p-5 rounded-3xl"
            >
              Payments
            </Link>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="bg-white text-black rounded-3xl p-6">

          <p className="text-zinc-500 text-sm mb-3">

            Till Now Revenue

          </p>

          <h2 className="text-5xl font-bold">

            ₹{tillNowRevenue}

          </h2>

          <p className="text-zinc-500 mt-4 text-sm">

            Total salon earnings

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10 overflow-auto text-black">

        {children}

      </div>

    </div>

  );

}