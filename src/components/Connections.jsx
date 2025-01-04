import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
    //   console.log(res.data, "res");
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-10 text-bold text-2xl"> No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections</h1>
      {connections.map((connection,index) => {
        const { firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          firstName &&
          lastName && (
            <div key={index} className="p-4 flex m-4 border rounded-lg bg-base-200 w-1/2 mx-auto">
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
            </div>
          )
        );
      })}
    </div>
  );
};

export default Connections;
