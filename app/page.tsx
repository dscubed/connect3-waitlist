"use client";

import { BlueCharacter } from "@/components/characters/BlueCharacter";
import { GreenCharacter } from "@/components/characters/GreenCharacter";
import { OrangeCharacter } from "@/components/characters/OrangeCharacter";
import { PurpleCharacter } from "@/components/characters/PurpleCharacter";
import { RedCharacter } from "@/components/characters/RedCharacter";
import { YellowCharacter } from "@/components/characters/YellowCharacter";
import { Logo } from "@/components/logo/Logo";
import { Shapes } from "@/components/shapes/Shapes";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const { error } = await supabase
      .from("waitlist_responses")
      .insert([{ name, email }]);

    if (error) {
      toast.error("Internal error. Please try again later.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <Logo size={48} className="absolute top-6 left-6" />
      <main className="relative flex min-h-screen w-full max-w-6xl items-center justify-center py-12 px-6">
        <div className="absolute -z-10">
          <Shapes
            size={648}
            className="opacity-80 animate-bg max-w-full max-h-full"
          />
        </div>
        <div className="relative flex flex-1 min-w-0">
          <BlueCharacter
            size={120}
            className="absolute left-1/2 top-0 transform -translate-x-8 md:-translate-x-4 -translate-y-64 sm:-translate-y-52 animate-float z-20"
          />
          <RedCharacter
            size={180}
            className="absolute hidden sm:block left-0 top-1/2 transform -translate-y-1/2 md:translate-x-12 animate-float-delayed z-20"
          />
          <GreenCharacter
            size={130}
            className="absolute left-1/2 bottom-0 transform -translate-x-8 md:-translate-x-4 translate-y-64 sm:translate-y-52 animate-float-slow z-20"
          />
        </div>
        <div className="flex flex-col items-center gap-10 text-white bg-[#BA84FF] border-2 border-black rounded-lg p-6 drop-shadow-2xl z-10 mx-4">
          <h1 className="text-lg sm:text-xl font-semibold mt-4">
            {submitted ? "THANK YOU FOR JOINING!" : "BE THE FIRST TO CONNECT!"}
          </h1>
          {submitted ? (
            <>
              <p className="text-center max-w-[300px]">
                Thank you, {name && `${name}!`} You&apos;ve been added to our
                waitlist. We will be in contact with you shortly.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-center">Follow us on</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="https://instagram.com/connect3.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/connect3app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-1 flex-col w-full gap-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border-b-2 text-md focus:outline-none px-2 py-1 hover:border-gray-300 transition-all"
                  placeholder="your name"
                ></input>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border-b-2 text-md focus:outline-none px-2 py-1 hover:border-gray-300 transition-all"
                  placeholder="you@example.com"
                ></input>
              </div>
              <button
                className="w-full font-semibold rounded-4xl bg-white border-black border-2 text-[#854ECB] p-3 drop-shadow-lg hover:bg-gray-100 transition-all hover:text-[#56367f]"
                onClick={handleSubmit}
              >
                Join Waitlist
              </button>
            </>
          )}
        </div>
        <div className="relative flex flex-1 min-w-0">
          <PurpleCharacter
            size={100}
            className="absolute right-1/2 top-0 transform translate-x-8 md:translate-x-4 -translate-y-64 sm:-translate-y-52 animate-float-delayed z-20"
          />
          <OrangeCharacter
            size={140}
            className="absolute hidden sm:block right-0 top-1/2 transform -translate-y-1/2 md:-translate-x-14 animate-float z-20"
          />
          <YellowCharacter
            size={100}
            className="absolute right-1/2 bottom-0 transform translate-x-8 md:translate-x-4 translate-y-64 sm:translate-y-52 animate-float-slow z-20"
          />
        </div>
      </main>
    </div>
  );
}
