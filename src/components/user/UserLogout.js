import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {

      localStorage.removeItem('token');
      navigate('/');
    };
  
    return (
      <button class="orange-button bottom" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;