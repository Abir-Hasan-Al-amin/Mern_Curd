"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddDataModal from "./AddDataModal";
import UpdateDataModal from "./UpdateDataModal";

function DashBoard() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  const [isUpdateDataModalOpen, setIsUpdateDataModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getUsers"
      );
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/deleteUser/${id}`);
      fetchData();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const openAddDataModal = () => {
    setIsAddDataModalOpen(true);
  };
  const closeAddDataModal = () => {
    setIsAddDataModalOpen(false);
  };
  const openUpdateDataModal = () => {
    setIsUpdateDataModalOpen(true);
  };
  const closeUpdateDataModal = () => {
    setIsUpdateDataModalOpen(false);
  };
  const handleAddUser = async (newUser) => {
    try {
      const { fname, email, age } = newUser;
      if (!fname || !email || !age) {
        console.log("Missing required fields: fname, email, or age");
        return;
      }
      await axios.post("http://localhost:3000/api/v1/users/addUser", newUser);
      fetchData();
      closeAddDataModal();
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };
  const handleUpdateUser = async (updatedUser) => {
    try {
      const { fname, email, age ,id } = updatedUser;
      if (!fname || !email || !age) {
        console.log("Missing required fields: fname, email, or age");
        return;
      }
      await axios.patch(`http://localhost:3000/api/v1/users/updateUser/${id}`, updatedUser);
      fetchData();
      closeUpdateDataModal();
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center p-8">
        <p>All Users</p>
        <button
          className="bg-blue-500 py-2 px-6 rounded-md text-white"
          onClick={openAddDataModal}
        >
          Add
        </button>
      </div>

      <div className="flex p-8 flex-wrap justify-around gap-3">
        {data?.length > 0 ? (
          data.map((d) => (
            <div className="border p-4" key={d._id}>
              <p>Name: {d.fname}</p>
              <p>Email: {d.email}</p>
              <p>Age: {d.age}</p>
              <div>
                <button
                  className="bg-lime-300 py-2 px-8 rounded-md cursor-pointer m-1"
                  onClick={() => {
                    openUpdateDataModal();
                    setSelectedData(d);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 py-2 px-8 rounded-md cursor-pointer m-1"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Users</p>
        )}
      </div>

      <AddDataModal
        isOpen={isAddDataModalOpen}
        onClose={closeAddDataModal}
        handleAddUser={handleAddUser}
      />
      <UpdateDataModal
        isOpen={isUpdateDataModalOpen}
        onClose={closeUpdateDataModal}
        handleUpdateUser={handleUpdateUser}
        data={selectedData}
      />
    </div>
  );
}

export default DashBoard;
