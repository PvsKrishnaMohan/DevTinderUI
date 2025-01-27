import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";
import GradientText from "./GradientText";


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async() => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  useEffect(()=> {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <=0){
    return <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/krishnamohan479/image/upload/v1737920807/3dicons-boy-front-color_w3lqbh.png"
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
                No New Users Found
              </GradientText>
            </div>
          </div>;
  }
  return (
    feed && (
      <div className="flex justify-center my-8">
        <UserCard user={feed[0]}/>
      </div>
    )
  );
};

export default Feed;
