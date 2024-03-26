import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faPerson,
  faCircleDollarToSlot,
  faLayerGroup,
  faUser,
  faUserPlus,
  faUserPen,
  faTrash,
  faCircleExclamation,
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import "./style/userStyle.css";
function UserBody() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [AddUser, setAddUser] = useState(false);
  const [UpdateUser, setUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessage] = useState("");
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchAgent, setSearchTAgent] = useState("");
  const [loading, setLoading] = useState(true);

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

  const filterUsers = useCallback(() => {
    let filtered = users;

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      filtered = filtered.filter(
        (user) => regex.test(user.username) || regex.test(user.email)
      );
    }

    setFilteredUsers(filtered);
  }, [roleFilter, searchTerm, users]);

  useEffect(() => {
    filterUsers();
  }, [roleFilter, searchTerm, filterUsers]);

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmation(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUpdateUser(true);
  };
  // ! Add user---------=========================================================
  const handleADDUSER = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          username: username,
          email,
          password,
          role: role,
          confirmPassword,
        }
      );

      if (response.status === 201) {
        message.success("User registered successfully");
        fetchUsers();
        setAddUser(false);
      } else if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setLoading(false);
    }
  };
  // ! Update user---------=========================================================
  const handleUpdate = async (updatedUserData, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/users/updateuserbyid/${selectedUser._id}`,
        updatedUserData
      );

      if (response.status === 200) {
        message.success("User Updated successfully");
        setUpdateUser(false);
        setSelectedUser(null);
        fetchUsers();
      } else if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setLoading(false);
    }
  };
  // ! Delete user---------=========================================================
  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/users/deleteuserbyid/${selectedUser._id}`
      );

      if (response.status === 200) {
        message.success("Deleted successfully");
        setShowConfirmation(false);
        setSelectedUser(null);
        fetchUsers();
      } else if (response.status === 400) {
        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(error.response.data.error);
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setAddUser(false);
    setUpdateUser(false);
    setShowConfirmation(false);
  };
  //   ! Agent---------------------------------------------------------------------------------
  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/agents/getallagents"
      );
      setAgents(response.data);
      setFilteredAgents(response.data); // Set filteredAgents initially to all agents
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTAgent(e.target.value);
    filterAgents(e.target.value);
  };

  const filterAgents = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredAgents(agents);
    } else {
      const filtered = agents.filter(
        (agent) =>
          agent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAgents(filtered);
    }
  };

  return (
    <div>
      {/* cards -------------------------------------------------------------------- */}
      <div className="cards mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-green-100">
        <div className="bg-green-400 p-8 rounded-lg flex justify-between shadow-lg">
          <div>
            <h1 className="mb-4 text-3xl">12</h1>
            <span className="text-text-color">Agents</span>
          </div>
          <div>
            <span className="text-green-800 text-3xl">
              <FontAwesomeIcon icon={faPerson} />
            </span>
          </div>
        </div>
        <div className="bg-green-400 p-8 rounded-lg flex justify-between shadow-lg">
          <div>
            <h1 className="mb-4 text-3xl">23</h1>
            <span className="text-text-color">Houses</span>
          </div>
          <div>
            <span className="text-green-800 text-3xl">
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
          </div>
        </div>
        <div className="bg-green-400 p-8 rounded-lg flex justify-between shadow-lg">
          <div>
            <h1 className="mb-4 text-3xl">23</h1>
            <span className="text-text-color">Real Estate</span>
          </div>
          <div>
            <span className="text-green-800 text-3xl">
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
            </span>
          </div>
        </div>
        <div className="bg-green-400 p-8 rounded-lg flex justify-between shadow-lg">
          <div>
            <h1 className="mb-4 text-3xl">54</h1>
            <span className="text-text-color">Rent</span>
          </div>
          <div>
            <span className="text-green-800 text-3xl">
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          </div>
        </div>
      </div>
      {/* users -------------------------------------------------------------------- */}
      <div className="mt-8 min-h-96">
        <h1 className="text-2xl font-bold mb-8">Users</h1>
        <div className="flex space-x-4 justify-between bg-green-400 p-3 rounded-lg">
          <div>
            <select
              className="bg-green-800 rounded-md p-3 text-white"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="w-1/2 text-white">
            <input
              type="text"
              placeholder="Search by username or email"
              className="bg-green-800 rounded-md p-3 w-full text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="m-2">
            <i
              className="text-2xl text-white hover:text-green-800 cursor-pointer"
              onClick={() => setAddUser(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </i>
          </div>
        </div>
        {loading && filteredUsers.length === 0 && !searchTerm && (
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
        )}
        {!loading && filteredUsers.length === 0 && searchTerm && (
          <p className="text-center text-2xl text-red-500 mt-6">
            No users found
          </p>
        )}
        {!loading && filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className=" bg-green-700 p-7 rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-semibold text-center text-white mb-4 tracking-widest">
                  <i className="mr-3">
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  {user.username}
                </h2>
                <div className="flex space-x-4 justify-between text-white">
                  <p className="text-white">{user.email}</p>
                  <p className="text-gray-600">Role: {user.role}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <i
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FontAwesomeIcon icon={faUserPen} />
                  </i>
                  <i
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Agents -================================================================================== */}
      <div className="mt-20 ">
        <h1 className="text-2xl font-bold mb-8">Agents</h1>
        <div className="flex space-x-4 justify-center bg-green-400 p-3 rounded-lg">
          <div className="w-1/2 text-white">
            <input
              type="text"
              placeholder="Search by fullname or email"
              className="bg-green-800 rounded-md p-3 w-full text-white"
              value={searchAgent}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>
        {loading ? (
          <div className="loadS" id="agentuser">
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
        ) : (
          <div>
            {filteredAgents.length === 0 && searchAgent.trim() !== "" ? (
              <div className="text-center mt-4">
                <p className="text-center text-2xl text-red-500 mt-6">
                  No agents found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent._id}
                    className="profile-card rounded-md shadow-xl overflow-hidden cursor-pointer snap-start bg-green-200 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                  >
                    <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
                      <div className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[#00a716] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[#00a716] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
                        <img
                          src={`http://localhost:3000/${agent.image.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={agent.fullName}
                          className="size-36 z-40 border-4 border-white rounded-full"
                        />
                        <div className="absolute bg-[#00a716] z-10 size-[60%] w-full"></div>
                      </div>
                    </div>
                    <div className="headings text-center leading-4">
                      <p className="text-xl font-serif font-semibold text-[#434955]">
                        {agent.fullName}
                      </p>
                      <div className="bio-wrapper h-40 overflow-hidden mt-3">
                        <p className="text-sm font-semibold text-[#434955] mx-2">
                          {agent.bio}
                        </p>
                      </div>
                    </div>
                    <div className="w-full items-center justify-center flex">
                      <ul className="flex flex-col items-start gap-2 text-xs font-semibold text-[#434955] pb-3">
                        <li className="flex">
                          <FontAwesomeIcon icon={faPhone} />
                          <p className="ml-2">{agent.phone}</p>
                        </li>
                        <li className="flex">
                          <FontAwesomeIcon icon={faEnvelope} />
                          <p className="ml-2">{agent.email}</p>
                        </li>
                        <li className="flex">
                          <FontAwesomeIcon icon={faLocationDot} />
                          <p className="ml-2">{agent.address}</p>
                        </li>
                      </ul>
                    </div>
                    <hr className="w-full h-3 bg-[#00a716] transition-all duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {AddUser && (
        <div id="id01" className="modal">
          <form id="resetFrom" className="modal-content animate">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="w-90 rounded-2xl bg-green-500">
              <div className="flex flex-col gap-2 p-8">
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Username"
                  type="text"
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  name="role"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>{" "}
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  className="inline-block mt-3 cursor-pointer rounded-md bg-green-900 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                  type="submit"
                  value="Send"
                  onClick={handleADDUSER}
                />
                <p className="text-center text-white">{messages}</p>
              </div>
            </div>
          </form>
        </div>
      )}

      {UpdateUser && (
        <div id="id01" className="modal">
          <form id="resetFrom" className="modal-content animate">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="w-90 rounded-2xl bg-green-500">
              <div className="flex flex-col gap-2 p-8">
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Username"
                  type="text"
                  name="username"
                  required
                  value={selectedUser ? selectedUser.username : ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                />
                <input
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                  value={selectedUser ? selectedUser.email : ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
                <select
                  name="role"
                  id="role"
                  className="bg-green-200 w-full rounded-lg border border-green-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white text-gray-600"
                  value={selectedUser ? selectedUser.role : ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>

                <input
                  className="inline-block mt-3 cursor-pointer rounded-md bg-green-900 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                  type="submit"
                  value="Update"
                  onClick={(e) => handleUpdate(selectedUser, e)}
                />
                <p className="text-center text-white">{messages}</p>
              </div>
            </div>
          </form>
        </div>
      )}
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
                <button
                  type="button"
                  className="submit"
                  onClick={(e) => handleDelete(selectedUser, e)}
                >
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
}

export default UserBody;
