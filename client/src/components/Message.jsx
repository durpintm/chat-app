import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar";

const Message = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
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
  }, [socketConnection, params?.userId]);

  return (
    <div>
      <header className="sticky top-0 h-16 bg-white">
        <div>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={userData?.profile_pic}
              name={userData?.name}
              userId={userData._id}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Message;
