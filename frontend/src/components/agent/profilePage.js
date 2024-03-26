import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { loginSuccess } from "../../data/action";
import { message } from "antd";
import axios from "axios";


function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [agent, setAgent] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    bio: "",
    reference: "",
    image: null, // Updated to handle image file
  });

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  
  // Define fetchAgentData function
  const fetchAgentData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/agents/agents/reference/${userId}`
      );
      setAgent(response.data);
      dispatch(
        loginSuccess(
          userId,
          response.data.fullName,

          response.data.email,
          response.data.image
        )
      );
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(loginSuccess(userId));
      fetchAgentData();
    }
  }, [dispatch, userId, fetchAgentData]);
  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent((prevAgent) => ({
      ...prevAgent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAgent((prevAgent) => ({
      ...prevAgent,
      image: file,
    }));
  };
  // Define a variable to check if all inputs are filled
  const allInputsFilled = Object.values(agent).every((value) => value !== "");

  // Define a variable to check if any input is empty
  const anyInputEmpty = Object.values(agent).some((value) => value === "");
  useEffect(() => {
    if (anyInputEmpty) {
      setIsEditing(false);
    }
  }, [anyInputEmpty]);
  // alert(JSON.stringify(userId));
  // ! ------------------ADD agent-----------------------------------------
  const handleAddAgentInfo = async () => {
    try {
      if (
        !agent.fullName ||
        !agent.address ||
        !agent.email ||
        !agent.phone ||
        !agent.bio
      ) {
        message.error("Please fill in all the required fields");
        return;
      }

      // Set the reference field to userId
      const agentData = { ...agent, reference: userId };

      let formData = new FormData();
      formData.append("fullName", agentData.fullName);
      formData.append("address", agentData.address);
      formData.append("email", agentData.email);
      formData.append("phone", agentData.phone);
      formData.append("bio", agentData.bio);
      formData.append("reference", agentData.reference);
      if (agentData.image) {
        formData.append("image", agentData.image);
      }

      await axios.post("http://localhost:3000/agents/addagent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Agent information added successfully");
      setIsEditing(false);
      // Refetch agent data to update inputs
      fetchAgentData();
    } catch (error) {
      console.error("Error adding agent information:", error);
      message.error(error.response.data.error || error.response.data.message);
    }
  };

  // ! ------------------update agent-----------------------------------------
  const handleSaveChanges = async () => {
    try {
      // Set the reference field to userId
      setAgent((prevAgent) => ({
        ...prevAgent,
        reference: userId,
      }));
      let formData = new FormData();
      formData.append("fullName", agent.fullName);
      formData.append("address", agent.address);
      formData.append("email", agent.email);
      formData.append("phone", agent.phone);
      if (agent.image) {
        formData.append("image", agent.image);
      }

      await axios.put(
        `http://localhost:3000/agents/updateagent/${agent._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Agent information updated successfully");
      setIsEditing(false);
      // Refetch agent data to update inputs
      fetchAgentData();
    } catch (error) {
      console.error("Error updating agent information:", error);
      message.error(error.response.data.error || error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Full-width image */}
      <div className="w-full h-64 bg-gray-300 flex justify-center items-center relative rounded-3xl">
        <img
          src={require("../../assets/images/pexels-magda-ehlers-636342.jpg")}
          alt="Profile"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      {/* Profile photo and admin info */}
      <div className="w-full flex justify-between items-center px-8 py-4">
        {/* Circular Profile Photo */}
        <div>
          <div className="w-24 h-24 ml-3 bg-gray-400 rounded-full overflow-hidden">
            <img
              src={`http://localhost:3000/${agent.image}`}
              alt={agent.image}
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="border border-gray-400 px-4 py-2 mt-3 rounded"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
        {/* Admin Info */}
        <div className="text-left">
          <h2 className="text-xl font-bold">Admin Name</h2>
          <button className="bg-green-700 text-white px-4 py-2 rounded mt-2">
            Administrator
          </button>
          <p className="mt-2">admin@example.com</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="w-full px-8 py-4">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={agent.fullName}
              onChange={handleInputChange}
              name="fullName"
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={agent.address}
              onChange={handleInputChange}
              name="address"
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={agent.email}
              onChange={handleInputChange}
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={agent.phone}
              onChange={handleInputChange}
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="bio" className="mb-1">
              Bio
            </label>

            <textarea
              name="bio"
              value={agent.bio}
              onChange={handleInputChange}
              id="bio"
              cols="30"
              rows="10"
              className="border border-gray-400 px-4 py-2 rounded min-h-11 max-h-24"
              disabled={!isEditing}
            ></textarea>
          </div>
        </div>
        {/* Edit or Save Button */}

        {allInputsFilled && (
          <button
            className={`bg-${
              isEditing ? "green-800" : "green-500"
            } text-white px-4 py-2 rounded mt-4`}
            onClick={isEditing ? handleSaveChanges : toggleEditing}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
        {anyInputEmpty && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-4"
            onClick={handleAddAgentInfo}
          >
            Add Agent Info
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
