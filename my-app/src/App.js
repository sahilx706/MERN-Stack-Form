import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/demo', {
      method: "POST",
      body : JSON.stringify(form),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    await response.json();
    getUsers();
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/demo', {
      method: "GET",
  })
  const data = await response.json();
    setUsers(data)
  }

  useEffect( ()=>{
    getUsers();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(form)}</p>
        <span>UserName</span>
        <input type="text" name="username" onChange={handleForm}></input>
        <span>Password</span>
        <input type="text" name="password" onChange={handleForm}></input>
        <input type="submit"></input>
      </form>
      <div>
        <ul>
          {users.map(user => <li key={user._id}>{user.username}, {user.password}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
