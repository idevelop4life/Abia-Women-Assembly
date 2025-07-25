import React from "react";

export default function Touch() {
  return (
    <div className="flex flex-col mx-10 my-10 px-20">
      <h1 className="text-2xl font-bold">Get in Touch</h1>
      <input
        className="border my-10 border-black rounded-lg"
        type="text"
        placeholder="Your Name"
      />
      <textarea
        placeholder="Your Message"
        className="w-full p-4 text-lg h-32 border border-black rounded-lg"
      ></textarea>
      <button className="w-fit bg-[#C9302A] text-white py-1 px-3 rounded text-sm mt-4 self-end">
        Send
      </button>
    </div>
  );
}
