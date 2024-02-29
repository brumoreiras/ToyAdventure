import React, { useState } from "react";
import './InputForms.css';

const InputForms = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="login-container">
      <form>
        <div className={`input-wrapper ${username ?'focused ' : ''}`}>
          <label htmlFor="usernameInput">Nome Completo</label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default InputForms;