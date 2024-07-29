import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const CheckPassword = () => {
  const [data, setData] = useState({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: "POST",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
      }

      if (response.data.success) {
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          <Avatar
            width={80}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
            height={80}
          />
          <h2 className="font-semibold text-lg mt-2">
            {location?.state?.name}
          </h2>
        </div>

        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
            />
          </div>

          <button className="bg-primary text-lg px-3 py-2 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wider">
            Login
          </button>
        </form>
        <p className="my-4 text-center">
          <Link
            to={"/forgot-password"}
            className="hover:text-primary font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPassword;
