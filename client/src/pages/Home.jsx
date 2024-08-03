import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";

const Home = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response?.data?.data));

      if (response?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} alt="Logo" width={200} />
        </div>
        <p className="text-lg mt-2 text-slate-600">
          Select user to send a message
        </p>
      </div>
    </div>
  );
};

export default Home;
