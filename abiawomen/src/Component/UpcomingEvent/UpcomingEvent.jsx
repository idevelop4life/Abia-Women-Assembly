import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:9000/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        });
        const data = await res.json();
        setEvents(data.data);
      } catch (err) {
        console.error("Error fetching events:", err.message);
      }
    };

    fetchEvents();
  }, []);

  const today = new Date();

  const upcomingEvents = Array.isArray(events)
    ? events.filter((event) => new Date(event.event_date) >= today)
    : [];

  const pastEvents = Array.isArray(events)
    ? events.filter((event) => new Date(event.event_date) < today)
    : [];

  const categoryColors = {
    Empowerment: "#7A9736",
    Growth: "#E02B2B",
    Community: "#FFD700",
  };

  const renderEvent = (event) => {
    const tagColor = categoryColors[event.category] || "#7A9736"; // default green if none

    return (
      <div key={event.id} className="my-5 border border-black">
        <div className="px-4 py-2">
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-gray-600">
            {new Date(event.event_date).toLocaleDateString()}
          </p>
          <div className="flex flex-col justify-between items-start">
            <button
              style={{ backgroundColor: tagColor }}
              className="text-white px-4 py-2 rounded"
            >
              {event.category || "Event"}
            </button>
            <button
              className="self-end bg-[#A7130F] text-white px-4 py-2 rounded"
              onClick={() => navigate(`/EventDetail/${event.id}`)} // <-- fixed to match the route
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="pt-20 pb-5 px-10">
        <h1 className="text-3xl font-bold">Events</h1>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      <div className="px-10">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => renderEvent(event, "#7A9736"))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      <div className="px-10">
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => renderEvent(event, "#E02B2B"))
        ) : (
          <p>No past events.</p>
        )}
      </div>
    </div>
  );
}
