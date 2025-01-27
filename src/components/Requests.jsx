import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import NoReq from "./NoReq";
import GradientText from "./GradientText";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/krishnamohan479/image/upload/v1737921307/3dicons-snowman-front-color_yt4fxf.png"
            className="w-1/2 max-w-full"
            alt="No Requests"
          />
        </div>
        <div className="flex justify-center my-10 text-bold text-2xl p-8">
          <GradientText
            colors={["#FF512F", "#FF0000", "#FF5F6D", "#FF416C", "#FF512F"]}
            animationSpeed={5}
            showBorder={false}
            className="custom-class"
          >
            No Requests Found
          </GradientText>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, age, gender, photoUrl, about, _id } =
          request.fromUserId;
        return (
          firstName &&
          lastName && (
            <div
              key={_id}
              className="p-4 justify-between items-center flex m-4 border rounded-lg bg-base-200 w-2/3 mx-auto"
            >
              <div>
                {photoUrl && (
                  <img
                    className="w-20 h-20 rounded-full"
                    src={photoUrl}
                    alt="photo"
                  />
                )}
              </div>
              <div className="text-left mx-4">
                {firstName && lastName && (
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                )}
                {age && gender && <p>{age + ", " + gender}</p>}
                {about && <p>{about}</p>}
              </div>
              <div>
                <button
                  className="btn btn-active btn-primary m-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Requests;
