/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
  ];

  const randomNumber = Math.floor(Math.random() * 5);

  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full text-xl font-bold ${bgColor[randomNumber]}`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          className="overflow-hidden rounded-full"
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
    </div>
  );
};

export default Avatar;
