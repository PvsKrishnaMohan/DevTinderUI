import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, photoUrl, skills, about, gender, _id } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log("Error...");
    }
  };
  return (
    <div className="card bg-base-300 w-96  shadow-xl">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        {firstName && lastName && (
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
        )}
        {/* <h2 className="card-title">{firstName} {lastName}</h2> */}
        {age && gender && (
          <p>
            {age} , {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("intrested", _id)}
          >
            connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
