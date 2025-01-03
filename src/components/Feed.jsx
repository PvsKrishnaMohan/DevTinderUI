import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed,"feed");
  const dispatch = useDispatch();

  const getFeed = async() => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      // console.log(res?.data?.data,"res")
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  useEffect(()=> {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-8">
        <UserCard user={feed[4]}/>
      </div>
    )
  );
};

export default Feed;
