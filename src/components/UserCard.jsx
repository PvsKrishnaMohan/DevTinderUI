import React from "react";

const UserCard = ({user}) => {
    const {firstName, lastName, age, photoUrl, skills,about,gender} = user;
  return (
    <div className="card bg-base-300 w-72 h-108 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {/* <h2 className="card-title">{firstName} {lastName}</h2> */}
        {age && gender && <p>{age} + " " + {gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
