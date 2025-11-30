"use client";

import { BlueCharacter } from "@/components/characters/BlueCharacter";
import { GreenCharacter } from "@/components/characters/GreenCharacter";
import { OrangeCharacter } from "@/components/characters/OrangeCharacter";
import { PurpleCharacter } from "@/components/characters/PurpleCharacter";
import { RedCharacter } from "@/components/characters/RedCharacter";
import { YellowCharacter } from "@/components/characters/YellowCharacter";
import { Logo } from "@/components/logo/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { useLogSnag } from '@logsnag/next';
import { useSearchParams } from "next/navigation";
import { Gradient } from '@/components/gradient.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { setUserId, track, identify } = useLogSnag();
  const searchParams = useSearchParams();
  const UTMSource = searchParams.get("utm_source");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const gradient = new Gradient()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')

    const calculateTimeLeft = () => {
    const targetDate = new Date('2026-01-16T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [])

  const handleSubmit = async () => {
    setSubmitting(true);
    if (!name) {
      toast.error("Please enter your name.");
      setSubmitting(false);
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      setSubmitting(false);
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("waitlist_responses")
      .insert([{ name, email }]);

    if (error) {
      toast.error("Internal error. Please try again later.");
      setSubmitting(false);
      return;
    }

    setUserId(email);

    track({
      channel: "waitlist",
      event: "New Waitlist Signup",
      icon: "🎉",
      notify: true,
      tags: {
        utm_source: UTMSource || "unknown",
      }
    });

    identify({
      properties: {
        email,
        acquisition_source: "waitlist",
        utm_source: UTMSource || "unknown",
      }
    });
    
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center font-sans">
      {/* Mesh gradient */}
      <canvas id="gradient-canvas" data-transition-in className="absolute inset-0 -z-20 opacity-40 blur-xl" />

      <div className="absolute inset-0 p-4 flex gap-4 justify-between items-center h-max z-100">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <Logo size={28} className="top-6 left-6" />
          <p>Connect3</p>
        </div>

        <div className="space-x-6 text-sm mr-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/dscubed/" target="_blank">DSCubed</Link>
          <Link href="https://www.uwastudentguild.com/clubs/data-science-club-of-uwa" target="_blank">DSC</Link>
        </div>
      </div>

      <main className="relative flex min-h-screen w-full max-w-6xl items-center justify-center py-12 px-6">
        {/* Characters */}
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

        {/* Card */}
        <div className="relative flex flex-col text-center gap-4 max-w-sm bg-white rounded-2xl p-4 z-10 shadow-xl">
          {/* Countdown */}
          <div className="flex gap-2 justify-center text-sm">
            <div className="flex flex-col items-center bg-purple-50 rounded-lg px-3 py-2">
              <span className="font-bold text-lg">{timeLeft.days}</span>
              <span className="text-xs text-neutral-600">days</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg px-3 py-2">
              <span className="font-bold text-lg">{timeLeft.hours}</span>
              <span className="text-xs text-neutral-600">hours</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg px-3 py-2">
              <span className="font-bold text-lg">{timeLeft.minutes}</span>
              <span className="text-xs text-neutral-600">mins</span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg px-3 py-2">
              <span className="font-bold text-lg">{timeLeft.seconds}</span>
              <span className="text-xs text-neutral-600">secs</span>
            </div>
          </div>

          {/* Title and description */}
          {!submitted && (
            <>
              <h1 className="text-xl sm:text-2xl font-medium">
                Launching Soon
              </h1>
              <p className="">
                Be the first to know when we launch and receive weekly event recommendations.
              </p>
            </>
          )}

          {submitted && (
            <>
              <h1 className="text-xl sm:text-2xl font-medium">
                Hooray, you&apos;re in!
              </h1>
              <p className="px-3">
                Thank you so much for your interest, it means a lot to us. We&apos;ll be in touch soon!
              </p>
            </>
          )}

          {/* Form */}
          {!submitted && (
            <div className="flex flex-1 flex-col w-full gap-4 my-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full bg-neutral-100 px-4 py-2 text-md focus:outline-2 focus:outline-purple-200"
                placeholder="Name"
              ></input>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full bg-neutral-100 px-4 py-2 text-md focus:outline-2 focus:outline-purple-200"
                placeholder="you@example.com"
              ></input>
              <button
                disabled={submitting}
                className="w-full px-4 py-2 font-medium rounded-full bg-black text-white transition-transform hover:scale-95 cursor-pointer"
                onClick={handleSubmit}
              >
                Keep me updated
              </button>
            </div>
          )}

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-center font-medium">Follow us on</p>
            <div className="flex gap-4 justify-center">
              <Link
                className="flex justify-center w-full bg-pink-100 text-pink-600 rounded-full p-2 hover:scale-95 transition-transform"
                href="https://instagram.com/connect3.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={28} />
              </Link>
              <Link
                className="flex justify-center w-full bg-blue-100 text-blue-600 rounded-full p-2 hover:scale-95 transition-transform"
                href="https://www.linkedin.com/company/connect3app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={28} />
              </Link>
            </div>
          </div>
        </div>

        {/* Characters */}
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
