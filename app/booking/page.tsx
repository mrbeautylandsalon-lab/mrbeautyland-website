"use client";
export const dynamic =
  "force-dynamic";
import {
  Suspense,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import { supabase } from "../supabase";

function BookingContent() {

  const searchParams =
    useSearchParams();
const referralCode =
  searchParams.get("ref");

  const preselectedService =
    searchParams.get("service");

  const SERVICES = {

  "MEN SERVICES": [

    { name: "Mens Haircut", price: 250 },
    { name: "Beard Trim", price: 150 },
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
  const slots = [

    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",

  ];

  const [selectedServices, setSelectedServices] =
    useState<any[]>([]);
const [activeCategory, setActiveCategory] =
  useState("MEN SERVICES");
  const [search, setSearch] =
  useState("");
  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [name, setName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Pay At Store");

  const [loyaltyPoints, setLoyaltyPoints] =
    useState(0);

  const [claimPoints, setClaimPoints] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [earnedPoints, setEarnedPoints] =
    useState(0);

  const [bookedSlots, setBookedSlots] =
    useState<string[]>([]);
const referralLink =
  `https://mrbeautyland.in/booking?ref=${email}`;
  useEffect(() => {

    if (
      preselectedService
    ) {

      const allServices =
        Object.values(
          SERVICES
        ).flat();

      const found =
        allServices.find(
          (item: any) =>
            item.name ===
            preselectedService
        );

      if (found) {

        setSelectedServices([
          found,
        ]);

      }

    }

  }, [preselectedService]);

  useEffect(() => {

    if (!email) return;

    const fetchUser =
      async () => {

        const { data } =
          await supabase
            .from("customers")
            .select(
              "loyalty_points"
            )
            .eq(
  "email",
  email
)
            .single();

        if (data) {

          setLoyaltyPoints(
            data.loyalty_points || 0
          );

        } else {

          setLoyaltyPoints(0);

        }

      };

    fetchUser();

  }, [email]);

  useEffect(() => {

    if (!selectedDate)
      return;

    const fetchSlots =
      async () => {

        const { data } =
          await supabase
            .from("bookings")
           .select(
  "time"
)
.eq(
  "date",
  selectedDate
);

        if (data) {

          setBookedSlots(
            data.map(
              (item: any) =>
                item.time
            )
          );

        }

      };

    fetchSlots();

  }, [selectedDate]);

  const toggleService =
    (service: any) => {

      const exists =
        selectedServices.find(
          (item) =>
            item.name ===
            service.name
        );

      if (exists) {

        setSelectedServices(

          selectedServices.filter(
            (item) =>
              item.name !==
              service.name
          )

        );

      } else {

        setSelectedServices([
          ...selectedServices,
          service,
        ]);

      }

    };

  const totalAmount =
    selectedServices.reduce(
      (acc, item) =>
        acc + item.price,
      0
    );

  const finalAmount =
    claimPoints
      ? Math.max(
          totalAmount -
            loyaltyPoints,
          0
        )
      : totalAmount;

  const calculatedPoints =
    Math.floor(
      finalAmount / 100
    ) * 5;

  const handleBooking =
    async () => {

      if (
        !selectedServices.length ||
        !selectedDate ||
        !selectedSlot ||
        !name ||
        !mobile ||
        !email
      ) {

        alert(
          "Please Fill All Details"
        );

        return;

      }

      const servicesText =
        selectedServices
          .map(
            (item) =>
              item.name
          )
          .join(", ");

      const { error } =
        await supabase
          .from("bookings")
          .insert([

            {

  customer_name:
    name,

  phone:
    mobile,

  email:
    email,

    
  service:
    servicesText,

  date:
    selectedDate,

  time:
    selectedSlot,

  amount:
    finalAmount,

  loyalty_points:
    calculatedPoints,

  payment_status:
    paymentMethod ===
    "UPI Payment"
      ? "Pending"
      : "Pay At Store",

  booking_status:
    "Pending",

  assigned_staff:
    "Not Assigned",

  addons:
    "None",

  referred_by:
    referralCode || null,

},

]);

      if (error) {

  console.log(error);

  alert(
    error.message
  );

  return;

}

      const updatedPoints =
        claimPoints
          ? calculatedPoints
          : loyaltyPoints +
            calculatedPoints;

      const { data: existingCustomer } =
  await supabase
    .from("customers")
    .select("*")
    .eq(
      "email",
      email
    )
    .single();

if (existingCustomer) {

  await supabase
    .from("customers")
    .update({

      loyalty_points:
        updatedPoints,

    })
    .eq(
      "email",
      email
    );

} else {

  await supabase
    .from("customers")
    .insert([

      {

        email:
          email,

        loyalty_points:
          updatedPoints,

      },

    ]);

}

      setEarnedPoints(
        calculatedPoints
      );

      setShowPopup(true);

    };

  return (

    <main className="min-h-screen bg-[#f7f1eb] text-black px-4 sm:px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14 text-center">

          <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
            Premium Booking
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Luxury Salon Booking Experience
          </h1>

        </div>

        {/* SERVICES */}

<section className="mb-20">

  <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

    <h2 className="text-3xl font-bold">
      Select Services
    </h2>

    <div className="bg-black text-white px-5 py-3 rounded-full text-sm">
      200+ Services
    </div>

  </div>
<input
  type="text"
  placeholder="Search Services..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  className="w-full bg-white px-6 py-5 rounded-full outline-none mb-6"
/>
  {/* CATEGORY PILLS */}

  <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-8">

    {Object.keys(
      SERVICES
    ).map((category) => (

      <button
        key={category}
        onClick={() =>
          setActiveCategory(
            category
          )
        }
        className={`px-5 py-3 rounded-full whitespace-nowrap transition ${
          activeCategory ===
          category
            ? "bg-black text-white"
            : "bg-white"
        }`}
      >

        {category}

      </button>

    ))}

  </div>

  <div className="flex gap-4 overflow-x-auto pb-4">

  {SERVICES[
    activeCategory as keyof typeof SERVICES
  ]
    .filter((service) =>
      service.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
    .map(
      (
        service,
        index
      ) => {

        const active =
          selectedServices.find(
            (item) =>
              item.name ===
              service.name
          );

        return (

          <div
            key={`${service.name}-${index}`}
            className={`min-w-[220px] rounded-[30px] p-5 transition ${
              active
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-xl font-bold mb-2">

              {service.name}

            </h3>

            <p className="text-lg mb-5">

              ₹{service.price}

            </p>

            <button
              type="button"
              onClick={() =>
                toggleService(
                  service
                )
              }
              className={`w-full py-3 rounded-full text-sm ${
                active
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >

              {active
                ? "Added"
                : "Add"}

            </button>

          </div>

        );

      }
    )}

</div>
  {/* SELECTED SERVICES */}

  {selectedServices.length >
    0 && (

    <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 p-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-5">

        <div className="flex flex-wrap gap-2">

          {selectedServices.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-black text-white px-4 py-2 rounded-full text-sm"
              >

                {item.name}

              </div>

            )
          )}

        </div>

        <div className="flex items-center gap-4">

          <div className="text-xl font-bold">

            ₹{totalAmount}

          </div>

          <button
            className="bg-black text-white px-6 py-3 rounded-full"
          >

            Continue

          </button>

        </div>

      </div>

    </div>

  )}

</section>

        {/* DATE + SLOT */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">

          <div className="bg-white rounded-[35px] p-8">

            <h2 className="text-3xl font-bold mb-8">
              Select Date
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="w-full bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

          </div>

          <div className="bg-white rounded-[35px] p-8">

            <h2 className="text-3xl font-bold mb-8">
              Select Slot
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {slots.map(
                (
                  slot,
                  index
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedSlot(
                        slot
                      )
                    }
                    disabled={bookedSlots.includes(
                      slot
                    )}
                    className={`py-4 rounded-2xl transition ${
                      bookedSlots.includes(
                        slot
                      )
                        ? "bg-neutral-300 text-neutral-500"
                        : selectedSlot ===
                          slot
                        ? "bg-black text-white"
                        : "bg-[#f7f1eb]"
                    }`}
                  >

                    {slot}

                  </button>

                )
              )}

            </div>

          </div>

        </div>

        {/* CUSTOMER */}

        <div className="bg-white rounded-[35px] p-8 mb-20">

          <h2 className="text-3xl font-bold mb-10">
            Customer Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value
                )
              }
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="email"
              placeholder="Enter Gmail"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

          </div>

          <div className="mt-8 bg-[#f7f1eb] rounded-[30px] p-6">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <p className="text-neutral-500 mb-2">
                  Available Loyalty Points
                </p>

                <h3 className="text-4xl font-bold">
                  {loyaltyPoints}
                </h3>

              </div>

              <button
                onClick={() =>
                  setClaimPoints(
                    !claimPoints
                  )
                }
                className={`px-6 py-4 rounded-full ${
                  claimPoints
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >

                {claimPoints
                  ? "Points Claimed"
                  : "Claim Points"}

              </button>

            </div>

          </div>

        </div>

        {/* PAYMENT */}

        <div className="bg-white rounded-[35px] p-8 mb-20">

          <h2 className="text-3xl font-bold mb-8">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {[
              "UPI Payment",
              "Pay At Store",
            ].map(
              (
                method,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setPaymentMethod(
                      method
                    )
                  }
                  className={`p-6 rounded-[25px] border-2 text-left ${
                    paymentMethod ===
                    method
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 bg-[#f7f1eb]"
                  }`}
                >

                  <h3 className="text-2xl font-bold">
                    {method}
                  </h3>

                </button>

              )
            )}

          </div>

        </div>

        {/* SUMMARY */}

        <div className="bg-black text-white rounded-[35px] p-8">

          <h2 className="text-4xl font-bold mb-10">
            Booking Summary
          </h2>

          <div className="grid gap-5 text-lg">

            <div className="flex justify-between gap-5">

              <span>
                Services
              </span>

              <span className="text-right">

                {selectedServices
                  .map(
                    (item) =>
                      item.name
                  )
                  .join(", ") ||
                  "Not Selected"}

              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Date
              </span>

              <span>
                {selectedDate ||
                  "Not Selected"}
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Slot
              </span>

              <span>
                {selectedSlot ||
                  "Not Selected"}
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Loyalty Discount
              </span>

              <span>
                ₹{
                  claimPoints
                    ? loyaltyPoints
                    : 0
                }
              </span>

            </div>

            <div className="flex justify-between text-3xl font-bold pt-5 border-t border-white/20">

              <span>
                Total
              </span>

              <span>
                ₹{finalAmount}
              </span>

            </div>

          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-white text-black py-5 rounded-full text-lg font-semibold mt-10 hover:scale-[1.01] transition"
          >

            Confirm Booking

          </button>

        </div>

      </div>

      {/* SUCCESS */}

{showPopup && (

  <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-5 z-50">

    <div className="bg-white max-w-xl w-full rounded-[35px] p-8 text-center">

      <h2 className="text-3xl sm:text-5xl font-bold mb-5">
        Booking Successful 😎🔥
      </h2>

      <p className="text-lg mb-3">
        You earned
        <span className="font-bold">
          {" "}
          {earnedPoints}
        </span>
        {" "}loyalty points ✨
      </p>

      <div className="bg-[#f7f1eb] rounded-[25px] p-5 mt-6 mb-6">

        <h3 className="text-2xl font-bold mb-3">
          Refer Your Friend 😎🔥
        </h3>

        <p className="text-neutral-600 mb-5 leading-7">
          Earn 2X loyalty points when your friend visits store & completes service.
        </p>

        <div className="bg-white rounded-2xl p-4 text-sm break-all mb-4">

          {referralLink}

        </div>

        <button
          onClick={() => {

            const text =
              `✨ Book premium salon services at MR BEAUTY LAND 😎🔥\n\nUse my referral link:\n${referralLink}`;

            window.open(
              `https://wa.me/?text=${encodeURIComponent(text)}`
            );

          }}
          className="w-full bg-black text-white py-4 rounded-full"
        >

          Share On WhatsApp

        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <a
          href="/"
          className="bg-[#f7f1eb] py-4 rounded-full"
        >

          Go To Homepage

        </a>

        <a
          href="/dashboard"
          className="bg-black text-white py-4 rounded-full"
        >

          Login To Dashboard

        </a>

      </div>

    </div>

  </div>

)}
    </main>

  );

}
export default function BookingPage() {

  return (

    <Suspense>

      <BookingContent />

    </Suspense>

  );

}