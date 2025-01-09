import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

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
    return <h1 className="flex justify-center py-10">No New users found</h1>;
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
