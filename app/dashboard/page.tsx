"use client";

import { useEffect, useState } from "react";

import { supabase } from "../supabase";

import emailjs from "@emailjs/browser";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
export default function DashboardPage() {

  /* FORM */

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [services, setServices] =
  useState<string[]>([]);
const [selectedCategory, setSelectedCategory] =
  useState("MEN SERVICES");
const handleLogout = async () => {

  try {

    await signOut(auth);

    window.location.href = "/login";

  } catch (error) {

    console.log(error);

    alert("Logout Failed");

  }

};
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
    { name: "O3+ D-Tan", price: 600 },

  ],

  "BODY POLISHING": [

    { name: "Body Polishing", price: 2000 },

  ],

  "HAIR SERVICES": [

    { name: "Hair Wash", price: 200 },
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
  const [addons, setAddons] =
    useState("");

  const [assignedStaff, setAssignedStaff] =
    useState("");

  const [paymentMode, setPaymentMode] =
    useState("Cash");

  const [bookingDate, setBookingDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [bookingTime, setBookingTime] =
    useState("");

  const [amount, setAmount] =
    useState(0);

  const [addonAmount, setAddonAmount] =
    useState(0);

  const [totalAmount, setTotalAmount] =
    useState(0);

  /* DASHBOARD */

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [totalBookings, setTotalBookings] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [tillNowRevenue, setTillNowRevenue] =
    useState(0);

  const [pendingPayments, setPendingPayments] =
    useState(0);

  const [activeStaff, setActiveStaff] =
    useState(0);
const [successPopup, setSuccessPopup] =
  useState(false);
  const [customerSuggestions, setCustomerSuggestions] =
  useState<any[]>([]);

const [availablePoints, setAvailablePoints] =
  useState(0);

const [claimedPoints, setClaimedPoints] =
  useState(0);
  const [referrals, setReferrals] =
  useState<any[]>([]);
  /* TOTAL */
async function searchCustomers(
  value: string
) {

  setCustomerName(value);

  if (!value) {

    setCustomerSuggestions([]);

    return;

  }

  const { data } = await supabase
    .from("customers")
    .select("*")
    .ilike(
      "customer_name",
      `%${value}%`
    );

  setCustomerSuggestions(data || []);

}

function selectCustomer(
  customer: any
) {

  setCustomerName(
    customer.customer_name
  );

  setPhone(
    customer.phone
  );

  setEmail(
    customer.email
  );

  setGender(
    customer.gender
  );

  setAvailablePoints(
    customer.loyalty_points || 0
  );

  setCustomerSuggestions([]);

}
const fetchReferrals =
  async () => {

    const { data } =
      await supabase
        .from("bookings")
        .select("*")
        .not(
          "referred_by",
          "is",
          null
        );

    if (data) {

      setReferrals(data);

    }

  };
  useEffect(() => {

    setTotalAmount(
      Number(amount) +
      Number(addonAmount)
    );

  }, [amount, addonAmount]);

  /* LOAD DASHBOARD */

  async function loadDashboard() {

    /* DAILY BOOKINGS */

    const { data: bookings } =
      await supabase
        .from("bookings")
        .select("*")
        .eq(
          "booking_date",
          selectedDate
        );

    setTotalBookings(
      bookings?.length || 0
    );

    /* DAILY REVENUE */

    const dailyRevenue =
      bookings?.reduce(
        (acc, item) =>
          acc +
          Number(
            item.total_amount || 0
          ),
        0
      ) || 0;

    setTotalRevenue(
      dailyRevenue
    );

    /* PENDING */

    const pending =
      bookings?.filter(
        (item) =>
          item.payment_status ===
          "Pending"
      ).length || 0;

    setPendingPayments(
      pending
    );

    
    /* ACTIVE STAFF */

    const { data: staff } =
      await supabase
        .from("staff")
        .select("*")
        .eq(
          "attendance_status",
          "Checked In"
        );

    setActiveStaff(
      staff?.length || 0
    );

  }

  useEffect(() => {

    loadDashboard();
fetchReferrals();
  }, [selectedDate]);
const transferReferralPoints =
  async (
    booking: any
  ) => {

    const reward = 50;

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
            (referrer.loyalty_points || 0) +
            reward,

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
            (friend.loyalty_points || 0) +
            reward,

        })
        .eq(
          "email",
          booking.email
        );

    }

    alert(
      "Referral Points Transferred 😎🔥"
    );

  };
  /* CREATE BOOKING */

  async function createWalkinBooking() {

    const paymentStatus =
      paymentMode === "Cash"
        ? "Paid"
        : "Pending";
const earnedPoints =
  Math.floor(
    totalAmount / 100
  ) * 5;
    const { error } = await supabase
      .from("bookings")
      .insert([

        {

          customer_name:
            customerName,

          phone,

          email,

          gender,

          service:
  services.join(", "),

          addons,

          assigned_staff:
            assignedStaff,

          payment_status:
            paymentStatus,

          payment_mode:
            paymentMode,

          booking_status:
            "Confirmed",

          booking_type:
            "Walk-In",

          booking_date:
            bookingDate,

          booking_time:
            bookingTime,

          amount,

          addon_amount:
            addonAmount,

          total_amount:
            totalAmount,

        },

      ]);

    if (error) {

  console.log(error);

  alert(
    "Booking Failed ❌"
  );

  return;

}

    /* EMAIL */

try {

  await emailjs.send(

    "service_zxaqz7b",

    "template_hmw8kww",

    {

      customer_name:
        customerName,

      customer_email:
        email,

      service:
  services.join(", "),

      booking_date:
        bookingDate,

      booking_time:
        bookingTime,

      total_amount:
        totalAmount,

      loyalty_points:
        earnedPoints,

    },

    "f0a-zPukkYnc3HI2T"

  );

} catch (err) {

  console.log(err);

}

    /* WHATSAPP */

const whatsappMessage = `✨ MR BEAUTY LAND ✨

Hello ${customerName} 👋

Your Walk-In Booking is Confirmed 😎🔥

━━━━━━━━━━━━━━━

💇 Services:
${services.join(", ")}

👨‍🔧 Staff:
${assignedStaff}

📅 Date:
${bookingDate}

⏰ Time:
${bookingTime}

💰 Total:
₹${totalAmount}

🎁 Loyalty Points Earned:
${earnedPoints}

━━━━━━━━━━━━━━━

Thank you for visiting
MR BEAUTY LAND ✨`;
    const whatsappUrl =
      `https://wa.me/91${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
/* SAVE / UPDATE CUSTOMER */

const finalPoints =
  Number(
    availablePoints || 0
  ) -
  Number(
    claimedPoints || 0
  ) +
  Number(
    earnedPoints || 0
  );

const { data: existingCustomer } =
  await supabase
    .from("customers")
    .select("*")
    .eq(
      "email",
      email.trim()
    )
    .maybeSingle();

if (existingCustomer) {

  await supabase
    .from("customers")
    .update({

      customer_name:
        customerName,

      phone:
        phone,

      gender:
        gender,

      loyalty_points:
        finalPoints,

    })
    .eq(
      "email",
      email.trim()
    );

} else {

  await supabase
    .from("customers")
    .insert([

      {

        customer_name:
          customerName,

        phone:
          phone,

        email:
          email.trim(),

        gender:
          gender,

        loyalty_points:
          earnedPoints,

      },

    ]);

}
   


/* RESET */

setCustomerName("");
setPhone("");
setEmail("");
setGender("");
setServices([]);
setAddons("");
setAssignedStaff("");
setBookingTime("");
setAmount(0);
setAddonAmount(0);
setTotalAmount(0);

/* RELOAD */

loadDashboard();
setSuccessPopup(true);

setTimeout(() => {

  setSuccessPopup(false);

}, 3000);
/* POPUP */

setSuccessPopup(true);

setTimeout(() => {

  setSuccessPopup(false);

}, 3000);

}


  return (

    <div>
{/* SUCCESS POPUP */}

{successPopup && (

  <div className="fixed top-8 right-8 bg-black text-white px-8 py-6 rounded-[30px] shadow-2xl z-50">

    <h2 className="text-2xl font-bold mb-2">

      Booking Created 😎🔥

    </h2>

    <p className="text-zinc-400">

      Confirmation sent successfully

    </p>

  </div>

)}
      {/* TOP */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

        <div>

          <p className="uppercase tracking-[5px] text-sm text-zinc-500 mb-3">
            Reception Panel
          </p>

          <h1 className="text-6xl font-bold">
            Walk-In POS 😎
          </h1>

        </div>

        <div className="flex flex-col gap-4">

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

          <a
            href="/dashboard/live-queue"
            className="bg-black text-white px-8 py-4 rounded-full text-center"
          >
            Live Queue
          </a>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {/* BOOKINGS */}

        <div className="bg-white rounded-[35px] p-8 shadow-sm">

          <p className="text-zinc-500 mb-4 text-lg">
            Total Bookings
          </p>

          <h2 className="text-5xl font-bold">
            {totalBookings}
          </h2>

          <p className="text-zinc-400 mt-3">
            {selectedDate}
          </p>

        </div>

        {/* DAILY REVENUE */}

        <div className="bg-black text-white rounded-[35px] p-8 shadow-sm">

          <p className="text-zinc-400 mb-4 text-lg">
            Daily Revenue
          </p>

          <h2 className="text-5xl font-bold">
            ₹{totalRevenue}
          </h2>

          <p className="text-zinc-500 mt-3">
            {selectedDate}
          </p>

        </div>

        {/* ACTIVE STAFF */}

        <div className="bg-white rounded-[35px] p-8 shadow-sm">

          <p className="text-zinc-500 mb-4 text-lg">
            Active Staff
          </p>

          <h2 className="text-5xl font-bold">
            {activeStaff}
          </h2>

        </div>

        {/* PENDING */}

        <div className="bg-[#e5cfaa] rounded-[35px] p-8 shadow-sm">

          <p className="text-black/70 mb-4 text-lg">
            Pending Payments
          </p>

          <h2 className="text-5xl font-bold">
            {pendingPayments}
          </h2>

        </div>

      </div>

      

      {/* FORM */}

      <div className="bg-white rounded-[40px] p-10 shadow-sm">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="relative">

  <input
    type="text"
    placeholder="Customer Name"
    value={customerName}
    onChange={(e) =>
      searchCustomers(
        e.target.value
      )
    }
    className="bg-[#f7f1eb] p-5 rounded-3xl outline-none w-full text-black"
  />

  {customerSuggestions.length > 0 && (

    <div className="absolute top-[90px] left-0 w-full bg-white rounded-3xl shadow-2xl z-50 p-4 space-y-3">

      {customerSuggestions.map((customer) => (

        <button
         type="button"
          key={customer.id}
          onClick={() =>
            selectCustomer(customer)
          }
          className="w-full text-left bg-[#f7f1eb] p-4 rounded-2xl"
        >

          <h2 className="font-bold text-lg">

            {customer.customer_name}

          </h2>

          <p className="text-zinc-500 text-sm">

            {customer.phone}

          </p>

        </button>

      ))}

    </div>

  )}

</div>

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <div>

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={async (e) => {

      const emailValue =
        e.target.value;

      setEmail(
        emailValue
      );

      const { data, error } =
        await supabase
          .from("customers")
          .select("*")
          .eq(
            "email",
            emailValue.trim()
          )
          .maybeSingle();

      console.log(data);

      if (data) {

        setAvailablePoints(
          data.loyalty_points || 0
        );

        setCustomerName(
          data.customer_name || ""
        );

        setPhone(
          data.phone || ""
        );

        setGender(
          data.gender || ""
        );

      } else {

        setAvailablePoints(0);

      }

    }}
    className="bg-[#f7f1eb] p-5 rounded-3xl outline-none text-black"
  />

  {availablePoints > 0 && (

    <p className="text-green-600 font-semibold mt-2">

      😎 Available Loyalty Points:
      {availablePoints}

    </p>

  )}

</div>

          <select
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>
<div className="space-y-5">



<input
  type="text"
  placeholder="Search Services..."
  list="all-services"
  className="bg-[#f7f1eb] p-5 rounded-3xl outline-none w-full text-black"
  onChange={(e) => {

    const selected =
      Object.values(
        SERVICES
      )
        .flat()
        .find(
          (item) =>
            item.name ===
            e.target.value
        );

    if (!selected)
      return;

    if (
      !services.includes(
        selected.name
      )
    ) {

      setServices([
        ...services,
        selected.name,
      ]);

      setAmount(
        (prev) =>
          prev +
          selected.price
      );

    }

  }}
/>

<datalist id="all-services">

  {Object.values(
    SERVICES
  )
    .flat()
    .map((item, index) => (

      <option
        key={`${item.name}-${item.price}-${index}`}
        value={item.name}
      />

    ))}

</datalist>

  {/* SELECTED SERVICES */}

  <div className="flex flex-wrap gap-3">

    {services.map((item, index) => (

      <div
        key={item}
        className="bg-black text-white px-5 py-3 rounded-full flex items-center gap-3"
      >

        <span>{item}</span>

        <button
          type="button"
          onClick={() => {

            setServices(
              services.filter(
                (service) =>
                  service !== item
              )
            );

          }}
          className="text-red-400"
        >

          X

        </button>

      </div>

    ))}

  </div>

</div>
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
            item.name ===
            e.target.value
        );

    if (!selected)
      return;

    setAddons(
      selected.name
    );

    setAddonAmount(
      selected.price
    );

    setTotalAmount(
      amount +
      selected.price
    );

  }}
/>

<datalist id="all-addon-services">

  {Object.values(
    SERVICES
  )
    .flat()
    .map((item, index) => (

      <option
        key={`addon-${item.name}-${item.price}-${index}`}
        value={item.name}
      />

    ))}

</datalist>
<input
  type="text"
  placeholder="Assigned Staff"
  value={assignedStaff}
  onChange={(e) =>
    setAssignedStaff(
      e.target.value
    )
  }
  className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
/>

          <input
            type="time"
            value={bookingTime}
            onChange={(e) =>
              setBookingTime(
                e.target.value
              )
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          />

          <select
            value={paymentMode}
            onChange={(e) =>
              setPaymentMode(
                e.target.value
              )
            }
            className="bg-[#f7f1eb] p-5 rounded-3xl outline-none"
          >

            <option>
              Cash
            </option>

            <option>
              UPI
            </option>

            <option>
              Card
            </option>

            <option>
              Pending
            </option>

                   </select>
        </div>

      
<div className="bg-[#f7f1eb] rounded-[35px] p-8 mb-8">

  <div className="flex items-center justify-between mb-4">

    <div>

      <p className="text-zinc-500 mb-2">

        Available Loyalty Points

      </p>

      <h2 className="text-5xl font-bold text-black">

        {availablePoints}

      </h2>

    </div>

    <button
      onClick={() => {

        setClaimedPoints(
          availablePoints
        );

        setTotalAmount(
          totalAmount -
          availablePoints
        );

      }}
      className="bg-black text-white px-8 py-4 rounded-full"
    >

      Claim Now

    </button>

  </div>

  <p className="text-zinc-500">

    1 Point = ₹1

  </p>

</div>
        {/* BILLING */}

        <div className="mt-10 bg-black text-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-6">
            Billing Summary
          </h2>

          <div className="space-y-4 text-xl">

            <p>
              Service Amount:
              ₹{amount}
            </p>

            <p>
              Addon Amount:
              ₹{addonAmount}
            </p>

            <p className="text-5xl font-bold mt-6">
              Total:
              ₹{totalAmount}
            </p>

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={createWalkinBooking}
          className="bg-black text-white px-10 py-5 rounded-full mt-10"
        >
          Create Walk-In Booking
        </button>

      </div>
<div className="bg-white rounded-[35px] p-8 mt-10">

  <h2 className="text-3xl font-bold mb-8">

    Referral Rewards 😎🔥

  </h2>

  <div className="grid gap-5">

    {referrals.map(
      (
        booking,
        index
      ) => (

        <div
          key={index}
          className="border rounded-[25px] p-5"
        >

          <div className="mb-2">

            Friend:
            {" "}
            {booking.email}

          </div>

          <div className="mb-4">

            Referred By:
            {" "}
            {booking.referred_by}

          </div>

          <button
            onClick={() =>
              transferReferralPoints(
                booking
              )
            }
            className="bg-black text-white px-6 py-3 rounded-full"
          >

            Transfer 50 + 50 Points

          </button>

        </div>

      )
    )}

  </div>

</div>
</div>
  );

}