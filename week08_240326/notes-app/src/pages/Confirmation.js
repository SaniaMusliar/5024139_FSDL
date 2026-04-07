import { useLocation } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="container">
      <h2>Booking Confirmed</h2>

      <div className="card">
        <p>Movie: {data.movie}</p>
        <p>Name: {data.name}</p>
        <p>Seats: {data.seats}</p>
      </div>
    </div>
  );
}

export default Confirmation;