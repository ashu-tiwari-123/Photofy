import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setshowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendURL}/api/users/login`, {
          email,
          password,
        });
        console.log(data);
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setshowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendURL}/api/users/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setshowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className=" fixed top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmit}
        initial={{ y: 50, opacity: 0.5 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center">
          Welcome back! Please sign in to continue
        </p>
        {state && state != "Login" ? (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.email_icon} alt="" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          {state === "Login" ? "forgot Password?" : ""}
        </p>
        <button name="submit" className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state == "Login" ? "Login" : "create account"}
        </button>
        {state && state === "Login" ? (
          <p className="mt-5 text-center">
            don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setshowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;
