import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { UserData, deleteUser, blinkHeart } from "../../Reducers/UserReducer";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import LoaderModal from "../../LoaderModal/Loader";
import UserForm from "../UserForm/UserForm";
import Modal from "react-modal";
import { TiHeartFullOutline } from "react-icons/ti";

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
  const [isFilled, setIsFilled] = useState([]);
  const [editUser, setEditUser] = useState();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  console.log("users", users);
  const handleDelete = (userId) => {
    console.log("userId", userId);
    dispatch(deleteUser(userId));
  };

  function openModal(user) {
    setEditUser(user)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
        console.log("userData----------------", userData);
        const updatedUserData = userData.map((user) => {
          return { ...user, HeartActive: false };
        });
        console.log("updatedUserData", updatedUserData);

        dispatch(UserData(updatedUserData));
        SetShowLoader(false);
      });
  }, []);

  // useEffect(() => {
  //   users.forEach((user) => {
  //     const url = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
  //     const UpdatedUrl = `https://api.dicebear.com/8.x/${user.username}/svg`
  //     console.log("url", UpdatedUrl);

  //     fetch(UpdatedUrl)
  //       .then((res) => res.blob()) // Fetch the response as a blob
  //       .then((blob) => {
  //         const imageUrl = URL.createObjectURL(blob); // Create object URL for the blob
  //         console.log("Image URL:", imageUrl);
  //         // Here you can set the imageUrl in state or use it directly to render the avatar
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching avatar:", error);
  //       });
  //   });
  // }, []);
  console.log("isFilled", isFilled)
  return (
    <div className="container">
      {users.map((user, id) => (
        <div className="cardMain" key={user.id}>
          <div className="Avtar">
            <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`} alt="avtar" height={200} />
          </div>
          <div className="UserInfo">
            <div className="UserInfoSubDiv">
              <div><b>{user.name}</b></div>
            </div>
            <div className="UserInfoSubDiv">
              <div>
                <MdOutlineMail />
              </div>
              <div>{user.email}</div>
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
              {user.HeartActive ?
                <TiHeartFullOutline
                  className="cardHeart"
                  onClick={() => dispatch(blinkHeart({ id: user.id, HeartActive: false }))}
                />
                :
                <CiHeart
                  className="cardHeart"
                  onClick={() => dispatch(blinkHeart({ id: user.id, HeartActive: true }))}
                />
              }

            </div>
            <div className="BottomDivSubDiv">
              <CiEdit onClick={() => openModal(user)} style={{ fontSize: '25px' }} className="ciEditHover" />
              <div className="verticleLine"></div>
            </div>
            <div className="BottomDivSubDiv_Delete">
              <span>
                <FaRegTrashCan onClick={() => handleDelete(user.id)} className="ciEditHover" />
              </span>
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
        <div className="ModelHeader">
          <div>Update Data</div>
          <div onClick={closeModal}>X</div>
        </div>
        <UserForm data={editUser} closeModal={closeModal} />
      </Modal>
      <LoaderModal setLoader={showLoader} />
    </div>
  );
};

export default UserCard;
