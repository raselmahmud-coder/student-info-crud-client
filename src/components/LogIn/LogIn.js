import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regexEmail) || password.length <= 5) {
      toast.error(`Plz put valid info`, {
        toastId: "registration",
      });
    } else {
      fetch(`https://student-crud-rm.herokuapp.com/user/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.token);
          if (data.token) {
            localStorage.setItem("access_token", JSON.stringify(data.token));
            navigate("/");
            toast.success("you have logged in", {
              toastId: "login",
            });
            e.target.reset();
          } else {
            toast.error("user not found", {
              toastId: "not-f",
            });
          }
        });
    }
  };
  return (
    <>
      <div className="p-6 lg:w-1/3 mx-auto bg-base-100 drop-shadow rounded mt-12">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleForm}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="input w-full border-gray-300 border-2"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full border-gray-300 border-2"
            required
          />
          <Link to={"/"} className="block mb-4">
            Forget Password?
          </Link>
          <input
            type="submit"
            value="Login"
            className="block btn-accent mx-auto w-full py-2 rounded-lg cursor-pointer uppercase"
          />
          <div className="text-center my-2">
            <Link to={"/registration"} className="text-primary">
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
