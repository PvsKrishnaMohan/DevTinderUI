import React, { useEffect, useState } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";

const MyProfileCard = () => {
  const userData = useSelector((store) => store.user);
  const { firstName, lastName, age, gender, about, photoUrl } = userData || {};

  return (
    userData && (
      <div className="flex justify-center items-center flex-col">
        
        <div className="card bg-base-300 w-96 mt-10 shadow-xl">
          <figure>
            <img src={photoUrl} alt="Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>

            {/* <h2 className="card-title">{firstName} {lastName}</h2> */}
            {age && gender && (
              <p>
                {age} , {gender}
              </p>
            )}
            <p>{about}</p>
          </div>
        </div>
        
      </div>
    )
  );
};

export default MyProfileCard;
