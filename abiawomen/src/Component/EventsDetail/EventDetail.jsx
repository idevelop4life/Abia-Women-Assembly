import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock,Phone, Mail } from 'lucide-react';


export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:9000/events/${id}`);
        const data = await res.json();
        console.log(data)
        setEvent(data);

      } catch (err) {
        console.error('Error fetching event:', err.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading event details...</div>;

  return (
    <div className='mx-20 my-10'>
      <button
        onClick={() => navigate('/UpcomingEvent')}
        className="text-black font-bold text-2xl"
        >
        ←
        </button>

      <h1 className=" font-bold mb-2 text-3xl">{event.name}</h1>

<div className="flex items-center space-x-2 my-5">
  <Calendar className="w-5 h-5 text-gray-700" />
  <span>
    {new Date(event.event_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </span>
</div>

<div className="flex items-center space-x-2 mt-1 my-5">
  <Clock className="w-5 h-5 text-gray-700" />
  <span>
    {new Date(event.event_date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}
  </span>
</div>

<p><strong className="text-3xl">About the Event:</strong></p>

<p>{event.description}</p>
<button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 my-10">
  Donate towards event
</button>
<p className="underline font-bold">For more information contact</p>


<p className="flex items-center space-x-2 my-5">
  <Phone className="w-5 h-5 text-gray-700" />
  <span>{event.contact_phone}</span>
</p>

<p className="flex items-center space-x-2 my-5">
  <Mail className="w-5 h-5 text-gray-700" />
  <span>{event.contact_email}</span>
</p>
{/* <p><strong>Category:</strong> {event.category}</p> */}
    </div>
  );
};
