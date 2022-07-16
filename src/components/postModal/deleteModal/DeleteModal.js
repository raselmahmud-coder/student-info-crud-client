import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteModal = ({
  ForDelete: id,
  studentDelete,
  setStudentDelete,
  refetch,
}) => {
  const handleForm = (e) => {
    e.preventDefault();
    fetch(`https://student-crud-rm.herokuapp.com/student/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          toast.success("item was deleted", {
            toastId: "delete",
          });
          refetch();
          setStudentDelete(false);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="delete-student" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="delete-student"
            className="btn btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleForm}>
            <h1 className="font-bold text-lg">Are you sure? want to delete</h1>
            <div className="modal-action">
              <button typeof="submit" className="btn cursor-pointer">
                Sure
              </button>
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
