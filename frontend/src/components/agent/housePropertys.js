import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import { message } from "antd";
const HousePropertyA = () => {
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessage] = useState("");
  const { id } = useParams();

  const closeModal = () => {
    setShowConfirmation(false);
  };

  const openModal = () => {
    setShowConfirmation(true);
  };
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/homeProperty/GethomeProperties/${id}`
        );
        setHouse(response.data);
        setFormData(response.data); // Populate form data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching house:", error);
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (formData && formData.userRef) {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/getuserbyid/${formData.userRef}`
          );

          // Check if the response contains the email field
          if (response.data && response.data.email) {
            setUserEmail(response.data.email);
          } else {
            console.error("Error: Email field not found in response");
          }
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      }
    };

    fetchUserEmail();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/homeProperty/UpdatehomeProperties/${id}`,
        formData
      );
      message.success("Property Updated successfully");
      setEditing(false);
      setHouse(formData);
    } catch (error) {
      console.error("Error updating house:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/homeProperty/DeletehomeProperties/${id}`
      );
      if (response.status === 200) {
        message.success("Deleted successfully");
        setShowConfirmation(false);
        navigate("/dashboard/housesBody");
      } else if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
      setShowConfirmation(false);
      // Redirect or display success message
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };
  const handleAdditionalImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setHouse({ ...house, image: [...house.image, ...newImages] });
  };

  if (loading) return <div>Loading...</div>;
  if (!house) return <div>House not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Left side: Input fields */}
      <div className="flex-1 pr-8">
        <h2 className="text-4xl font-bold mb-6">{house.title}</h2>
        <form className="bg-green-500 p-3 rounded-md shadow-lg">
          {formData && formData.userRef && (
            <div className="mb-4 flex-grow">
              <label className="block text-sm font-bold mb-2">
                Reference User:
              </label>
              <select
                name="userRef"
                className="w-full px-4 py-2.5 rounded border"
                required
                value={formData.userRef}
                onChange={handleInputChange}
                disabled
              >
                <option value={formData.userRef}>{userEmail}</option>
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Style:</label>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-2 rounded border"
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Type:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-2 rounded border"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rooms:</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-4/5 px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Build Year:
              </label>
              <input
                type="number"
                name="buildYear"
                value={formData.buildYear}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-4/5 px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Area: </label>
              <input
                type="number"
                name="areaSize"
                value={formData.areaSize}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-4/5 px-4 py-2 rounded border"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Floor:</label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-4/5 px-4 py-2 rounded border"
              />
            </div>
          </div>{" "}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-2 rounded border"
            />
          </div>
          {editing && (
            <div>
              <input
                type="file"
                onChange={(e) => handleAdditionalImageChange(e)}
                multiple
                accept="image/*"
              />
            </div>
          )}
          {/* Add other input fields for rooms, buildYear, areaSize, etc. */}
          {editing && (
            <div className="flex justify-start mt-7">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-800 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-500 ml-3 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
          {!editing && (
            <div className="flex justify-end">
              {" "}
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Edit
              </button>{" "}
              <button
                type="button"
                onClick={openModal}
                className="bg-red-500 ml-3 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </form>
      </div>
      {/* Right side: Image gallery */}

      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 mt-12">Images</h2>
        <div className="grid grid-cols-2 gap-4">
          {house.image.map((imageUrl, index) => (
            <div key={index}>
              {imageUrl && ( // Add a conditional check for imageUrl
                <img
                  src={`http://localhost:3000/${imageUrl.replace(/\\/g, "/")}`}
                  alt={`House ${index + 1}`}
                  className="w-full h-40 rounded-2xl"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {showConfirmation && (
        <div id="id01" className="modalC">
          <form className="modal-contentC animate">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="confD">
              <i>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </i>
              <p>Are you sure you want to delete this user?</p>
              <div className="btnsFormuser">
                <button type="button" className="submit" onClick={handleDelete}>
                  Confirm
                </button>
                <button
                  type="button"
                  className="Cancelbtn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              <p id="addmessage">{messages}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HousePropertyA;
