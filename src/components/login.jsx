import React, { useState } from "react";
import "../styles/signUp.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios"

// Define a functional component named Login that takes a prop 'setUser'
const Login = ({ setUser }) => {

  // Declare a state variable 'userForm' using the useState hook with initial values
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });

  // Get the 'navigate' function from the 'useNavigate' hook of React Router
  let navigate = useNavigate();

  // Define a function 'handleChange' that updates 'userForm' when input values change
  const handleChange = (event) => {
    setUserForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Define an asynchronous function 'handleSubmit' to handle form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Send a POST request to the specified URL with 'userForm' data using axios
    await axios
      .post("http://localhost:3000/user/login", userForm)
      .then((res) => {
        // Set the user using the 'setUser' function from the prop
        setUser(res.data.user);
        
        // Navigate to the "/profile" route
        navigate("/profile");
      });
  };

  // Return JSX representing the login form
  return (
    <div className="daddy">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        <p>
          {/* Link to the signup page */}
          <Link className="link" to="/signUp">Don't Have An Account?</Link>
        </p>
      </form>
    </div>
  );
};

// Export the Login component as the default export of this module
export default Login;
