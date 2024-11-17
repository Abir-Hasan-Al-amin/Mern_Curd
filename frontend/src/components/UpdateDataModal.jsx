"use client"
import React, { useEffect, useState } from "react";
import Form from "./From";
function UpdateDataModal({ isOpen, onClose, handleUpdateUser,data }) {
    const [formData, setFormData] = useState({
      fname: "",
      email: "",
      age: "",
  });
      useEffect(() => {
        if (isOpen && data) {
            setFormData({
                fname: data.fname || "",
                email: data.email || "",
                age: data.age || "",
            });
        } 
    }, [isOpen, data]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleCancel = () => {
        setFormData({
          fname: "",
          email: "",
          age: "",
        });
        onClose(); 
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser({...formData, id: data?._id});
      };
    
      if (!isOpen) return null;
    
      return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <Form
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      );
}

export default UpdateDataModal