import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Loader from "../Loader/Loader";
import { CiGlobe } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { UserData, deleteUser } from "../../Reducers/UserReducer";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import LoaderModal from "../../LoaderModal/Loader";
import UserForm from "../UserForm/UserForm";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const UserCard = () => {
  const [showLoader, SetShowLoader] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    SetShowLoader(true);
    const url = " https://jsonplaceholder.typicode.com/users";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((userData) => {
        dispatch(UserData(userData));
        SetShowLoader(false);
      });
  }, []);

  const handleDelete = (userId) => {
    console.log("userId", userId);
    dispatch(deleteUser(userId));
  };

  function openModal() {
    setIsOpen(true);
  }
  // function afterOpenModal(hi) {
  //   // references are now sync'd and can be accessed.
  //   hi.style.color = "#f00";
  // }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="container">
      {users.map((user, id) => (
        <div className="cardMain" key={user.id}>
          <div className="Avtar">
            <img src="" alt="avtar" />
          </div>
          <div className="UserInfo">
            <div className="UserInfoSubDiv">
              <div>
                <MdOutlineMail />
              </div>
              <div>{user.username}</div>
            </div>
            <div className="UserInfoSubDiv">
              <div>
                <FaPhone />
              </div>
              <div>{user.phone}</div>
            </div>
            <div className="UserInfoSubDiv">
              <div>
                <CiGlobe />
              </div>
              <div>{user.website}</div>
            </div>
          </div>
          <div className="BottomDiv">
            <div className="BottomDivSubDiv">
              <span>
                <CiHeart />
              </span>
              <div className="verticleLine"></div>
            </div>
            <div className="BottomDivSubDiv">
              <span>
                <CiEdit onClick={openModal} />
              </span>
              <div className="verticleLine"></div>
            </div>
            <div className="BottomDivSubDiv">
              <span>
                <FaRegTrashCan onClick={() => handleDelete(user.id)} />
              </span>
              <div></div>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       <UserForm/>
       <div style={{position:'relative',float:'right'}}> 
       <button onClick={closeModal} className="ModalCancelBtn">cancel</button>&nbsp;
       <button onClick={closeModal} className="ModalCloseBtn">close</button>
       </div>
      </Modal>
      <LoaderModal setLoader={showLoader} />
    </div>
  );
};

export default UserCard;
