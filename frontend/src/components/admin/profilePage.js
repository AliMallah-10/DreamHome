import React, { useState, useEffect } from "react";
import { message } from "antd";
function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    profileImage: "", // Added profileImage field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfileData) {
      setProfileData(savedProfileData);
      setImagePreview(savedProfileData.profileImage); // Set image preview if available
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files[0]) {
      // Handle file upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          [name]: reader.result, // Set profile image data
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const saveChanges = () => {
    // Update profileData with the current image preview
    setProfileData((prevData) => ({
      ...prevData,
      profileImage: imagePreview,
    }));

    // Save updated profileData to localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));

    // Disable editing mode
    setIsEditing(false);
    message.success("Changes saved successfully!");
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
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="border border-gray-400 px-4 py-2 mt-3 rounded"
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
          {/* Inputs */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
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
              value={profileData.email}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
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
              value={profileData.phone}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2.5 rounded"
              disabled={!isEditing}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        {/* Edit or Save Button */}
        <button
          className={`bg-${
            isEditing ? "green-800" : "green-500"
          } text-white px-4 py-2 rounded mt-4`}
          onClick={isEditing ? saveChanges : toggleEditing}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
