import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helpers/uploadFile";

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

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [mediaUpload, setMediaUpload] = useState(false);

  const handleMediaUpload = () => {
    setMediaUpload((prev) => !prev);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    const uploadVideo = await uploadFile(file);

    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo?.url,
      };
    });
  };

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

      {/* show all messages */}
      <section className="h-[calc(100vh-128px)]  overflow-x-hidden overflow-y-scroll scrollbar relative">
        {/* upload image display */}
        {message.imageUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadImage}
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
            >
              <IoClose size={32} />
            </div>
            <div className="bg-white p-4">
              <img
                src={message.imageUrl}
                width={300}
                height={300}
                alt="upload image"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {/* upload image display */}
        {message.videoUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              onClick={handleClearUploadVideo}
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
            >
              <IoClose size={32} />
            </div>
            <div className="bg-white p-4">
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
      </section>

      {/* Send messages */}
      <section className="h-16 bg-white flex items-center">
        <div className="relative">
          <button
            onClick={handleMediaUpload}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white px-4"
          >
            <FaPlus size={22} />
          </button>

          {/* video and image */}

          {mediaUpload && (
            <div className="bg-white shadow rounded absolute bottom-12 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex p-2 px-4 items-center gap-4 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex p-2 items-center gap-4 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  onChange={handleUploadImage}
                  id="uploadImage"
                />
                <input
                  type="file"
                  onChange={handleUploadVideo}
                  id="uploadVideo"
                />
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Message;
