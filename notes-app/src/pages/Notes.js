import { useState, useRef, useEffect } from "react";

function Notes() {
  // Hooks used here
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  // Ref used here
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // focus input
  }, []);

  const addNote = () => {
    if (!text) return;

    const newNote = {
      text,
      date,
      completed: false
    };

    setNotes([...notes, newNote]); // state update
    setText("");
    setDate("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const updated = [...notes];
    updated[index].completed = !updated[index].completed;
    setNotes(updated);
  };

  return (
    <div className="container">
      <h2>Notes & Tasks</h2>

      <input
        ref={inputRef} // ref
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="btn" onClick={addNote}>Add</button>

      {notes.map((note, index) => (
        // Key used here
        <div className="card" key={index}>
          <div className="card-top">
            <div>
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => toggleDone(index)}
              />

              <span
                className={`task-text ${note.completed ? "completed" : ""}`}
                style={{ marginLeft: "10px" }}
              >
                {note.text}
              </span>
            </div>

            <button
              className="btn delete-btn"
              onClick={() => deleteNote(index)}
            >
              Delete
            </button>
          </div>

          <div className="date-text">
            {note.date ? `Reminder: ${note.date}` : "No reminder"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;