import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import GradientText from "./GradientText";


const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
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
    return (
      // <h1 className="flex justify-center my-10 text-bold text-2xl">
      //   {" "}
      //   No connections found
      // </h1>
      <div className="flex flex-col items-center justify-center h-screen">
                  <div className="flex justify-center">
                    <img
                      src="https://res.cloudinary.com/krishnamohan479/image/upload/v1737924140/3dicons-link-front-color_udlgju.png"
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
                      No connections found
                    </GradientText>
                  </div>
                </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">
        <GradientText
          colors={["#FF7E5F", "#2E3192", "#DA22FF", "#FDC830", "#FF5F6D"]}
          animationSpeed={10}
          showBorder={false}
          className="custom-class"
        >
          Connections
        </GradientText>
      </h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, photoUrl, about, _id } =
          connection;
        return (
          firstName &&
          lastName && (
            <div
              key={_id}
              className="p-4 flex m-4 border rounded-lg bg-base-200 w-full md:w-1/2 mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                  <h2 className="font-bold text-xl text-lime-500">
                    {" "}
                    {/* Change color here */}
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
