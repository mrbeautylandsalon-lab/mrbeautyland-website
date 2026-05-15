"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase";

import { supabase } from "../supabase.js";

export default function DashboardPage() {

const router = useRouter();

const [userName, setUserName] = useState("Guest");

const [activeTab, setActiveTab] = useState("overview");

const [bookings, setBookings] = useState<any[]>([]);

const [payments, setPayments] = useState<any[]>([]);

const [notifications, setNotifications] = useState<any[]>([]);

const [history, setHistory] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

useEffect(() => {

const unsubscribe = onAuthStateChanged(auth, (user) => {

  if (!user) {

    router.push("/login");

  } else {

    setUserName(user.displayName || user.email || "User");

  }

});

fetchAllData();

const bookingsChannel = supabase
  .channel("realtime-bookings")
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

  unsubscribe();

  supabase.removeChannel(bookingsChannel);

};

}, []);

const fetchAllData = async () => {

await Promise.all([
  fetchBookings(),
  fetchPayments(),
  fetchNotifications(),
  fetchHistory(),
]);

setLoading(false);

};

const fetchBookings = async () => {

const { data } = await supabase
  .from("bookings")
  .select("*")
  .order("id", { ascending: false });

if (data) {

  setBookings(data);

}

};

const fetchPayments = async () => {

const { data } = await supabase
  .from("payments")
  .select("*")
  .order("id", { ascending: false });

if (data) {

  setPayments(data);

}

};

const fetchNotifications = async () => {

const { data } = await supabase
  .from("notifications")
  .select("*")
  .order("id", { ascending: false });

if (data) {

  setNotifications(data);

}

};

const fetchHistory = async () => {

const { data } = await supabase
  .from("history")
  .select("*")
  .order("id", { ascending: false });

if (data) {

  setHistory(data);

}

};

const handleLogout = async () => {

await signOut(auth);

router.push("/login");

};

const loyaltyPoints = bookings.length * 120;

const membership =loyaltyPoints >= 1000 ? "Premium" : "Free Plan";

if (loading) {

return (

  <main className="min-h-screen flex items-center justify-center bg-[#f7f1eb] text-black text-3xl font-bold">
    Loading Dashboard...
  </main>

);

}

