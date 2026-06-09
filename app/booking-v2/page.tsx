"use client";

import LuxuryBackground from "./LuxuryBackground";

export default function BookingV2() {
  const offers = [
    "🔥 Men's Haircut ₹149",
    "🔥 Women's Haircut ₹149",
    "🔥 Honey Wax ₹399",
    "🔥 Keratin ₹2000",
    "🔥 Glow Package ₹1499",
  ];

  const services = [
    { name: "Men's Haircut", price: "₹149", icon: "✂️" },
    { name: "Women's Haircut", price: "₹149", icon: "💇‍♀️" },
    { name: "Hair Spa", price: "₹699", icon: "✨" },
    { name: "Facial", price: "₹999", icon: "🌸" },
    { name: "Keratin", price: "₹2000", icon: "👑" },
    { name: "Waxing", price: "₹399", icon: "💎" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-[#F2E9DB] relative overflow-hidden">

      <LuxuryBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        {/* HERO */}

        <div className="text-center mb-12">

          <div className="inline-block bg-white/80 backdrop-blur-xl px-5 py-3 rounded-full shadow mb-5">
            ✨ Luxury Salon Experience
          </div>

          <p className="tracking-[5px] text-[#C9A227] text-sm font-semibold">
            MR BEAUTY LAND
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-black mt-4">
            Premium Salon
            <br />
            Booking Experience
          </h1>

          <p className="mt-5 text-lg text-black/70">
            Hair • Beauty • Spa • Bridal
          </p>

        </div>

        {/* OFFERS */}

        <div className="flex gap-4 overflow-x-auto pb-4 mb-10">

          {offers.map((item, index) => (

            <div
              key={index}
              className="min-w-[280px] rounded-[30px] p-6 bg-gradient-to-r from-black to-[#C9A227] text-white shadow-2xl"
            >

              <p className="text-sm uppercase">
                Limited Offer
              </p>

              <h3 className="text-2xl font-bold mt-3">
                {item}
              </h3>

              <button className="mt-5 bg-white text-black px-5 py-2 rounded-full">
                Book Now
              </button>

            </div>

          ))}

        </div>

        {/* SEARCH */}

        <div className="mb-8">

          <input
            placeholder="🔍 Search Services..."
            className="w-full bg-white rounded-[25px] px-6 py-5 shadow-xl outline-none"
          />

        </div>

        {/* CATEGORIES */}

        <div className="flex gap-3 overflow-x-auto pb-6">

          {[
            "Men",
            "Women",
            "Hair",
            "Facial",
            "Wax",
            "Packages",
          ].map((cat) => (

            <button
              key={cat}
              className="bg-white px-5 py-3 rounded-full shadow-md whitespace-nowrap"
            >
              {cat}
            </button>

          ))}

        </div>

        {/* SERVICES */}
{cartCount > 0 && (

  <div className="fixed bottom-4 left-4 right-4 z-50">

    <div className="bg-black text-white rounded-[25px] p-4 flex items-center justify-between shadow-2xl">

      <div>

        <p className="text-sm opacity-70">
          Services Selected
        </p>

        <h3 className="text-xl font-bold">
          {cartCount} Service
        </h3>

      </div>

      <button className="bg-white text-black px-6 py-3 rounded-full font-semibold">
        Continue
      </button>

    </div>

  </div>

)}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-[25px] p-5 shadow-xl"
            >

              <div className="text-4xl mb-3">
                {service.icon}
              </div>

              <h3 className="font-bold">
                {service.name}
              </h3>

              <p className="text-[#C9A227] font-bold mt-2">
                {service.price}
              </p>

              <button
  onClick={() => setCartCount(cartCount + 1)}
  className="mt-4 w-full bg-black text-white py-3 rounded-full"
>
  Add
</button>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}