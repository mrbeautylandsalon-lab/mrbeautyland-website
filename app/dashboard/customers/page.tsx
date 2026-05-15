"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function CustomersPage() {

  const [customers, setCustomers] =
    useState<any[]>([]);

  async function loadCustomers() {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setCustomers(data || []);

  }

  useEffect(() => {

    loadCustomers();

  }, []);

  return (

    <div>

      {/* TOP */}

      <div className="mb-10">

        <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
          CRM
        </p>

        <h1 className="text-6xl font-bold">
          Customers 😎
        </h1>

      </div>

      {/* CUSTOMERS */}

      <div className="grid gap-6">

        {customers.map((customer) => (

          <div
            key={customer.id}
            className="bg-white rounded-[35px] p-8 shadow-sm"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              {/* LEFT */}

              <div>

                <h2 className="text-3xl font-bold mb-4">
                  {customer.customer_name}
                </h2>

                <div className="space-y-2 text-lg">

                  <p>
                    📞 {customer.phone}
                  </p>

                  <p>
                    ✉️ {customer.email}
                  </p>

                  <p>
                    ✂️ {customer.service}
                  </p>

                  <p>
                    ➕ {customer.addons}
                  </p>

                  <p>
                    💰 ₹{customer.total_amount}
                  </p>

                  <p>
                    💳 {customer.payment_status}
                  </p>

                  <p>
                    📌 {customer.booking_status}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="bg-[#f7f1eb] rounded-[30px] p-6 min-w-[250px]">

                <p className="text-zinc-500 mb-3">
                  Customer Insights
                </p>

                <div className="space-y-3">

                  <p>
                    ⭐ Loyalty:
                    120
                  </p>

                  <p>
                    💎 Premium Member
                  </p>

                  <p>
                    🔁 Repeat Customer
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}