import React from "react";
import './UserForm.css';
const UserForm = () => {
  return (
    <div className="FormWrapper">
      <div className="FormLabelInput">
        <label htmlFor="">Name</label>
        <input type="text" />
      </div>
      <div className="FormLabelInput">
        <label htmlFor="">Email</label>
        <input type="text" />
      </div>
      <div className="FormLabelInput">
        <label htmlFor="">Phone</label>
        <input type="text" />
      </div>
      <div className="FormLabelInput">
        <label htmlFor="">Website</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default UserForm;
