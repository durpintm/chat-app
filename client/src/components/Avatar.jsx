/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
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

  const isOnline = onlineUsers.includes(userId);

  return (
    <div
      className={`text-slate-800 rounded-full text-xl font-bold relative ${bgColor[randomNumber]}`}
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

      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
