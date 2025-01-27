import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

import GradientText from "./GradientText";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1 mx-2">
        <Link to="/feed" className="btn btn-ghost text-xl">
          <img
            className="w-10 h-30"
            src="https://res.cloudinary.com/krishnamohan479/image/upload/v1735716824/devTinder_logo-removebg-preview_1_1_mvjxjz.png"
          />
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={10}
            showBorder={false}
            className="custom-class"
          >
            DevUp
          </GradientText>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-1">
          <div className="form-control text-lime-500">Hi, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Edit Profile
                  
                </Link>
              </li>
              <li>
                <Link to="/profilecard"> My Profile Card<span className="badge text-pink-500">New</span></Link>
              </li>
              <li>
                <Link to="/connections"> Connections</Link>
              </li>
              <li>
                <Link to="/requests"> Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