return (

<main className="min-h-screen bg-[#f7f1eb] text-black">

  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* TOP BAR */}
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

      <div>

        <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-3">
          Welcome Back
        </p>

        <h1 className="text-4xl md:text-6xl font-bold">
          {userName} 😎
        </h1>

      </div>

      <div className="flex gap-4 flex-wrap">

        <button
          onClick={() => router.push("/")}
          className="bg-white px-6 py-4 rounded-full"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-6 py-4 rounded-full"
        >
          Logout
        </button>

      </div>

    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-4 gap-6 mb-10">

      <div className="bg-white rounded-[35px] p-8">

        <p className="text-neutral-500 mb-3">
          Total Bookings
        </p>

        <h2 className="text-5xl font-bold">
          {bookings.length}
        </h2>

      </div>

      <div className="bg-black text-white rounded-[35px] p-8">

        <p className="text-neutral-300 mb-3">
          Loyalty Points
        </p>

        <h2 className="text-5xl font-bold">
          {loyaltyPoints}
        </h2>

      </div>

      <div className="bg-white rounded-[35px] p-8">

        <p className="text-neutral-500 mb-3">
          Membership
        </p>

        <h2 className="text-4xl font-bold">
          {membership}
        </h2>

      </div>

      <div className="bg-gradient-to-br from-[#d6b98c] to-[#f2dfc0] rounded-[35px] p-8">

        <p className="text-black/70 mb-3">
          Active Offers
        </p>

        <h2 className="text-5xl font-bold">
          {notifications.length}
        </h2>

      </div>

    </div>

    {/* NAVIGATION */}
    <div className="flex flex-wrap gap-4 mb-10">

      {
        [
          "overview",
          "bookings",
          "payments",
          "history",
          "notifications",
          "profile",
        ].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 rounded-full capitalize ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {tab}
          </button>

        ))
      }

    </div>

    {/* OVERVIEW */}
    {
      activeTab === "overview" && (

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-[40px] p-10">

            <h2 className="text-4xl font-bold mb-8">
              Upcoming Bookings
            </h2>

            <div className="grid gap-5">

              {
                bookings.length === 0 ? (

                  <p>No bookings yet.</p>

                ) : (

                  bookings.slice(0, 5).map((booking, index) => (

                    <div
                      key={index}
                      className="border rounded-[25px] p-5"
                    >

                      <h3 className="text-2xl font-bold mb-2">
                        {booking.service}
                      </h3>

                      <p>
                        {booking.booking_date} • {booking.booking_time}
                      </p>

                      <p className="mt-2">
                        Status: {booking.booking_status}
                      </p>

                    </div>

                  ))

                )
              }

            </div>

          </div>

          <div className="bg-black text-white rounded-[40px] p-10">

            <h2 className="text-4xl font-bold mb-8">
              Membership Status
            </h2>

            <div className="mb-6">

              <p className="text-neutral-300 mb-3">
                Current Plan
              </p>

              <h3 className="text-5xl font-bold">
                {membership}
              </h3>

            </div>

            <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden mb-4">

              <div
                className="bg-white h-full rounded-full"
                style={{
                  width: `${Math.min(loyaltyPoints / 10, 100)}%`,
                }}
              ></div>

            </div>

            <p>
              Keep booking services to unlock premium rewards 😎🔥
            </p>

          </div>

        </div>

      )
    }

    {/* BOOKINGS */}
    {
      activeTab === "bookings" && (

        <div className="bg-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Booking Status
          </h2>

          <div className="grid gap-6">

            {
              bookings.map((booking, index) => (

                <div
                  key={index}
                  className="border rounded-[30px] p-6 flex flex-col lg:flex-row justify-between gap-5"
                >

                  <div>

                    <h3 className="text-2xl font-bold mb-2">
                      {booking.service}
                    </h3>

                    <p>
                      {booking.booking_date} • {booking.booking_time}
                    </p>

                    <p className="mt-2">
                      Status: {booking.status}
                    </p>

                  </div>

                  <button className="bg-black text-white px-6 py-3 rounded-full h-fit">
                    Reschedule
                  </button>

                </div>

              ))
            }

          </div>

        </div>

      )
    }

    {/* PAYMENTS */}
    {
      activeTab === "payments" && (

        <div className="bg-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Payment History
          </h2>

          <div className="grid gap-6">

        
              {
  bookings.map((booking, index) => (

    <div
      key={index}
      className="border rounded-[30px] p-6 flex justify-between items-center"
    >

      <div>

        <h3 className="text-2xl font-bold">
          {booking.service}
        </h3>

        <p>
          {booking.booking_date}
        </p>

        <p>
          {booking.payment_status}
        </p>

      </div>

      <h2 className="text-3xl font-bold">
        ₹{booking.amount}
      </h2>

    </div>

  ))
}

          </div>

        </div>

      )
    }

    {/* HISTORY */}
    {
      activeTab === "history" && (

        <div className="bg-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Booking History
          </h2>

          <div className="grid gap-6">

            {
              history.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-[25px] p-6"
                >

                  <h3 className="text-2xl font-bold mb-2">
                    {item.service}
                  </h3>

                  <p>
                    {item.date}
                  </p>

                  <p>
                    {item.status}
                  </p>

                </div>

              ))
            }

          </div>

        </div>

      )
    }

    {/* NOTIFICATIONS */}
    {
      activeTab === "notifications" && (

        <div className="bg-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Notifications
          </h2>

          <div className="grid gap-6">

            {
              notifications.map((notification, index) => (

                <div
                  key={index}
                  className="bg-[#f7f1eb] rounded-[30px] p-6"
                >

                  <h3 className="text-2xl font-bold mb-3">
                    {notification.title}
                  </h3>

                  <p className="mb-2">
                    {notification.message}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {notification.date}
                  </p>

                </div>

              ))
            }

          </div>

        </div>

      )
    }

    {/* PROFILE */}
    {
      activeTab === "profile" && (

        <div className="bg-white rounded-[40px] p-10">

          <h2 className="text-4xl font-bold mb-10">
            Manage Account Details
          </h2>

          <div className="grid gap-6">

            <input
              type="text"
              defaultValue={userName}
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="email"
              placeholder="Enter Email"
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="bg-[#f7f1eb] px-6 py-5 rounded-2xl outline-none"
            />

            <button className="bg-black text-white py-5 rounded-full text-lg">
              Save Changes
            </button>

          </div>

        </div>

      )
    }

  </div>

</main>

);}