import React, { useEffect, useState } from "react";
import './UserForm.css';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Reducers/UserReducer";


const UserForm = ({ data, closeModal }) => {
  const [editFormData, setEditFormData] = useState(data)
  const [errors, setErrors] = useState({});
  console.log("errors in state", errors);
  const dispatch = useDispatch()
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setEditFormData({
      ...editFormData,
      [name]: value
    })
  }
  const UpdateData = (e) => {
    const erros = {};
    if (editFormData.name == "") {
      erros.name = "This Field is required"
    }
    if (!editFormData.email.includes("@")) {
      erros.email = "Please enter the valid email"
    }
    if (!editFormData.website) {
      erros.website = "Please fill the required field"
    }
    if (!editFormData.phone) {
      erros.phone = "Please fill the required field"
    }
    setErrors(erros);
    console.log("erros", erros);
    if (Object.keys(erros).length === 0) {
      // Do something with formData (e.g., submit to server)
      dispatch(updateUser(editFormData))
      closeModal("updated")
    }
    ;
  }
  return (
    <div className="FormWrapper">
      <div >
        <div className="FormLabelInput">
          <label htmlFor="">Name</label>
          <input type="text" onChange={(e) => handleInputChange(e, "name")} value={editFormData?.name} />
          {errors.name && <span style={{ color: 'red', width: '50%' }}>{errors.name}</span>}

        </div>
        <div className="FormLabelInput">
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => handleInputChange(e, "email")} value={editFormData?.email} />
          {errors.email && <span style={{ color: 'red', width: '50%' }}>{errors.email}</span>}

        </div>
        <div className="FormLabelInput">
          <label htmlFor="">Phone</label>
          <input type="text" onChange={(e) => handleInputChange(e, "phone")} value={editFormData?.phone} />
          {errors.phone && <span style={{ color: 'red', width: '50%' }}>{errors.phone}</span>}

        </div>
        <div className="FormLabelInput">
          <label htmlFor="">Website</label>
          <input type="text" onChange={(e) => handleInputChange(e, "website")} value={editFormData?.website} />
          {errors.website && <span style={{ color: 'red', width: '50%' }}>{errors.website}</span>}

        </div>
        <div className="formBtnDiv">
          <button onClick={() => closeModal()} className="ModalCancelBtn">cancel</button>&nbsp;
          <button onClick={(e) => UpdateData(e)} className="ModalCloseBtn">ok</button>
        </div>
      </div>


    </div>

  );
};

export default UserForm;
