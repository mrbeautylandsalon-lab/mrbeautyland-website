"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function WalkinPayPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);
const [discount, setDiscount] =
  useState(0);

const [couponCode, setCouponCode] =
  useState("");

const [selectedAddon, setSelectedAddon] =
  useState("");

const [addonPrice, setAddonPrice] =
  useState(0);
  async function loadBookings() {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setBookings(data || []);

  }

  async function markAsPaid(
    booking: any
  ) {

    const loyaltyPoints =
      Math.floor(
        Number(
          booking.total_amount
        ) / 100
      );

    const { error } =
      await supabase
        .from("bookings")
        .update({

          payment_status:
            "Paid",

          loyalty_points:
            loyaltyPoints,

        })
        .eq(
          "id",
          booking.id
        );

    if (error) {

      alert(
        error.message
      );

      return;

    }

    const finalAmount =
  Number(
    booking.total_amount
  ) +
  addonPrice -
  discount;

const message = `Hi ${booking.customer_name} 👋

Your updated MR BEAUTY LAND bill is ready ✨

Service:
${booking.service}

Addon:
${selectedAddon}

Discount:
₹${discount}

Final Amount:
₹${finalAmount}

Please complete your payment 😎🔥`;

    const whatsappUrl =
      `https://wa.me/91${booking.phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl
    );

    alert(
      "Payment Updated 😎🔥"
    );

    loadBookings();

  }

  function sendPaymentLink(
    booking: any
  ) {

    const message = `Hi 👋

Your MR BEAUTY LAND bill is ready ✨

Service:
${booking.service}

Addons:
${booking.addons}

Total:
₹${booking.total_amount}

Please complete your payment 😎`;

    const whatsappUrl =
      `https://wa.me/91${booking.phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl
    );

  }

  useEffect(() => {

    loadBookings();

  }, []);

  return (

    <div>

      {/* TOP */}

      <div className="mb-10">

        <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
          Reception Billing
        </p>

        <h1 className="text-6xl font-bold">
          Walk-In Pay System 😎
        </h1>

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
                    📞 {booking.phone}
                  </p>

                  <p>
                    ✉️ {booking.email}
                  </p>

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
                    💰 ₹{
  Number(
    booking.total_amount
  ) +
  addonPrice -
  discount
}
                    <div className="mt-5 space-y-4">

  <select
    value={selectedAddon}
    onChange={(e) => {

      const addon =
        e.target.value;

      setSelectedAddon(addon);

      if (
        addon ===
        "Beard Styling"
      ) {

        setAddonPrice(149);

      }

      if (
        addon ===
        "Hair Wash"
      ) {

        setAddonPrice(99);

      }

      if (
        addon ===
        "Premium Serum"
      ) {

        setAddonPrice(299);

      }

    }}
    className="bg-[#f7f1eb] p-4 rounded-2xl w-full"
  >

    <option>
      Select Addon
    </option>

    <option>
      Beard Styling
    </option>

    <option>
      Hair Wash
    </option>

    <option>
      Premium Serum
    </option>

  </select>

  <input
    type="text"
    placeholder="Coupon Code"
    value={couponCode}
    onChange={(e) => {

      const code =
        e.target.value;

      setCouponCode(code);

      if (
        code ===
        "VIP50"
      ) {

        setDiscount(50);

      }

      else if (
        code ===
        "FLAT100"
      ) {

        setDiscount(100);

      }

      else {

        setDiscount(0);

      }

    }}
    className="bg-[#f7f1eb] p-4 rounded-2xl w-full"
  />

  <input
    type="number"
    placeholder="Custom Discount ₹"
    onChange={(e) => {

      setDiscount(
        Number(
          e.target.value
        )
      );

    }}
    className="bg-[#f7f1eb] p-4 rounded-2xl w-full"
  />

</div>
                  </p>

                  <p>
                    💳 {booking.payment_status}
                  </p>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 h-fit">

                {booking.payment_status ===
                "Pending" && (

                  <>

                    <button
                      onClick={() =>
                        sendPaymentLink(
                          booking
                        )
                      }
                      className="bg-[#e5cfaa] px-6 py-4 rounded-2xl"
                    >
                      Send Payment Link
                      
                    </button>
onClick={() =>
  sendPaymentLink(
    booking
  )
}
                    <button
                      onClick={() =>
                        markAsPaid(
                          booking
                        )
                      }
                      className="bg-green-500 text-white px-6 py-4 rounded-2xl"
                    >
                      Payment Done
                    </button>

                  </>

                )}

                {booking.payment_status ===
                "Paid" && (

                  <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-semibold">

                    Payment Received ✅

                  </div>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}