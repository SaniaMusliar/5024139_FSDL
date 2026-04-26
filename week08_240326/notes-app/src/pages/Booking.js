import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state;

  const [name, setName] = useState("");
  const [seats, setSeats] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // Ref used
  }, []);

  const handleBooking = () => {
    if (!name || !seats) return;

    navigate("/confirmation", {
      state: { movie, name, seats }
    });
  };

  return (
    <div className="container">
      <h2>Booking for {movie}</h2>

      <input
        ref={inputRef}
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Number of seats"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default Booking;