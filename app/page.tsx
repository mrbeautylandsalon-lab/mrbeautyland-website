"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
const [showReferralPopup, setShowReferralPopup] =
  useState(false);
const [referralEmail, setReferralEmail] =
  useState("");
const [showScissor, setShowScissor] =
  useState(false);
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {

        setLoggedIn(true);

      } else {

        setLoggedIn(false);

      }

    });

    return () => unsubscribe();

  }, []);
useEffect(() => {

  const timer =
    setTimeout(() => {

      setShowScissor(true);

      setTimeout(() => {

        setShowReferralPopup(true);

      }, 2500);

    }, 5000);

  return () =>
    clearTimeout(timer);

}, []);
  return (

    <main className="bg-[#f7f1eb] text-black min-h-screen overflow-hidden">


{/* NAVBAR */}
<nav className="fixed top-0 left-0 w-full bg-[#f7f1eb]/95 backdrop-blur border-b border-neutral-200 z-50">

  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

    {/* LEFT */}
    <div className="flex items-center gap-3">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-3xl font-bold"
      >
        ☰
      </button>

      {/* LOGO */}
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-10 h-10 rounded-full object-cover"
      />

      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        MR BEAUTYLAND
      </h1>

    </div>

    {/* DESKTOP MENU */}
<div className="hidden md:flex items-center gap-8 font-medium">

  <a href="#home" className="hover:text-neutral-500 transition">
    Home
  </a>

  <a href="#services" className="hover:text-neutral-500 transition">
    Services
  </a>

  <a href="#contact" className="hover:text-neutral-500 transition">
    Contact
  </a>

  {
    loggedIn ? (

      <Link
        href="/customer-dashboard"
        className="bg-black text-white px-6 py-3 rounded-full"
      >
        Dashboard
      </Link>

    ) : (

      <Link
        href="/login"
        className="bg-black text-white px-6 py-3 rounded-full"
      >
        Login
      </Link>

    )
  }

</div>

{/* MOBILE LOGIN */}
<div className="md:hidden">

  {
    loggedIn ? (

      <Link
        href="/customer-dashboard"
        className="bg-black text-white px-4 py-2 rounded-full text-sm"
      >
        Dashboard
      </Link>

    ) : (

      <Link
        href="/login"
        className="bg-black text-white px-4 py-2 rounded-full text-sm"
      >
        Login
      </Link>

    )
  }

</div>
  </div>

  {/* MOBILE MENU */}
  {
    menuOpen && (

      <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-6 flex flex-col gap-5 text-lg font-medium shadow-xl">

        <a href="#home">
          Home
        </a>

        <a href="#services">
          Services
        </a>

        <a href="#contact">
          Contact
        </a>

      </div>

    )
  }

</nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen pt-28 flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/luxuryhero.png')",
        }}
      >

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 max-w-5xl">

          <p className="uppercase tracking-[6px] text-sm text-white/70 mb-6">
            Best Unisex Salon in Bikaner
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
            Luxury Hair <br /> & Beauty Experience
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-8 mb-10">
            Premium grooming, hair styling, beauty treatments and luxury salon
            experience crafted for elegance and confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <a
              href="#services"
              className="bg-white text-black px-8 py-4 rounded-full text-lg hover:scale-105 transition inline-block"
            >
              Explore Services
            </a>

            <a
              href="/booking"
              className="border border-white text-white px-8 py-4 rounded-full text-lg hover:bg-white hover:text-black transition inline-block"
            >
              Book Appointment
            </a>

          </div>

        </div>

      </section>
{/* WHY CHOOSE US */}
<section className="px-6 md:px-12 py-28">

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    <div>

      <img
        src="/images/whychooseus.png"
        alt="Why Choose Us"
        className="rounded-[40px] w-full"
      />

    </div>

    <div>

      <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
        Why Choose Us
      </p>

      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
        Premium Luxury Salon Experience
      </h2>

      <p className="text-lg leading-9 text-neutral-700 mb-10">
        MR BEAUTYLAND offers premium grooming, luxury beauty services,
        hair styling, skincare, body spa and modern salon experience
        with professional experts.
      </p>

      <div className="grid gap-5 text-lg">

        <div>✔ Luxury Salon Ambience</div>

        <div>✔ Professional Hair Stylists</div>

        <div>✔ Bridal Makeup Experts</div>

        <div>✔ Premium Grooming Services</div>

        <div>✔ Hair Spa & Skincare Treatments</div>

      </div>

    </div>

  </div>

</section>
{/* SERVICES SECTION */}
<section
  id="services"
  className="bg-white px-6 md:px-12 py-28"
