"use client"
import React from "react";

function Form({ formData, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full mb-4"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full mb-4"
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full mb-4"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Form;
