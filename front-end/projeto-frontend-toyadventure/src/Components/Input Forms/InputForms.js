import React, { useState } from "react";
import './InputForms.css';

const InputForms = ({ placeholderInput, type, value, onChange }) => {
  
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  

  return (
    <div className="login-container">
      <div className={`input-wrapper ${value ? 'focused ' : ''}`}>
        <label className='label__input' htmlFor="usernameInput">{placeholderInput}</label>
        <input className="input__forms"
          id="usernameInput"
          type={type}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default InputForms;