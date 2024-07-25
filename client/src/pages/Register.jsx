const Register = () => {
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md mx-2 rounded overflow-hidden p-4">
        <h3 className="font-bold text-2xl text-primary">
          Welcome to Chat App!
        </h3>
        <form action="">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
