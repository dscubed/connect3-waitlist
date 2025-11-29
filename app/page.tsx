"use client";

import { BlueCharacter } from "@/components/characters/BlueCharacter";
import { GreenCharacter } from "@/components/characters/GreenCharacter";
import { OrangeCharacter } from "@/components/characters/OrangeCharacter";
import { PurpleCharacter } from "@/components/characters/PurpleCharacter";
import { RedCharacter } from "@/components/characters/RedCharacter";
import { YellowCharacter } from "@/components/characters/YellowCharacter";
import { Logo } from "@/components/logo/Logo";
import { Shapes } from "@/components/shapes/Shapes";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Email:", email);
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
        <div className="flex flex-col items-center gap-12 text-white bg-[#BA84FF] border-2 border-black rounded-lg p-6 drop-shadow-2xl z-10 mx-4">
          <h1 className="text-lg sm:text-xl font-semibold mt-4">
            BE THE FIRST TO CONNECT!
          </h1>

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
