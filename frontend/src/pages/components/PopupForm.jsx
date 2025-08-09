import React, { useState } from "react";
import { handleError,handleSuccess } from "../utils/Toasts";
import { useApi } from "@/context/ApiContext";

const PopupForm = ({ type, onClose,userid }) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const user_id=userid
  const { backend_url } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !data) {
      alert("All fields are required");
      return;
    }

    // Send back data to parent
    handleFormSubmit({ title, data, type });
    
  };
  const handleFormSubmit = async(formData) => {

    // Example: Send to backend
    const response =await fetch(`${backend_url}/home/add_data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id:user_id,
        type: formData.type,
        title: formData.title,
        data: formData.data
      })
    })
    const result = await response.json();
    if(result.success){
        handleSuccess(result.message);
        setTimeout(() => {
        onClose()
        },1000)
    }else{
        handleError(result.messge);
    }
  };

  // Dynamic placeholder based on type
  const getPlaceholder = () => {
    switch (type) {
      case "password":
        return "Enter your password";
      case "link":
        return "Enter your URL";
      case "note":
        return "Write your note here...";
      default:
        return "Enter your data";
    }
  };

  return (
    <div className="fixed inset-0 back-drop  flex items-center justify-center z-50 ">
      <div className="bg-white back-drop rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl text-white font-semibold mb-4">
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="w-full text-white text_lg  border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Data */}
          <textarea
            placeholder={getPlaceholder()}
            className="w-full text-white border border-gray-300 rounded px-3 py-2"
            rows="4"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
