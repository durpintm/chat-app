import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";

const Message = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-users", (data) => {
        setUserData(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  return (
    <div>
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={20} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={userData?.profile_pic}
              name={userData?.name}
              userId={userData._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-md my-0 text-ellipsis line-clamp-1">
              {userData?.name}
            </h3>
            <p className="-my-2">
              {userData.online ? (
                <span className="text-primary font-bold text-sm">online</span>
              ) : (
                <span className="text-slate-500 font-bold text-sm">
                  offline
                </span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Message;
