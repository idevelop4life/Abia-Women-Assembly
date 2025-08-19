import { useState } from "react";
import AWA1 from "../../assets/AWA 1.png";
import { useNavigate } from "react-router-dom";
import Kite from "../../assets/kiteimage.png";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VerifyModal from "../VerifyModal/VerifyModal";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

export default function MyDashboard({ userImage, userInfo }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [verifiedOpen, setVerifiedOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const options = ["Option 1", "Option 2", "Option 3"];

  // Event dates
  const eventDates = [
    new Date("2025-07-23"),
    new Date("2025-07-26"),
    new Date("2025-08-05"),
  ];

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const [show, setShow] = useState(false);

  return (
    <div className="mx-10 my-10">
      <h1 className="font-bold text-2xl my-10">Welcome, Grace!</h1>

      <div className="flex flex-row gap-10 justify-center">
        <div className="flex items-center justify-center">
          <img
            className="rounded-full border-4 w-40 h-40"
            src={userImage || "https://via.placeholder.com/150"}
            alt="User"
          />
        </div>

        <div className="flex flex-row items-start border px-6 py-0">
          <div className="my-10 p-3">
            <p>Membership Details</p>
            <p>
              {userInfo.first_name} {userInfo.last_name}
            </p>
            <p>{userInfo.email}</p>
            <p>Status</p>
            {userInfo.is_verified ? (
              <p>Verified Member</p>
            ) : (
              <p>Not Verified</p>
            )}

            <p>ID Number</p>
            <p>AWA-MN0178</p>
          </div>
          <div className="my-10 p-3">
            <div className="border flex justify-start flex-col py-3 px-3 my-3">
              <div className="flex justify-center">
                <img src={AWA1} alt="AWA" className="w-16 h-16" />
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <h2 className="font-bold">MEMBERSHIP ID</h2>
              <div className="flex justify-center items-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MEMBERSHIP-ID-AWA-MN0178"
                  alt="QR Code"
                  className="w-16 h-16 p-1"
                />
              </div>
            </div>

            {!userInfo.is_verified && (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => setVerifiedOpen(true)}
              >
                Become a verified member
              </button>
            )}
            {verifiedOpen && <VerifyModal onClose={() => setVerifiedOpen(false)} />}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[48%]">
          <button
            className="w-full py-4 my-2 rounded-md text-white bg-red-700"
            onClick={() => setShow(true)}
          >
            Update Profile
          </button>

          {/* Custom Tailwind Modal */}
          {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl shadow-lg w-full h-full max-w-4xl md:h-auto md:max-h-[90vh] overflow-y-auto p-6 relative">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShow(false)}
                >
                  ✕
                </button>

                {/* Modal Content */}
                <UpdateProfile
                  userImage={userImage}
                  userInfo={userInfo}
                  onClose={() => setShow(false)}
                />
              </div>
            </div>
          )}

          <button
            className="w-full py-4 bg-green-600 my-2 rounded-md text-white"
            onClick={() => navigate("/BenefitPrograms")}
          >
            Benefit Program
          </button>
        </div>

        <div className="flex flex-col w-[48%] relative">
          <button
            className="w-full p-4 bg-green-950 my-2 rounded-md text-white flex items-center justify-center gap-2"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Calendar size={20} />
            View Events
          </button>

          {showCalendar && (
            <div className="absolute top-[100%] mt-2 z-10">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                dayClassName={(date) => {
                  const hasEvent = eventDates.some((eventDate) =>
                    isSameDay(eventDate, date),
                  );
                  return hasEvent ? "event-day" : undefined;
                }}
              />
            </div>
          )}

          <button
            className="w-full p-4 bg-yellow-500 my-2 rounded-md text-white"
            onClick={() => navigate("/EmpowermentPrograms")}
          >
            Empowerment Program
          </button>
        </div>
      </div>

      <div className="relative w-full h-80 border border-solid border-gray-400 rounded-lg p-4">
        <div className="absolute top-2 right-2">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 min-w-[120px] text-left"
            >
              {selectedOption}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow z-10">
                {options
                  .filter((option) => option !== selectedOption)
                  .map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedOption(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center h-full flex-col p-4">
          <img
            src={Kite}
            alt="Kite illustration"
            className="max-h-full max-w-full object-contain"
          />
          <div className="mt-4">
            <h1 className="text-2xl text-center">
              You have not made any donations yet.
            </h1>
          </div>
        </div>
      </div>
      <style>{`
        .react-datepicker__day.event-day {
          position: relative;
        }
        .react-datepicker__day.event-day::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          height: 6px;
          width: 6px;
          background-color: red;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
