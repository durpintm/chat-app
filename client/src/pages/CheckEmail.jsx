import { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-2">
          <PiUserCircle size={80} />
        </div>
        <h3 className="font-bold text-2xl text-primary">
          Welcome to Chat App!
        </h3>
        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
            />
          </div>

          <button className="bg-primary text-lg px-3 py-2 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wider">
            {"Let's Go"}
          </button>
        </form>
        <p className="my-4 text-center">
          New User?
          <Link to={"/register"} className="hover:text-primary font-semibold">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
