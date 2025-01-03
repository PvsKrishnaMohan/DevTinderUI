import React, { useState } from "react";
import UserCard from "./userCard";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
    //   console.log("Saving profile..."); // Add this line
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex items-center justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="label"></div>
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div className="label"></div>
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <div className="label"></div>
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <div className="label"></div>
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className="label"></div>
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <div className="label"></div>
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
