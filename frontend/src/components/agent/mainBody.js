import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MainBodyA() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    priority: "",
    date: "",
    title: "",
    description: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load assignments from localStorage on component mount
    const savedAssignments = JSON.parse(localStorage.getItem("assignments"));
    if (savedAssignments) {
      setAssignments(savedAssignments);
    }
  }, []);

  useEffect(() => {
    // Save assignments to localStorage whenever assignments state changes
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAddAssignment = () => {
    if (
      newAssignment.priority &&
      newAssignment.date &&
      newAssignment.title &&
      newAssignment.description
    ) {
      if (editIndex !== null) {
        // If editing an existing assignment
        const updatedAssignments = [...assignments];
        updatedAssignments[editIndex] = newAssignment;
        setAssignments(updatedAssignments);
        setEditIndex(null); // Reset editIndex after updating
      } else {
        // If adding a new assignment
        setAssignments([...assignments, newAssignment]);
      }
      setNewAssignment({
        priority: "",
        date: "",
        title: "",
        description: "",
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleEditAssignment = (index) => {
    setNewAssignment(assignments[index]);
    setEditIndex(index);
  };
  const handleDeleteAssignment = (index) => {
    // Show confirmation dialog before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (isConfirmed) {
      const updatedAssignments = [...assignments];
      updatedAssignments.splice(index, 1);
      setAssignments(updatedAssignments);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 ml-6">Chart</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={[
                { name: "Houses", Buy: 3000, Sell: 4000 },
                { name: "Real Estate", Sell: 5000, Buy: 4000 },
                { name: "Rent", Rent: 5000 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sell" stackId="a" fill="#245000" />
              <Bar dataKey="Buy" stackId="a" fill="#61A400" />
              <Bar dataKey="Rent" stackId="a" fill="#007A5B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-green-200 p-5">
          <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Priority</label>
              <select
                name="priority"
                value={newAssignment.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={newAssignment.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newAssignment.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={newAssignment.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              ></textarea>
            </div>
            <button
              onClick={handleAddAssignment}
              className="bg-green-500 hover:bg-green-800 text-black py-2 px-4 rounded-md"
            >
              {editIndex !== null ? "Update Assignment" : "Add Assignment"}
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mb-2 mt-5">Assignments: TO DO</h2>
        {assignments.length === 0 ? (
          <p className="text-lg text-green-800 ml-6 bg-green-400 p-5">
            No assignments found.
          </p>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-3 w-full p-4">
            {assignments.map((assignment, index) => (
              <div
                key={index}
                className={`border border-gray-300 p-4 rounded-md bg-green-300 ${
                  index % 2 === 0 ? "md:col-span-1" : "md:col-span-1"
                }`}
                style={{
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${
                        assignment.priority === "High"
                          ? "bg-red-500"
                          : assignment.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <h3 className="text-lg font-semibold">
                      {assignment.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-2">{assignment.date}</p>
                </div>

                <div style={{ flex: 1 }}>
                  <p className="mb-4">{assignment.description}</p>
                </div>

                <div className="flex justify-between">
                  <i
                    onClick={() => handleEditAssignment(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </i>
                  <i
                    onClick={() => handleDeleteAssignment(index)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainBodyA;
