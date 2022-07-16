import React, { useState } from "react";
import { toast } from "react-toastify";

const PostModal = ({ open, setOpen, refetch }) => {
  const [error, setError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  console.log(open);
  const handleForm = (e) => {
    e.preventDefault();
    setSpinner(true);
    const name = e.target.fullName.value;
    const phone = e.target.phone.value;
    const degree = e.target.degree.value;
    const university = e.target.university.value;
    const regNo = e.target.registration.value;
    if (
      phone.length === 11 &&
      name.length > 3 &&
      degree &&
      university &&
      regNo
    ) {
      fetch(`http://localhost:4000/student`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
        body: JSON.stringify({ name, degree, university, regNo, phone }),
      }).then((res) => {
        if (res.status === 200) {
          setSpinner(false);
          toast.success("your request was added", {
            toastId: "post",
          });
          refetch();
          setOpen(false);
        } else {
          setSpinner(false);
          toast.error("Authentication failed", {
            toastId: "auth-failed",
          });
        }
      });
    } else {
      setSpinner(false);
      setError(true);
    }
  };
  return (
    <>
      <input type="checkbox" id="add-student" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="add-student"
            className="btn btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleForm}>
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              required
            />

            <input
              className="block w-10/12 p-1 rounded my-1"
              type="number"
              name="phone"
              placeholder="Enter phone"
              required
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="number"
              name="registration"
              placeholder="Enter registration no"
              required
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="university"
              placeholder="Enter University"
              required
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="degree"
              placeholder="Enter degree"
              required
            />
            {error && (
              <p className="text-red-500 text-xl text-center">
                Please give valid info
              </p>
            )}
            <div className="modal-action">
              <button
                disabled={spinner}
                typeof="submit"
                className="btn-xl cursor-pointer"
              >
                {spinner ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
