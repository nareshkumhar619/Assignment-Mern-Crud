import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: ""
  });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("https://naresh-8neg.onrender.com/NewPeople", inputUser);
      console.log(res);
      // Reset form fields after successful submission
      setInputUser({
        name: "",
        email: "",
        age: "",
        gender: ""
      });
      fetchAllUser();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(error)
    }
  };

  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("https://naresh-8neg.onrender.com/NewPeople");
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://naresh-8neg.onrender.com/NewPeople/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <div className="w-5/6 mx-auto mt-5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-md p-8">
      {/* creating form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create User</h1>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChnage}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="text"
            name="email"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded"
            placeholder="Enter email"
            required
            value={inputUser.email}
            onChange={handleChnage}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Age</label>
          <input
            type="number"
            name="age"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded"
            placeholder="Enter age"
            required
            value={inputUser.age}
            onChange={handleChnage}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Gender</label>
          <input
            type="text"
            name="gender"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded"
            placeholder="Male/Female"
            required
            value={inputUser.gender}
            onChange={handleChnage}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 rounded-sm text-white font-bold hover:bg-yellow-500"
          >
            Add User
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md mt-8">
        <table className="w-full text-lg text-center text-gray-500 bg-white rounded-md p-4">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.email}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.age}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.gender}
                </th>
               
                <td className="px-6 py-4">
                  <div className="flex gap-x-4">
                    <NavLink
                      to={`/singlePerson/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateData/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
