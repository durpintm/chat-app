/* eslint-disable no-unused-vars */
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSerchUser, setOpenSearchUser] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user?._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((convUser, index) => {
          if (convUser?.sender._id === convUser?.receiver?._id) {
            return {
              ...convUser,
              userDetails: convUser.sender,
            };
          } else if (convUser?.receiver?._id !== user?._id) {
            return {
              ...convUser,
              userDetails: convUser.receiver,
            };
          } else {
            return {
              ...convUser,
              userDetails: convUser?.sender,
            };
          }
        });
        console.log("Convo users", conversationUserData);
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
    localStorage.removeItem("string");
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-md rounded-br-md py-5 text-slate-700 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={22} />
          </NavLink>
          <NavLink
            onClick={() => {
              setOpenSearchUser(true);
            }}
            title="Add Friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={22} />
          </NavLink>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              setEditUserOpen(true);
            }}
            className="mx-auto"
            title={user?.name}
          >
            <Avatar
              width={38}
              height={38}
              name={user.name}
              imageUrl={user.profile_pic}
              userId={user._id}
            />
            <div> </div>
          </button>
          <button
            title="Logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            onClick={handleLogout}
          >
            <span className="-ml-2">
              <BiLogOut size={22} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Messages</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore Users to Start a Conversation!
              </p>
            </div>
          )}

          {allUser &&
            allUser.map((conv, index) => {
              return (
                <NavLink
                  to={"/" + conv?.userDetails?._id}
                  key={conv?._id}
                  className="flex items-center gap-2 py-4 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
                >
                  <div>
                    <Avatar
                      imageUrl={conv?.userDetails?.profile_pic}
                      name={conv?.userDetails?.name}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                      {conv?.userDetails?.name}
                    </h3>
                    <div className="text-slate-600 text-xs flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {conv?.lastMessage?.imageUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaImage />
                            </span>
                            {!conv?.lastMessage?.text && <span>Image</span>}
                          </div>
                        )}

                        {conv?.lastMessage?.videoUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaVideo />
                            </span>
                            {!conv?.lastMessage?.text && <span>Video</span>}
                          </div>
                        )}
                      </div>
                      <p className="text-ellipsis line-clamp-1">
                        {conv?.lastMessage?.text}
                      </p>
                    </div>
                  </div>
                  {Boolean(conv?.unseenMessage) && (
                    <p className="w-6 h-6 text-xs flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                      <span>{conv?.unseenMessage}</span>
                    </p>
                  )}
                </NavLink>
              );
            })}
        </div>
      </div>

      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/* Search Users */}
      {openSerchUser && (
        <SearchUser
          onClose={() => {
            setOpenSearchUser(false);
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
