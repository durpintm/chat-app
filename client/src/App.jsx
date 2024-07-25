import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="font-bold text-2xl">
        <Outlet />
      </main>
    </>
  );
}

export default App;
