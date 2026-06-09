"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Users,
  Calendar,
  IndianRupee,
  Clock3,
  User,
  Sparkles,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react";

import { supabase } from "../supabase";

const services = [
  {
    name: "Male Hair Cut",
    price: 199,
    gender: "Male",
  },

  {
    name: "Beard Trim",
    price: 99,
    gender: "Male",
  },

  {
    name: "Female Hair Cut",
    price: 500,
    gender: "Female",
  },

  {
    name: "Body Spa",
    price: 1499,
    gender: "Female",
  },

  {
    name: "Body Massage",
    price: 1299,
    gender: "Female",
  },
];

const staffMembers = [
  "Vikram",
  "Aman",
  "Rohit",
  "Sahil",
];

export default function AdminPage() {
  const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
    alert("Logout Failed");
  }
};
  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [gender, setGender] =
    useState("Male");

  const [selectedService, setSelectedService] =
    useState("");

  const [staff, setStaff] = useState("");

  const [price, setPrice] = useState(0);

  const [slot, setSlot] = useState("");

  const [bookings, setBookings] = useState<
    any[]
  >([]);

  const [addOns, setAddOns] = useState<
    any[]
  >([]);

  const [addonName, setAddonName] =
    useState("");

  const [addonPrice, setAddonPrice] =
    useState("");

  const filteredServices = services.filter(
    (service) => service.gender === gender
  );

  const finalAmount =
    price +
    addOns.reduce(
      (acc, addon) => acc + addon.price,
      0
    );

  const loyaltyPoints =
    Math.floor(finalAmount / 100) * 10;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setBookings(data);
    }
  };

  const handleServiceChange = (
    serviceName: string
  ) => {
    setSelectedService(serviceName);

    const service = services.find(
      (item) => item.name === serviceName
    );

    if (service) {
      setPrice(service.price);
    }
  };

  const addAddon = () => {
    if (!addonName || !addonPrice)
      return;

    setAddOns([
      ...addOns,

      {
        name: addonName,
        price: Number(addonPrice),
      },
    ]);

    setAddonName("");
    setAddonPrice("");
  };

  const createBooking = async () => {
    if (
      !customerName ||
      !phone ||
      !email ||
      !selectedService ||
      !staff ||
      !slot
    ) {
      alert("Fill all fields");
      return;
    }

    const alreadyBooked = bookings.find(
      (item) => item.slot === slot
    );

    if (alreadyBooked) {
      alert("Slot already booked");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: customerName,

          phone,

          email,

          gender,

          service: selectedService,

          assigned_staff: staff,

          amount: finalAmount,

          loyalty_points: loyaltyPoints,

          payment_status: "Pending",

          booking_status: "Completed",

          slot,

          addons: JSON.stringify(addOns),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Booking Created");

    setCustomerName("");
    setPhone("");
    setEmail("");
    setSelectedService("");
    setStaff("");
    setPrice(0);
    setSlot("");
    setAddOns([]);

    fetchBookings();
  };

  const markPaid = async (id: number) => {
    await supabase
      .from("bookings")
      .update({
        payment_status: "Paid",
      })
      .eq("id", id);

    fetchBookings();
  };

  const totalRevenue = bookings.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  return (
    <div className="min-h-screen bg-[#f4efe8] text-black flex">
      {/* SIDEBAR */}

      <div className="w-[260px] bg-black text-white p-6 flex flex-col gap-5">

        <h1 className="text-3xl font-bold mb-10">
          MR BEAUTY LAND
        </h1>

        <div className="flex items-center gap-3">
          <Calendar />
          Dashboard
        </div>

        <div className="flex items-center gap-3">
          <Users />
          Customers
        </div>

        <div className="flex items-center gap-3">
          <IndianRupee />
          Revenue
        </div>

        <div className="flex items-center gap-3">
          <Clock3 />
          Slots
        </div>

        <div className="flex items-center gap-3">
          <User />
          Staff
        </div>

        <div className="flex items-center gap-3">
          <Sparkles />
          Loyalty
        </div>

        <div className="flex items-center gap-3">
          <Bell />
          Notifications
        </div>

        <div className="flex items-center gap-3">
          <CreditCard />
          Payments
        </div>

        <div className="flex items-center gap-3">
          <Shield />
          Settings
        </div>
<button
  onClick={handleLogout}
  className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-2xl font-semibold"
>
  🚪 Logout
</button>
      </div>

      {/* MAIN */}

      <div className="flex-1 p-8">

        <h1 className="text-6xl font-bold mb-10">
          Luxury Admin Panel
        </h1>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-5 mb-10">

          <div className="bg-white rounded-3xl p-6">
            <h2>Total Bookings</h2>

            <p className="text-5xl font-bold mt-3">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h2>Total Revenue</h2>

            <p className="text-5xl font-bold mt-3">
              ₹{totalRevenue}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h2>Pending Payments</h2>

            <p className="text-5xl font-bold mt-3">
              {
                bookings.filter(
                  (b) =>
                    b.payment_status ===
                    "Pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h2>Loyalty Issued</h2>

            <p className="text-5xl font-bold mt-3">
              {bookings.reduce(
                (acc, item) =>
                  acc +
                  Number(
                    item.loyalty_points
                  ),
                0
              )}
            </p>
          </div>

        </div>

        {/* BOOKING FORM */}

        <div className="bg-white rounded-3xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8">
            Walk-In Booking
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              className="border rounded-2xl p-4"
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="border rounded-2xl p-4"
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border rounded-2xl p-4"
            />

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              className="border rounded-2xl p-4"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              value={selectedService}
              onChange={(e) =>
                handleServiceChange(
                  e.target.value
                )
              }
              className="border rounded-2xl p-4"
            >
              <option value="">
                Select Service
              </option>

              {filteredServices.map(
                (service) => (
                  <option
                    key={service.name}
                    value={service.name}
                  >
                    {service.name}
                  </option>
                )
              )}
            </select>

            <select
              value={staff}
              onChange={(e) =>
                setStaff(e.target.value)
              }
              className="border rounded-2xl p-4"
            >
              <option value="">
                Assign Staff
              </option>

              {staffMembers.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <input
              placeholder="Slot Example 4PM"
              value={slot}
              onChange={(e) =>
                setSlot(e.target.value)
              }
              className="border rounded-2xl p-4"
            />

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(
                  Number(e.target.value)
                )
              }
              className="border rounded-2xl p-4"
            />

          </div>

          {/* ADDONS */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-5">
              Add-On Services
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              <input
                placeholder="Addon Name"
                value={addonName}
                onChange={(e) =>
                  setAddonName(
                    e.target.value
                  )
                }
                className="border rounded-2xl p-4"
              />

              <input
                type="number"
                placeholder="Addon Price"
                value={addonPrice}
                onChange={(e) =>
                  setAddonPrice(
                    e.target.value
                  )
                }
                className="border rounded-2xl p-4"
              />

              <button
                onClick={addAddon}
                className="bg-black text-white rounded-2xl"
              >
                Add Addon
              </button>

            </div>

            <div className="mt-6 space-y-3">

              {addOns.map((addon, index) => (

                <div
                  key={index}
                  className="bg-[#f5f5f5] rounded-2xl p-4 flex justify-between"
                >
                  <span>{addon.name}</span>

                  <span>
                    ₹{addon.price}
                  </span>
                </div>

              ))}

            </div>

          </div>

          {/* FINAL */}

          <div className="mt-10">

            <h2 className="text-5xl font-bold">
              ₹{finalAmount}
            </h2>

            <p className="text-2xl mt-3">
              Loyalty Points:
              {" "}
              {loyaltyPoints}
            </p>

            <button
              onClick={createBooking}
              className="mt-6 bg-black text-white px-10 py-5 rounded-2xl text-xl"
            >
              Create Booking
            </button>

          </div>

        </div>

        {/* BOOKINGS */}

        <div className="bg-white rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">
            All Bookings
          </h2>

          <div className="space-y-5">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="border rounded-3xl p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-3xl font-bold">
                      {
                        booking.customer_name
                      }
                    </h2>

                    <p>
                      {booking.service}
                    </p>

                    <p>
                      Staff:
                      {" "}
                      {
                        booking.assigned_staff
                      }
                    </p>

                    <p>
                      Slot:
                      {" "}
                      {booking.slot}
                    </p>

                    <p>
                      ₹{booking.amount}
                    </p>

                    <p>
                      Points:
                      {" "}
                      {
                        booking.loyalty_points
                      }
                    </p>

                    <p>
                      {
                        booking.payment_status
                      }
                    </p>

                  </div>

                  <div>

                    {booking.payment_status ===
                      "Pending" && (

                      <button
                        onClick={() =>
                          markPaid(
                            booking.id
                          )
                        }
                        className="bg-green-600 text-white rounded-2xl px-6 py-3"
                      >
                        Mark Paid
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}