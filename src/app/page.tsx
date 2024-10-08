"use server";
import { Footer } from "./components/footer";
import Navbar from "./components/navbar";
import React from "react";

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <div className="h-lvh bg-teal-400">
      <Navbar />
      <div
        className="bg-teal-400 flex flex-col gap-10 justify-center items-center text-white text-center"
        style={{ height: "95vh" }}
      >
        <div className="text-4xl">Welcome to Easy Cards</div>
        <div className="text-xl">
          Create flashcards with a rich text editor!
        </div>
        <a
          href="/create"
          className="text-xl cursor-pointer bg-cyan-500 rounded-xl px-5 py-3 z-3"
        >
          Create a new set today!
        </a>
      </div>
      <Footer />
    </div>
  );
}