>

  <div className="text-center mb-20">

    <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
      Premium Salon Services
    </p>

    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5">
      Limited Period Offers ✨
    </h2>

    <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-8">
      Luxury grooming and beauty experiences crafted for elegance,
      confidence and premium salon lifestyle.
    </p>

    <a
      href="#allservices"
      className="inline-block w-full sm:w-auto mt-8 bg-black text-white px-8 py-4 rounded-full text-base hover:scale-105 transition"
    >
      View All 200+ Services
    </a>

  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    {[
      [
        "MEN'S HAIRCUT",
        "₹350",
        "₹250"
      ],

      [
        "BEARD TRIM",
        "₹250",
        "₹150"
      ],

      [
        "O3+ FACIAL",
        "₹1500",
        "₹999"
      ],

      [
        "HAIR SPA",
        "₹1400",
        "₹999"
      ],

      [
        "KERATIN",
        "₹3200",
        "₹2500"
      ],

      [
        "NANOPLASTIA",
        "₹4500",
        "₹3000"
      ],

    ].map((service, index) => (

      <div
        key={index}
        className="bg-[#f7f1eb] p-6 rounded-[30px] hover:-translate-y-2 transition duration-300 relative overflow-hidden"
      >

        <div className="absolute top-4 right-4 bg-black text-white text-[10px] px-3 py-1 rounded-full tracking-wide">
          LIMITED OFFER
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {service[0]}
        </h3>

        <div className="flex items-center gap-4 mb-6">

          <span className="text-neutral-400 line-through text-xl">
            {service[1]}
          </span>

          <span className="text-3xl font-bold text-[#b8860b]">
            {service[2]}
          </span>

        </div>

        

        <a
          href="/booking"
          className="bg-black text-white px-5 py-2.5 rounded-full inline-block text-sm hover:scale-105 transition"
        >
          BOOK NOW
        </a>

      </div>

    ))}

  </div>

</section>

{/* ALL SERVICES */}
<section
  id="allservices"
  className="px-6 md:px-12 py-28 bg-[#f7f1eb]"
>

  <div className="text-center mb-20">

    <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
      Full Menu
    </p>

    <h2 className="text-3xl sm:text-5xl font-bold">
      Explore 200+ Services
    </h2>

  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">

    {[
      "MEN SERVICES",
      "FACIAL SERVICES",
      "HAIR SERVICES",
      "WAX SERVICES",
      "D-TAN SERVICES",
      "BLEACH SERVICES",
      "SPA SERVICES",
      "BRIDAL SERVICES",
    ].map((category, index) => (

      <div
        key={index}
        className="bg-white rounded-[28px] p-5 hover:shadow-xl transition"
      >

        <h3 className="text-2xl font-bold mb-3">
          {category}
        </h3>

       

        <a
          href="/booking"
          className="bg-black text-white px-5 py-2 rounded-full inline-block text-sm"
        >
          Explore
        </a>

      </div>

    ))}

  </div>

</section>
{/* GALLERY SECTION */}
<section className="px-6 md:px-12 py-28">

  <div className="text-center mb-20">

    <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
      Transformations
    </p>

    <h2 className="text-5xl font-bold">
      Our Premium Work
    </h2>

  </div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

    {[
      "/images/work1.png",
      "/images/work2.png",
      "/images/work3.png",
      "/images/work4.png",
      "/images/work5.png",
      "/images/work6.png",
    ].map((img, index) => (

      <img
        key={index}
        src={img}
        alt="Salon Work"
        className="rounded-[30px] h-[350px] object-cover w-full hover:scale-[1.02] transition duration-300"
      />

    ))}

  </div>

</section>
{/* PREMIUM STATS */}
<section className="bg-black text-white px-6 md:px-12 py-24">

  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">

    <div>

      <h2 className="text-5xl font-bold mb-4">
        100+
      </h2>

      <p className="text-white/70">
        Happy Clients
      </p>

    </div>

    <div>

      <h2 className="text-5xl font-bold mb-4">
        5★
      </h2>

      <p className="text-white/70">
        Luxury Rating
      </p>

    </div>

    <div>

      <h2 className="text-5xl font-bold mb-4">
        1 Month
      </h2>

      <p className="text-white/70">
        Open Salon
      </p>

    </div>

    <div>

      <h2 className="text-5xl font-bold mb-4">
        Premium
      </h2>

      <p className="text-white/70">
        Grooming Experience
      </p>

    </div>

  </div>

