"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase.js";

export default function RevenuePage() {

  const [revenue, setRevenue] = useState(0);

  async function loadRevenue() {

    const { data } = await supabase
      .from("bookings")
      .select("*");

    const total =
      data?.reduce(
        (acc, item) =>
          acc + Number(item.amount || 0),
        0
      ) || 0;

    setRevenue(total);
  }

  useEffect(() => {
    loadRevenue();
  }, []);

  return (
    <div>

      <h1 className="text-5xl font-bold mb-10">
        Revenue
      </h1>

      <div className="bg-yellow-500 text-black p-10 rounded-3xl">

        <h2 className="text-2xl">
          Total Revenue
        </h2>

        <p className="text-6xl font-bold mt-4">
          ₹{revenue}
        </p>

      </div>

    </div>
  );
}