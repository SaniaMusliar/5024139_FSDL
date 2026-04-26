import React, { useState } from "react";
import Header from "./components/Header";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import Display from "./components/Display";

function App() {
  const [user, setUser] = useState({ name: "", age: "" });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Header />
      <Counter />
      <UserForm setUser={setUser} />
      <Display name={user.name} age={user.age} />
    </div>
  );
}

export default App;