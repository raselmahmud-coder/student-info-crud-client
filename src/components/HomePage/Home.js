import React, { useState } from "react";
import PostModal from "../postModal/PostModal";
import StudentsInfo from "./StudentsInfo";

const Home = () => {
  const [error, setError] = useState(false);
  const token = localStorage.getItem("access_token");
  // const [spinner, setSpinner] = useState(false);
  const [reGet, setReGet] = useState(false);
  const [open, setOpen] = useState(false);
  const refetch = () => {
    setReGet(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.value;
  };
  return (
    <>
      {/* htmlFor modal start here */}
      {open ? (
        <PostModal open={open} setOpen={setOpen} refetch={refetch} />
      ) : (
        ""
      )}
      {/* modal end here */}
      {token ? (
        <>
          <div className="grid grid-cols-3 gap-4 mt-20 mb-5">
            <div className="">
              <h1 className="text-1xl font-bold">Students</h1>
            </div>
            <div className="">
              <input
                className="py-1 px-2 rounded"
                type="text"
                id="search"
                onBlur={handleSearch}
                placeholder="Please Search"
              />
            </div>
            <div className="text-end">
              <label
                onClick={() => setOpen(true)}
                htmlFor="add-student"
                className="py-1 px-2 rounded cursor-pointer btn-primary"
              >
                Add a student
              </label>
            </div>
          </div>
          <StudentsInfo reGet={reGet} />
        </>
      ) : (
        <p className="text-3xl text-red-500 text-center mt-5 uppercase">you must be logged in</p>
      )}
    </>
  );
};

export default Home;
