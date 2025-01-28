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
        <h1 className="p-4 text-center text-zinc-100 text-2xl">My profile card</h1>

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
        <span className="p-4 m-2 bg-slate-900">This is how your profile card is visible to other users</span>
        </div>

      </div>
    )
  );
};

export default MyProfileCard;
