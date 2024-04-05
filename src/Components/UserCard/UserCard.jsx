import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Loader from "../Loader/Loader";
import { CiGlobe } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { UserData, deleteUser } from "../../Reducers/UserReducer";
import { useSelector } from 'react-redux';
import ReactModal from "react-modal";
import LoaderModal from "../../LoaderModal/Loader";


const UserCard = () => {
  const [showLoader, SetShowLoader] = useState(false);
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
        dispatch(UserData(userData))
        SetShowLoader(false)
      });
  }, []);

  const handleDelete=(userId)=>{
    console.log("userId",userId);
   dispatch(deleteUser(userId))
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
                <CiEdit />
              </span>
              <div className="verticleLine"></div>
            </div>
            <div className="BottomDivSubDiv">
              <span>
                <FaRegTrashCan onClick={()=>handleDelete(user.id)}/>
              </span>
              <div></div>
            </div>
          </div>
        </div>
      ))}
       {/* {showLoader ? (
        <div className={showLoader?'darken-background' : ''}>
          <Loader />
        </div>
      ) : (
        <></>
      )} */}
      <LoaderModal setLoader={showLoader} />
    </div>
  );
};

export default UserCard;
