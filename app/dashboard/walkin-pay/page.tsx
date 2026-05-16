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

  const [addons, setAddons] =
    useState<any[]>([]);

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

  useEffect(() => {

    loadBookings();

  }, []);

const SERVICES = {

"MEN SERVICES": [


{ name: "Haircut", price: 250 },
{ name: "Beard", price: 150 },
{ name: "Regular D-Tan", price: 400 },
{ name: "O3+ D-Tan", price: 500 },
{ name: "Threading", price: 50 },
{ name: "Hair Curly", price: 2000 },
{ name: "Hair Color Matrix", price: 500 },
{ name: "Hair Color Loreal", price: 600 },
{ name: "Gel Color", price: 400 },
{ name: "Smoothing", price: 3000 },
{ name: "Keratin", price: 2500 },
{ name: "Hair Straightening", price: 3500 },
{ name: "Fruit Cleanup", price: 600 },
{ name: "Oxy Cleanup", price: 800 },
{ name: "O3+ Cleanup", price: 1000 },
{ name: "Scrub", price: 200 },
{ name: "Berina Spa", price: 600 },
{ name: "Loreal Spa", price: 1000 },
{ name: "Bleach", price: 500 },
{ name: "Hair Wash", price: 200 },
{ name: "Head Massage", price: 250 },
{ name: "Bean Wax", price: 500 },
{ name: "Milk Wax", price: 2000 },
{ name: "Rica Wax", price: 2500 },
{ name: "Manicure", price: 500 },
{ name: "Pedicure", price: 500 },


],

"THREADING SERVICES": [


{ name: "Eyebrows", price: 30 },
{ name: "Upper Lips", price: 20 },
{ name: "Forehead", price: 20 },
{ name: "Chin", price: 20 },
{ name: "Side Locks", price: 40 },
{ name: "Full Face", price: 150 },


],

"NORMAL WAX SERVICES": [


{ name: "Eyebrow Wax", price: 60 },
{ name: "Upper Lips Wax", price: 50 },
{ name: "Forehead Wax", price: 80 },
{ name: "Chin Wax", price: 50 },
{ name: "Side Lock Wax", price: 100 },
{ name: "Full Face Wax", price: 400 },
{ name: "Nose Wax", price: 50 },


],

"HONEY WAX SERVICES": [


{ name: "Arms Wax", price: 100 },
{ name: "Underarms", price: 50 },
{ name: "Half Legs", price: 150 },
{ name: "Full Legs", price: 300 },
{ name: "Tummy", price: 150 },
{ name: "Half Back", price: 150 },
{ name: "Full Back", price: 300 },
{ name: "Bikini Wax", price: 600 },
{ name: "Full Body Wax", price: 1200 },


],

"MILK WAX SERVICES": [


{ name: "Milk Arms Wax", price: 250 },
{ name: "Milk Underarms", price: 70 },
{ name: "Milk Half Legs", price: 300 },
{ name: "Milk Full Legs", price: 500 },
{ name: "Milk Tummy", price: 200 },
{ name: "Milk Half Back", price: 200 },
{ name: "Milk Full Back", price: 400 },
{ name: "Milk Bikini Wax", price: 800 },
{ name: "Body Wax", price: 1500 },


],

"RICA WAX SERVICES": [


{ name: "Rica Arms Wax", price: 400 },
{ name: "Rica Underarms", price: 100 },
{ name: "Rica Half Legs", price: 400 },
{ name: "Rica Full Legs", price: 700 },
{ name: "Rica Tummy", price: 300 },
{ name: "Rica Half Back", price: 300 },
{ name: "Rica Full Back", price: 500 },
{ name: "Rica Bikini Wax", price: 1000 },
{ name: "Rica Full Body Wax", price: 2000 },


],

"FACIAL SERVICES": [


{ name: "Fruit Facial", price: 800 },
{ name: "Oxy Life Facial", price: 1500 },
{ name: "Aroma Magic Facial", price: 1200 },
{ name: "O3+ Bridal Facial", price: 2000 },
{ name: "Korean Glass Skin Facial", price: 2500 },
{ name: "Kanpeki Facial", price: 2500 },


],

"MANICURE SERVICES": [


{ name: "Basic Manicure", price: 500 },
{ name: "Spa Manicure", price: 700 },


],

"PEDICURE SERVICES": [


{ name: "Basic Pedicure", price: 600 },
{ name: "Spa Pedicure", price: 800 },


],

"BLEACH SERVICES": [


{ name: "Full Face & Neck", price: 500 },
{ name: "Full Arms", price: 500 },
{ name: "Half Legs Bleach", price: 300 },
{ name: "Full Legs Bleach", price: 600 },
{ name: "Half Back Bleach", price: 400 },
{ name: "Full Back Bleach", price: 600 },
{ name: "Body Bleach", price: 2000 },


],

"D-TAN SERVICES": [


{ name: "Ragga D-Tan", price: 500 },
{ name: "O3+ D-Tan Premium", price: 600 },


],

"BODY POLISHING": [


{ name: "Body Polishing", price: 2000 },


],

"HAIR SERVICES": [


{ name: "Hair Wash Premium", price: 200 },
{ name: "Loreal Wash", price: 250 },
{ name: "Blow Dry", price: 300 },
{ name: "Haircut Women", price: 500 },
{ name: "Normal Trim", price: 200 },
{ name: "Temporary Ironing", price: 500 },
{ name: "Curls", price: 500 },
{ name: "Crimping", price: 500 },
{ name: "Keratin Shoulder", price: 1500 },
{ name: "Botox", price: 2500 },
{ name: "Nanoplastia", price: 3000 },
{ name: "Women Smoothing", price: 2500 },
{ name: "Matrix Spa", price: 800 },
{ name: "Wella Spa", price: 1200 },
{ name: "Head Massage Without Wash", price: 300 },
{ name: "Head Massage With Wash", price: 500 },


],

"BEAUTY PACKAGES": [


{ name: "Package 1", price: 499 },
{ name: "Package 2", price: 699 },
{ name: "Package 3", price: 799 },
{ name: "Package 4", price: 999 },


],

};
const transferReferralPoints =
  async (
    booking: any
  ) => {

    const reward = 50;

    const servicePoints =
      Math.floor(
        Number(
          booking.total_amount || 0
        ) / 100
      ) * 5;

    const { data: referrer } =
      await supabase
        .from("customers")
        .select("*")
        .eq(
          "email",
          booking.referred_by
        )
        .single();

    const { data: friend } =
      await supabase
        .from("customers")
        .select("*")
        .eq(
          "email",
          booking.email
        )
        .single();

    if (referrer) {

      await supabase
        .from("customers")
        .update({

          loyalty_points:
            (
              referrer.loyalty_points || 0
            ) + reward,

        })
        .eq(
          "email",
          booking.referred_by
        );

    }

    if (friend) {

      await supabase
        .from("customers")
        .update({

          loyalty_points:
            (
              friend.loyalty_points || 0
            ) +
            reward +
            servicePoints,

        })
        .eq(
          "email",
          booking.email
        );

    }

    alert(
      "Referral Rewards Added 😎🔥"
    );

  };

  async function markAsPaid(
    booking: any
  ) {

    const finalAmount =
      Number(
        booking.total_amount || 0
      ) +
      Number(
        addonPrice || 0
      ) -
      Number(
        discount || 0
      );

    const earnedPoints =
      Math.floor(
        finalAmount / 100
      ) * 5;

    await supabase
      .from("bookings")
      .update({

        payment_status:
          "Paid",

        total_amount:
          finalAmount,

        addons:
          addons
            .map(
              (item) =>
                item.name
            )
            .join(", "),

        loyalty_points:
          earnedPoints,

      })
      .eq(
        "id",
        booking.id
      );

    alert(
      "Payment Received 😎🔥"
    );

    loadBookings();

  }

  function sendPaymentLink(
    booking: any
  ) {

    const finalAmount =
      Number(
        booking.total_amount || 0
      ) +
      Number(
        addonPrice || 0
      ) -
      Number(
        discount || 0
      );

    const message = `✨ MR BEAUTY LAND ✨

Hello ${booking.customer_name} 👋
{booking.referred_by && (

  <div className="mt-4 flex flex-wrap gap-4">

    <div className="bg-[#e5cfaa] text-black px-5 py-3 rounded-full">

      🎁 Referred Booking

    </div>

    <button
      onClick={() =>
        transferReferralPoints(
          booking
        )
      }
      className="bg-black text-white px-6 py-3 rounded-full"
    >

      Transfer Referral Rewards

    </button>

  </div>

)}
Service:
${booking.service}

Addons:
${addons
  .map(
    (item) =>
      item.name
  )
  .join(", ")}

Discount:
₹${discount}

Final Total:
₹${finalAmount}

Please complete your payment 😎🔥`;

    const whatsappUrl =
      `https://wa.me/91${booking.phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl
    );

  }

  return (

    <div className="p-8">

      <div className="mb-10">

        <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
          Reception Billing
        </p>

        <h1 className="text-6xl font-bold">
          Walk-In Pay System 😎
        </h1>

      </div>

      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white rounded-[35px] p-8 shadow-sm"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div className="space-y-4">

                <h2 className="text-3xl font-bold">
                  {booking.customer_name}
                </h2>

                <p>
                  📞 {booking.phone}
                </p>

                <p>
                  ✉️ {booking.email}
                  {booking.referred_by && (

  <div className="mt-4">

    <div className="bg-[#e5cfaa] text-black px-5 py-3 rounded-full inline-block mb-4">

      🎁 Referred Booking

    </div>

    <button
      onClick={() =>
        transferReferralPoints(
          booking
        )
      }
      className="bg-black text-white px-6 py-3 rounded-full"
    >

      Transfer Referral Rewards

    </button>

  </div>

)}
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

                <div className="text-2xl font-bold">

                  💰 ₹{
                    Number(
                      booking.total_amount || 0
                    ) +
                    Number(
                      addonPrice || 0
                    ) -
                    Number(
                      discount || 0
                    )
                  }

                </div>

                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Search Addon..."
                    list="all-addon-services"
                    className="bg-[#f7f1eb] p-5 rounded-3xl outline-none w-full text-black"
                    onChange={(e) => {

                      const selected =
                        Object.values(
                          SERVICES
                        )
                          .flat()
                          .find(
                            (item) =>
                              e.target.value.includes(
                                item.name
                              )
                          );

                      if (!selected)
                        return;

                      if (
                        !addons.find(
                          (addon) =>
                            addon.name ===
                            selected.name
                        )
                      ) {

                        setAddons([
                          ...addons,
                          selected,
                        ]);

                        setAddonPrice(
                          (prev) =>
                            prev +
                            selected.price
                        );

                      }

                    }}
                  />

                  <datalist id="all-addon-services">

                    {Object.values(
                      SERVICES
                    )
                      .flat()
                      .map((item, index) => (

                        <option
                          key={`${item.name}-${item.price}-${Math.random()}`}
                          value={`${item.name} - ₹${item.price}`}
                        />

                      ))}

                  </datalist>

                  <div className="flex flex-wrap gap-2">

                    {addons.map((item) => (

                      <div
                        key={item.name}
                        className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
                      >

                        <span>
                          {item.name}
                        </span>

                        <button
                          onClick={() => {

                            setAddons(
                              addons.filter(
                                (addon) =>
                                  addon.name !==
                                  item.name
                              )
                            );

                            setAddonPrice(
                              (prev) =>
                                prev -
                                item.price
                            );

                          }}
                          className="text-red-400"
                        >

                          X

                        </button>

                      </div>

                    ))}

                  </div>

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

                <p>
                  💳 {booking.payment_status}
                </p>

              </div>

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