</section>
{/* REVIEWS SECTION */}
<section className="px-6 md:px-12 py-28 bg-white">

  <div className="text-center mb-20">

    <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
      Testimonials
    </p>

    <h2 className="text-5xl font-bold">
      What Our Clients Say
    </h2>

  </div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

    <div className="bg-[#f7f1eb] p-10 rounded-[35px]">

      <p className="text-lg leading-8 text-neutral-700 mb-8">
        Amazing salon experience with professional staff and luxury ambience.
      </p>

      <h3 className="text-2xl font-bold">
        Rahul Sharma
      </h3>

    </div>

    <div className="bg-[#f7f1eb] p-10 rounded-[35px]">

      <p className="text-lg leading-8 text-neutral-700 mb-8">
        Best unisex salon in Bikaner with premium grooming and modern styling.
      </p>

      <h3 className="text-2xl font-bold">
        Priya Verma
      </h3>

    </div>

    <div className="bg-[#f7f1eb] p-10 rounded-[35px]">

      <p className="text-lg leading-8 text-neutral-700 mb-8">
        Loved the luxury service quality and professional beauty treatments.
      </p>

      <h3 className="text-2xl font-bold">
        Vanshika Jain
      </h3>

    </div>

  </div>

</section>
{/* CONTACT SECTION */}
<div className="mt-10">

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.446702449136!2d73.33092957414124!3d28.01081971204387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fe7768f4cf3d1%3A0x66b8d33c54e5dc7e!2sMR%20Beauty%20Land!5e0!3m2!1sen!2sin!4v1778667432035!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    loading="lazy"
    className="rounded-[35px]"
  ></iframe>

</div>
<section
  id="contact"
  className="bg-white px-6 md:px-12 py-28"
>

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    <div>

      <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
        Contact Us
      </p>

      <h2 className="text-3xl md:text-5xl font-bold mb-8 break-words">
        Get In Touch
      </h2>

      <div className="grid gap-6">

        <input
          type="text"
          value={referralEmail}

