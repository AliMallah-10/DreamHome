import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";
function HousesBody() {
  const [users, setUsers] = useState([]);
  const [houses, setHouses] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Add a new state for house type filter
  const [filters, setFilters] = useState({
    country: "",
    title: "",
    price: "",
    type: "",
  });
  const [AddSell, setAddSell] = useState(false);
  const [messages, setMessage] = useState("");
  const [newHouseData, setNewHouseData] = useState({
    title: "",
    style: "",
    location: "",
    price: "",
    type: "",
    rooms: "",
    buildYear: "",
    areaSize: "",
    floor: "",
    description: "",
    userRef: "",
    Agent: "",
    image: [],
  });

  const closeModal = () => {
    setAddSell(false);
  };
  // ! users----------------------------------
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/Getusers");

      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // ! houses----------------------------------
  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/homeProperty/GethomeProperties"
      );
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };
  // ! Agent----------------------------------
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/agents/getallagents"
        );
        setAgentOptions(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);
  // Update applyFilters function to include filtering by house type
  const applyFilters = (house) => {
    const { country, title, price, type } = filters;
    return (
      house.location.toLowerCase().includes(country.toLowerCase()) &&
      house.title.toLowerCase().includes(title.toLowerCase()) &&
      (!price || parseInt(house.price) <= parseInt(price)) &&
      (!type || house.type.toLowerCase() === type.toLowerCase())
    );
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  // Handle form changes for adding a new house
  const handleNewHouseChange = (e) => {
    const { name, value } = e.target;
    setNewHouseData({ ...newHouseData, [name]: value });
  };

  // Handle image upload for adding a new house
  const handleImageUpload = (e) => {
    const files = e.target.files;
    setNewHouseData({ ...newHouseData, image: files });
  };

  // Function to add a new house for sale
  const addSellHouse = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !newHouseData.title ||
      !newHouseData.style ||
      !newHouseData.location ||
      !newHouseData.price ||
      !newHouseData.type ||
      !newHouseData.rooms ||
      !newHouseData.buildYear ||
      !newHouseData.areaSize ||
      !newHouseData.floor ||
      !newHouseData.description ||
      !newHouseData.userRef ||
      !newHouseData.Agent ||
      !newHouseData.image.length
    ) {
      // Display error message if any required fields are missing
      setMessage("Please fill out all required fields");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      // If all required fields are provided, proceed with form submission
      const formData = new FormData();
      for (let key in newHouseData) {
        if (key === "image") {
          for (let i = 0; i < newHouseData[key].length; i++) {
            formData.append("image", newHouseData[key][i]);
          }
        } else {
          formData.append(key, newHouseData[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:3000/homeProperty/addhomeProperties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response accordingly
      if (response.status === 201) {
        message.success("Sell Added successfully");
        fetchHouses(); // Refresh the house list after adding a new house
        closeModal(); // Close the modal after adding a new house
      } else if (response.status === 400) {
        setMessage(
          response.data.error || response.data.message || "Failed to add Sell"
        );
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding house:", error);
      setMessage(
        (error.response &&
          error.response.data &&
          (error.response.data.error || error.response.data.message)) ||
          "Failed to add Sell"
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mt-3 h-80  rounded-2xl">
        <div className="w-1/2 h-full float-right bg-white p-2 top-0">
          <img
            src={require("../../assets/images/House searching.gif")}
            alt="HeaderImage"
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="mr-8">
          <h1 className="text-4xl font-bold">Home Properties</h1>
          <p className="text-lg text-gray-600 mt-3">
            Explore our vast collection of properties including residential
            homes, apartments, commercial spaces, and more. Whether you're
            buying, renting, or investing, find the perfect property for your
            needs here.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-8 mt-5">
        {/* Country filter */}
        <input
          className="bg-[#292929] w-2/5 border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          type="text"
          name="country"
          placeholder="Filter by Country"
          value={filters.country}
          onChange={handleFilterChange}
        />
        {/* Title filter */}
        <input
          className="bg-[#292929] w-2/5 border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        {/* Price filter */}
        <input
          className="bg-[#292929] w-2/5 border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          type="number"
          name="price"
          placeholder="Filter by Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        {/* Type filter */}
        <select
          className="bg-[#292929] w-2/5 border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Type</option>
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
        </select>
        <button
          to=""
          className="bg-green-800 w-1/3 text-white font-extrabold p-2 px-6 rounded-xl hover:bg-green-500 transition-colors ml-auto"
          onClick={() => setAddSell(true)}
        >
          Add Sell
        </button>
      </div>

      {/* Houses */}
      <div className="grid grid-cols-3 gap-4 mt-10">
        {loading ? (
          <div className="loadS">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : houses.filter(applyFilters).length === 0 ? (
          <div className="text-center text-gray-600">
            No results found. Please try different filters.
          </div>
        ) : (
          houses.filter(applyFilters).map((house, index) => (
            <div
              key={index}
              className="bg-[#022312] rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-green-400 transition-shadow"
            >
              <div className="w-full h-40 bg-sky-300 rounded-2xl">
                {house.image[0] && (
                  <img
                    src={`http://localhost:3000/${house.image[0].replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={house.image[0]}
                    className="w-full h-full rounded-2xl"
                  />
                )}
              </div>
              <div>
                <p className="font-extrabold">{house.title}</p>
                <p className="mt-3">
                  <i className="mr-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </i>
                  {house.location}
                </p>
                <p className="mt-3">
                  <i className="mr-2">
                    <FontAwesomeIcon icon={faMoneyBill} />
                  </i>
                  {house.price} $
                </p>
              </div>
              <Link
                to={`/dashboard/house/${house._id}`}
                className="bg-green-700 font-extrabold p-2 px-6 rounded-xl hover:bg-green-500 transition-colors ml-auto"
              >
                See more
              </Link>
            </div>
          ))
        )}
      </div>
      {AddSell && (
        <div id="id01" className="modal">
          <form id="resetFrom" className="modal-content animate">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="w-90 rounded-2xl bg-green-500">
              <div className="p-6 text-green-900 font-bold">
                <p className="text-center text-white text-3xl">ADD Sell</p>
                <form className="bg-green-500 rounded-md">
                  <div className="mb-4 flex-grow">
                    <label className="block text-sm font-bold mb-2">
                      Agent:
                    </label>
                    <select
                      name="Agent"
                      className="w-full px-4 py-2.5 rounded border"
                      value={newHouseData.Agent}
                      onChange={handleNewHouseChange}
                      required
                    >
                      <option value="">Choose Agent</option>
                      {agentOptions.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 flex-grow">
                    <label className="block text-sm font-bold mb-2">
                      Reference User:
                    </label>
                    <select
                      name="userRef"
                      className="w-full px-4 py-2.5 rounded border"
                      value={newHouseData.userRef}
                      onChange={handleNewHouseChange}
                      required
                    >
                      <option value="">Choose User</option>
                      {users
                        .filter((user) => user.role === "user")
                        .map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.username}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newHouseData.title}
                      onChange={handleNewHouseChange}
                      className="w-full px-4 py-2 rounded border"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Style:
                    </label>
                    <input
                      type="text"
                      name="style"
                      value={newHouseData.style}
                      onChange={handleNewHouseChange}
                      className="w-full px-4 py-2 rounded border"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Location:
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newHouseData.location}
                      onChange={handleNewHouseChange}
                      className="w-full px-4 py-2 rounded border"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Price:
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={newHouseData.price}
                        onChange={handleNewHouseChange}
                        className="w-11/12 px-4 py-2 rounded border"
                        required
                      />
                    </div>
                    <div className="mb-4 flex-grow">
                      <label className="block text-sm font-bold mb-2">
                        Type:
                      </label>
                      <select
                        name="type"
                        value={newHouseData.type}
                        onChange={handleNewHouseChange}
                        className="w-full px-4 py-2.5 rounded border"
                        required
                      >
                        <option value="">Choose Type</option>
                        <option value="sell">Sell</option>
                        <option value="rent">Rent</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Rooms:
                      </label>
                      <input
                        type="number"
                        name="rooms"
                        value={newHouseData.rooms}
                        onChange={handleNewHouseChange}
                        className="w-11/12 px-4 py-2 rounded border"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Build Year:
                      </label>
                      <input
                        type="number"
                        name="buildYear"
                        value={newHouseData.buildYear}
                        onChange={handleNewHouseChange}
                        className="w-11/12 px-4 py-2 rounded border"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Area:
                      </label>
                      <input
                        type="number"
                        name="areaSize"
                        value={newHouseData.areaSize}
                        onChange={handleNewHouseChange}
                        className="w-11/12 px-4 py-2 rounded border"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">
                        Floor:
                      </label>
                      <input
                        type="number"
                        name="floor"
                        value={newHouseData.floor}
                        onChange={handleNewHouseChange}
                        className="w-11/12 px-4 py-2 rounded border"
                        required
                      />
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Image:
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 rounded border"
                      required
                      multiple
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Description:
                    </label>
                    <textarea
                      name="description"
                      value={newHouseData.description}
                      onChange={handleNewHouseChange}
                      className="w-full px-4 py-2 rounded border"
                      required
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="p-4 bg-green-700 rounded-lg hover:bg-green-600 text-white"
                      onClick={addSellHouse}
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-center mt-3 text-white">{messages}</p>
                </form>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HousesBody;
