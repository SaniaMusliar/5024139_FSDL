import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const movies = ["Avengers", "Inception", "Interstellar"];

  return (
    <div className="container">
      <h2>Select Movie</h2>

      {movies.map((movie, index) => (
        // Key used here
        <div className="card" key={index}>
          <h3>{movie}</h3>

          <button onClick={() => navigate("/booking", { state: movie })}>
            Book Ticket
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;