onChange={(e) =>
  setReferralEmail(
    e.target.value
  )
}
          placeholder="Name"
          className="px-6 py-4 rounded-2xl bg-[#f7f1eb] outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="px-6 py-4 rounded-2xl bg-[#f7f1eb] outline-none"
        />

        <textarea
          placeholder="Message"
          className="px-6 py-4 rounded-2xl bg-[#f7f1eb] outline-none h-[180px]"
        ></textarea>

        <button className="bg-black text-white py-4 rounded-full text-lg">
          Send
        </button>

      </div>

    </div>

    <div>

      <img
        src="/images/reception.png"
        alt="Reception"
        className="rounded-[40px] w-full"
      />

    </div>

  </div>

</section>
{/* CANCELLATION POLICY */}
<section className="px-6 md:px-12 py-28">

  <div className="max-w-5xl mx-auto bg-white p-12 rounded-[40px]">

    <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
      Cancellation Policy
    </p>

    <h2 className="text-5xl font-bold mb-8">
      Appointment Policy
    </h2>

    <p className="text-base md:text-lg leading-8 md:leading-9 text-neutral-700 mb-10 break-words">
      Cancellations for hair and grooming, makeup services, and other salon
      services are accepted up to 24 hours before the scheduled appointment.
      If you cancel within 24 hours of the service, a fee of 50% of the
      scheduled cost will apply.
    </p>

    <a
      href="https://wa.me/918890781097"
      target="_blank"
      className="bg-black text-white px-8 py-4 rounded-full inline-block hover:scale-105 transition"
    >
      BOOK ON WHATSAPP
    </a>

  </div>

</section>

{/* WORKING HOURS */}
<section className="bg-white px-6 md:px-12 py-28">

  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-20">

      <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
        Salon Timings
      </p>

      <h2 className="text-5xl font-bold">
        Working Hours
      </h2>

    </div>

    <div className="bg-[#f7f1eb] rounded-[40px] p-10 md:p-14">

      <div className="grid gap-6 text-lg">

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Mon</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Tue</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Wed</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Thu</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Fri</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between border-b border-neutral-200 pb-4">
          <span>Sat</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

        <div className="flex justify-between">
          <span>Sun</span>
          <span>09:00 am – 09:00 pm</span>
        </div>

      </div>

    </div>

  </div>

</section>

{/* FAQ SECTION */}
<section className="px-6 md:px-12 py-28">

  <div className="max-w-5xl mx-auto">

    <div className="text-center mb-20">

      <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
        FAQs
      </p>

      <h2 className="text-5xl font-bold">
        Frequently Asked Questions
      </h2>

    </div>

    <div className="grid gap-6">

      <div className="bg-white p-8 rounded-[30px]">

        <h3 className="text-2xl font-bold mb-4">
          Do I need an appointment?
        </h3>

        <p className="text-lg leading-8 text-neutral-700">
          Walk-ins are welcome, but appointments are recommended for premium salon services.
        </p>

      </div>

      <div className="bg-white p-8 rounded-[30px]">

        <h3 className="text-2xl font-bold mb-4">
          Which payment methods are accepted?
        </h3>

        <p className="text-lg leading-8 text-neutral-700">
          We accept UPI, cards, cash and online payments for all salon services.
        </p>

      </div>

      <div className="bg-white p-8 rounded-[30px]">

        <h3 className="text-2xl font-bold mb-4">
          Do you provide bridal makeup services?
        </h3>

        <p className="text-lg leading-8 text-neutral-700">
          Yes, we offer luxury bridal makeup packages and premium beauty treatments.
        </p>

      </div>

    </div>

  </div>

</section>

{/* NEWSLETTER SECTION */}
<section className="bg-black text-white px-6 md:px-12 py-28">

  <div className="max-w-5xl mx-auto text-center">

    <p className="uppercase tracking-[5px] text-sm text-white/60 mb-4">
      Social
    </p>

    <h2 className="text-5xl font-bold mb-8">
      Stay on the Cutting-Edge
    </h2>

    <p className="text-lg text-white/70 leading-8 mb-10">
      Sign up to hear from us about specials, sales, events, and fashion tips,
      including the latest in hair and grooming, makeup services, and salon services.
    </p>

    <div className="flex flex-col md:flex-row gap-5">

      <input
        type="email"
        placeholder="Email Address"
        className="flex-1 px-6 py-5 rounded-full text-black outline-none"
      />

      <button className="bg-white text-black px-10 py-5 rounded-full font-semibold">
        Sign Up
      </button>

    </div>

  </div>

</section>
{/* FOOTER */}
<footer className="bg-[#111111] text-white px-6 md:px-12 py-20">

  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-14">

    <div>

      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-16 h-16 rounded-full mb-6"
      />

      <h2 className="text-3xl font-bold mb-5">
        MR BEAUTYLAND
      </h2>

      <p className="leading-8 text-white/70">
        Best Unisex Salon in Bikaner offering luxury hair,
        beauty and grooming services.
      </p>

    </div>

    <div>

      <h3 className="text-2xl font-bold mb-6">
        Contact
      </h3>

      <div className="grid gap-4 text-white/70">

        <p>+91 9414625823</p>

        <p>+91 8890781097</p>

        <p>mrbeautylandsalon@gmail.com</p>

      </div>

    </div>

    <div>

      <h3 className="text-2xl font-bold mb-6">
        Address
      </h3>

      <p className="leading-8 text-white/70">
        OPP. FIRSTCRY, PACHSHATI CIRCLE,
        BIKANER, RAJASTHAN
      </p>

    </div>

    <div>

      <h3 className="text-2xl font-bold mb-6">
        Services
      </h3>

      <div className="grid gap-4 text-white/70">

        <p>Hair Cut</p>

        <p>Hair Spa</p>

        <p>Body Spa</p>

        <p>Bridal Makeup</p>

      </div>

    </div>

  </div>

  <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/50">
    © 2026 MR BEAUTYLAND — Luxury Unisex Salon
  </div>

</footer>

{/* FLOATING WHATSAPP BUTTON */}
<a
  href="https://wa.me/917073937995"
  target="_blank"
  className="fixed bottom-6 right-6 bg-black text-white px-6 py-4 rounded-full shadow-2xl z-50 hover:scale-105 transition"
>
  WhatsApp
</a>
{/* SCISSOR */}

{showScissor && !showReferralPopup && (

<div className="scissor-animation">

  <div className="scissor-icon">
    ✂️

  </div>

</div>

)}

{/* REFERRAL POPUP */}

{showReferralPopup && (

  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5">

    <div className="bg-white max-w-md w-full rounded-[35px] p-8 relative text-center animate-[popupScale_0.4s_ease]">

      <button
        onClick={() => {
          setShowReferralPopup(false);
          setShowScissor(false);
        }}
        className="absolute top-4 right-4 text-2xl"
      >
        ✕
      </button>

      <div className="text-6xl mb-5 animate-bounce">
        🎁
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">

        Refer Your Friend
        & Earn 50 Loyalty Points ✨

      </h2>

      <p className="text-neutral-600 leading-7 mb-8">

        Your friend also gets
        50 loyalty points 😎🔥

      </p>

      <input
        type="text"
        placeholder="Enter Your Gmail"
        className="w-full bg-[#f7f1eb] px-6 py-4 rounded-full outline-none mb-5"
      />

      <div className="grid gap-4">

        <button
          className="bg-black text-white py-4 rounded-full"
        >
          Generate Referral Link
        </button>

        <a
          href="/booking"
          className="bg-[#f7f1eb] py-4 rounded-full"
        >
          Book Appointment
        </a>

      </div>

    </div>

  </div>

)}
    </main>
  );
}
