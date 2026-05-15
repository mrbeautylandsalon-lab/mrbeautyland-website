"use client";

import { useState } from "react";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, provider } from "../firebase";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful 😎🔥");

      if (
  result.user.email ===
  "mrbeautylandsalon@gmail.com"
) {

  window.location.href = "/dashboard";

} else {

  window.location.href =
    "/customer-dashboard";

}

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");

    }

  };

  const googleLogin = async () => {

    try {

      const result = await signInWithPopup(auth, provider);

      alert("Google Login Successful 😎🔥");

      if (
  result.user.email ===
  "mrbeautylandsalon@gmail.com"
) {

  window.location.href = "/dashboard";

} else {

  window.location.href =
    "/customer-dashboard";

}

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");

    }

  };

  return (

    <main className="min-h-screen bg-[#f7f1eb] flex items-center justify-center px-6 py-10">

      <div className="max-w-5xl w-full bg-white rounded-[40px] p-8 md:p-16 grid md:grid-cols-2 gap-14 shadow-sm">

        {/* LOGIN FORM */}
        <div>

          <p className="uppercase tracking-[5px] text-sm text-neutral-500 mb-4">
            Welcome Back
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-10 leading-tight">
            Login To Your Account
          </h1>

          <div className="grid gap-5">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-5 rounded-2xl bg-[#f7f1eb] outline-none text-black placeholder:text-neutral-500"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-6 py-5 rounded-2xl bg-[#f7f1eb] outline-none text-black placeholder:text-neutral-500"
            />

            <button
              onClick={loginUser}
              className="bg-black text-white py-5 rounded-full text-lg hover:scale-[1.02] transition duration-300"
            >
              Login
            </button>

            <button
              onClick={googleLogin}
              className="bg-[#f7f1eb] text-black py-5 rounded-full text-lg hover:bg-black hover:text-white transition duration-300"
            >
              Continue With Google
            </button>

          </div>

        </div>

        {/* SIDE CONTENT */}
        <div className="flex flex-col justify-center">

          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8">
            Manage Your Luxury Salon Experience
          </h2>

          <div className="grid gap-5 text-lg text-black">

            <div>✔ View Your Bookings</div>

            <div>✔ Track Payment Status</div>

            <div>✔ Manage Appointments</div>

            <div>✔ Access Premium Offers</div>

            <div>✔ Get Appointment Updates</div>

          </div>

        </div>

      </div>

    </main>
  );
}