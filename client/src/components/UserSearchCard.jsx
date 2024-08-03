/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-4 mt-2 p-2 lg:p-2 border border-transparent border-b-slate-200 hover:border-primary rounded cursor-pointer"
    >
      <div>
        <Avatar width={50} height={50} name={user?.name} />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
      </div>
      <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
    </Link>
  );
};

export default UserSearchCard;
