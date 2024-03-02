import React, { useState } from "react";
import './InputForms.css';

const InputForms = ({placeholderInput, type}) => {
  const [username, setUsername] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="login-container">
      <form>
        <div className={`input-wrapper ${username ?'focused ' : ''}`}>
          <label htmlFor="usernameInput">{placeholderInput}</label>
          <input
            id="usernameInput"
            type={type}
            value={username}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default InputForms;