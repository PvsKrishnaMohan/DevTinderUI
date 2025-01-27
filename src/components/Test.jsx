import React from "react";
import GradientText from "./GradientText";


const Test = () => {
  return (
    <div className=" flex justify-center items-center flex-col m-10 p-3 text-center">
      <div className="sm: w-8/12">
        <img
          className="w-fit"
          src="https://res.cloudinary.com/krishnamohan479/image/upload/v1737920807/3dicons-boy-front-color_w3lqbh.png"
        />
      </div>
      <h1 className="text-center">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={5}
          showBorder={true}
          className="custom-class"
        >
          No New Users Found..
        </GradientText>
      </h1>
    </div>
  );
};

export default Test;
