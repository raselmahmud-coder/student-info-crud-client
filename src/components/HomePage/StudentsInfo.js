import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import PostModal from "../postModal/PostModal";

const StudentsInfo = ({ reGet }) => {
  const [ForEdit, setForEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [put, setPut] = useState(false);
  const handleEdit = (id) => {
    setForEdit(id);

    console.log("edit it", id);
  };
  function getStudents() {
    return fetch(`http://localhost:4000/student`)
      .then((res) => res.json())
      .then((result) => result);
  }
  const {
    data: StudentsInfo,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery("students", getStudents);
  if (reGet) {
    refetch();
  }
  if (error || isError) {
    toast.error("error occurred", {
      toastId: "get-err",
    });
  }
  if (isLoading) {
    return <p>data is loading...</p>;
  }

  const handleDelete = (id) => {};
  return (
    <>
      {put ? <PostModal put={put} setPut={setPut} refetch={refetch} /> : ""}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Registration</th>
              <th>University</th>
              <th>Degree</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {StudentsInfo.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.regNo}</td>
                <td>{student.university}</td>
                <td>{student.degree}</td>
                <td>
                  <label
                    onClick={() => {
                      handleEdit(student._id);
                      return setPut(true);
                    }}
                    className="btn"
                    htmlFor="put-student"
                  >
                    Edit
                  </label>
                  <button onClick={() => handleDelete()} className="btn ml-2">
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsInfo;
