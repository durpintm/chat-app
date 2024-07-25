import { Outlet } from "react-router-dom";

const Home = () => {
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
