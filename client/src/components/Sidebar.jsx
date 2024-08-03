/* eslint-disable no-unused-vars */
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSerchUser, setOpenSearchUser] = useState(false);

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
            />
            <div> </div>
          </button>
          <button
            title="Logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
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
