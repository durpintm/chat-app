import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      console.log("Current User Details: ", response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      Home
      <section>
        {/* Message Component */}
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
