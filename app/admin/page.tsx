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

  const [walkInName, setWalkInName] = useState("");
  const [walkInMobile, setWalkInMobile] = useState("");
  const [walkInService, setWalkInService] = useState("");
  const [walkInAmount, setWalkInAmount] = useState("");

  const [addonName, setAddonName] = useState("");
  const [addonPrice, setAddonPrice] = useState("");

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

      fetchBookings();

    });

    return () => unsubscribe();

  }, []);

  const fetchBookings = async () => {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setBookings(data);
    }

    setLoading(false);

  };

  const createWalkInBooking = async () => {

    if (
      !walkInName ||
      !walkInMobile ||
      !walkInService ||
      !walkInAmount
    ) {
      alert("Fill all walk-in details");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: walkInName,
          customer_mobile: walkInMobile,
          service_name: walkInService,
          total_amount: Number(walkInAmount),
          booking_status: "Walk-In",
          payment_status: "Pending",
          loyalty_points_earned: Math.floor(Number(walkInAmount) / 100) * 5,
          booking_date: new Date().toISOString().split("T")[0],
          booking_time: "Walk-In"
        }
      ]);

    if (error) {
      console.log(error);
      alert("Walk-In Failed");
      return;
    }

    alert("Walk-In Booking Added 😎🔥");

    setWalkInName("");
    setWalkInMobile("");
    setWalkInService("");
    setWalkInAmount("");

    fetchBookings();

  };

  const updateBookingStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("bookings")
      .update({ booking_status: status })
      .eq("id", id);

    fetchBookings();

  };

  const updatePaymentStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("bookings")
      .update({ payment_status: status })
      .eq("id", id);

    fetchBookings();

  };

  const addAddon = async (
    bookingId: number,
    currentAmount: number
  ) => {

    if (!addonName || !addonPrice) {
      alert("Enter addon details");
      return;
    }

    const updatedAmount =
      Number(currentAmount) + Number(addonPrice);

    await supabase
      .from("bookings")
      .update({
        total_amount: updatedAmount,
        addons: {
          name: addonName,
          price: addonPrice
        }
      })
      .eq("id", bookingId);

    alert("Addon Added 😎🔥");

    setAddonName("");
    setAddonPrice("");

    fetchBookings();

  };

  const sendPaymentRequest = async (
    booking: any
  ) => {

    await supabase
      .from("payment_requests")
      .insert([
        {
          customer_email: booking.customer_email,
          customer_name: booking.customer_name,
          amount: booking.total_amount,
          booking_id: booking.id,
          status: "Pending"
        }
      ]);

    await supabase
      .from("notifications")
      .insert([
        {
          customer_email: booking.customer_email,
          title: "Payment Pending",
          message: `Please pay ₹${booking.total_amount}`,
          type: "payment"
        }
      ]);

    alert("Payment Request Sent 😎🔥");

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
            Luxury Admin Panel
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-[35px] p-8">
          <p className="text-neutral-500 mb-3">Total Bookings</p>
          <h2 className="text-5xl font-bold">
            {bookings.length}
          </h2>
        </div>

        <div className="bg-white rounded-[35px] p-8">
          <p className="text-neutral-500 mb-3">Revenue</p>
          <h2 className="text-5xl font-bold">
            ₹{
              bookings.reduce(
                (acc, item) =>
                  acc + (item.total_amount || 0),
                0
              )
            }
          </h2>
        </div>

        <div className="bg-white rounded-[35px] p-8">
          <p className="text-neutral-500 mb-3">Pending Payments</p>
          <h2 className="text-5xl font-bold">
            {
              bookings.filter(
                (b) => b.payment_status === "Pending"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-[35px] p-8">
          <p className="text-neutral-500 mb-3">Completed</p>
          <h2 className="text-5xl font-bold">
            {
              bookings.filter(
                (b) => b.booking_status === "Completed"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* WALK-IN */}
      <div className="bg-white rounded-[40px] p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">
          New Walk-In Booking
        </h2>

        <div className="grid md:grid-cols-4 gap-5">

          <input
            type="text"
            placeholder="Customer Name"
            value={walkInName}
            onChange={(e) => setWalkInName(e.target.value)}
            className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={walkInMobile}
            onChange={(e) => setWalkInMobile(e.target.value)}
            className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Service"
            value={walkInService}
            onChange={(e) => setWalkInService(e.target.value)}
            className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
          />

          <input
            type="number"
            placeholder="Amount"
            value={walkInAmount}
            onChange={(e) => setWalkInAmount(e.target.value)}
            className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
          />

        </div>

        <button
          onClick={createWalkInBooking}
          className="mt-6 bg-black text-white px-8 py-4 rounded-full"
        >
          Create Walk-In Booking
        </button>

      </div>

      {/* BOOKINGS */}
      <div className="grid gap-8">

        {
          loading ? (
            <div className="text-2xl font-semibold">
              Loading...
            </div>
          ) : (
            bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-[40px] p-8"
              >

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

                  {/* LEFT */}
                  <div className="grid gap-3">

                    <h2 className="text-3xl font-bold">
                      {booking.customer_name}
                    </h2>

                    <p className="text-neutral-600">
                      {booking.service_name}
                    </p>

                    <p className="text-neutral-600">
                      {booking.customer_mobile}
                    </p>

                    <p className="text-neutral-600 break-all">
                      {booking.customer_email}
                    </p>

                    <p className="font-semibold text-xl">
                      ₹{booking.total_amount}
                    </p>

                    <p>
                      Loyalty Points: {booking.loyalty_points_earned}
                    </p>

                    <p>
                      Booking Status: {booking.booking_status}
                    </p>

                    <p>
                      Payment Status: {booking.payment_status}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col gap-4 w-full lg:w-[350px]">

                    <input
                      type="text"
                      placeholder="Addon Name"
                      value={addonName}
                      onChange={(e) => setAddonName(e.target.value)}
                      className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Addon Price"
                      value={addonPrice}
                      onChange={(e) => setAddonPrice(e.target.value)}
                      className="bg-[#f7f1eb] px-5 py-4 rounded-2xl outline-none"
                    />

                    <button
                      onClick={() =>
                        addAddon(
                          booking.id,
                          booking.total_amount
                        )
                      }
                      className="bg-black text-white py-4 rounded-full"
                    >
                      Add Extra Service
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Completed"
                        )
                      }
                      className="bg-green-600 text-white py-4 rounded-full"
                    >
                      Mark Completed
                    </button>

                    <button
                      onClick={() =>
                        updatePaymentStatus(
                          booking.id,
                          "Paid"
                        )
                      }
                      className="bg-blue-600 text-white py-4 rounded-full"
                    >
                      Mark Paid
                    </button>

                    <button
                      onClick={() =>
                        sendPaymentRequest(booking)
                      }
                      className="bg-yellow-500 text-black py-4 rounded-full"
                    >
                      Send Payment Request
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Cancelled"
                        )
                      }
                      className="bg-red-500 text-white py-4 rounded-full"
                    >
                      Cancel Booking
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
