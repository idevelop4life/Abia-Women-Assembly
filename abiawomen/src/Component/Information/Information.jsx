import React from "react";

function AllowUpcomingEvents({ isSignedIn }) {
  if (isSignedIn) {
    return (
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Upcoming Events</h1>
        </div>
        <div className="w-full overflow-x-auto py-4 flex flex-row">
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
          <div className="bg-[#FBE7AA] px-4 mx-4 py-4">
            <h3 className="text-2xl font-bold">Leadership Workship</h3>
            <p>August 20, 2025</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default function Information() {
  return (
    <div className="flex flex-col mx-10 my-10 px-20">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl">About AWA</h1>
        <p className="text-sm">
          Abia Women Assembly is dedicated to advocating for the empowerment and
          growth of women in our communities.
        </p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-3 my-10">
          <div className="flex-1 flex flex-col items-center p-6 bg-[#7A9736] rounded-xl">
            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Empowerment</h3>
            <p className="text-black text-center">
              Building confidence and skills for personal growth
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center p-6 bg-[#C8352F] rounded-xl shadow-md">
            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Growth</h3>
            <p className="text-black text-center">
              Continuous development and achievement
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center p-6 bg-[#EBC52C] rounded-xl">
            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Community</h3>
            <p className="text-black text-center">
              Supportive network for shared success
            </p>
          </div>
        </div>
      </div>
      <AllowUpcomingEvents isSignedIn={true} />
    </div>
  );
}
