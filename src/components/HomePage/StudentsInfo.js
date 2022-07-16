import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import DeleteModal from "../postModal/deleteModal/DeleteModal";
import PutModal from "../putModal/PutModal";

const StudentsInfo = ({ reGet }) => {
  const [put, setPut] = useState(false);
  const [ForEdit, setForEdit] = useState(false);
  const [ForDelete, setForDelete] = useState("");
  const [studentDelete, setStudentDelete] = useState(false);
  const handleEdit = (id) => {
    setForEdit(id);
  };
  async function getStudents() {
    const res = await fetch(`http://localhost:4000/student`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    if (res.status === 200) {
      const result_1 = await res.json();
      return result_1;
    } else {
      toast.error("authentication failed", {
        toastId: "auth-failed",
      });
    }
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
    return <p className="text-center text-xl text-white">data is loading...</p>;
  }

  const handleDelete = (id) => {
    setStudentDelete(true);
    setForDelete(id);
  };
  return (
    <>
      {put ? (
        <PutModal
          put={put}
          setPut={setPut}
          refetch={refetch}
          ForEdit={ForEdit}
        />
      ) : (
        ""
      )}
      {studentDelete ? (
        <DeleteModal
          studentDelete={studentDelete}
          setStudentDelete={setStudentDelete}
          refetch={refetch}
          ForDelete={ForDelete}
        />
      ) : (
        ""
      )}
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
            {StudentsInfo?.map((student) => (
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
                  <label
                    htmlFor="delete-student"
                    onClick={() => handleDelete(student._id)}
                    className="btn ml-2"
                  >
                    delete
                  </label>
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
