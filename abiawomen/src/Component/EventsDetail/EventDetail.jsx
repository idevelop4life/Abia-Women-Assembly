import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:9000/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.event_date}</p>
      <p>{event.event_day}</p>
      <p>{event.description}</p>
      <p>{event.contact_phone}</p>
      <p>{event.contact_email}</p>
      <p>{event.category}</p>
    </div>
  );
};
