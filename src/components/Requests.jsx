import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import NoReq from "./NoReq";

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

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div>
        <h1 className=" flex justify-center my-10 text-bold text-2xl p-8">
          No Requests found
        </h1>
        <NoReq className=" border-shadow" />
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, age, gender, photoUrl, about ,_id} =
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
                {age && gender && <p className="">{age + ", " + gender}</p>}
                {about && <p className="">{about}</p>}
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
