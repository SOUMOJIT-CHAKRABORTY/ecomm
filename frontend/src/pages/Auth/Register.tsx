import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state: string) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ email, username, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Registration successful");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className="flex flex-wrap pl-[10rem]">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full bg-[#0f0f10] text-white focus:bg-gray-700"
              // placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full focus:bg-gray-700 bg-[#0f0f10] text-white"
              // placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full focus:bg-gray-700 bg-[#0f0f10] text-white"
              // placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full focus:bg-gray-700 bg-[#0f0f10] text-white"
              // placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};
export default Register;
