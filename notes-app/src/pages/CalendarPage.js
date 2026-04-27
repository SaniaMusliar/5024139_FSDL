import { useState } from "react";

function CalendarPage() {
  // Hook used
  const [events, setEvents] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const addEvent = () => {
    if (!text || !date) return;

    setEvents([...events, { text, date }]);
    setText("");
    setDate("");
  };

  return (
    <div className="container">
      <h2>Calendar</h2>

      <input
        placeholder="Event name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="btn" onClick={addEvent}>Add Event</button>

      {events.map((ev, index) => (
        <div className="card" key={index}>
          {/* Key used */}
          <p>{ev.text}</p>
          <p>{ev.date}</p>
        </div>
      ))}
    </div>
  );
}

export default CalendarPage;