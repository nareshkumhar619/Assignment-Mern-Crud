import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const history = useNavigate();
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const { id } = useParams();

  // data fetching single
  const fetchSingleUser = async () => {
    const res = await axios.get(`https://naresh-8neg.onrender.com/NewPeople/${id}`);
    console.log(res);
    setInputUser({
      name: res.data.name,
      email: res.data.email,
      age: res.data.age,
      gender: res.data.gender,
    });
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);
    const res = await axios.put(`https://naresh-8neg.onrender.com/NewPeople/${id}`, inputUser);
    console.log(res);
    if (res.status === 200) {
      //   window.location = "/";
      history("/dash");
    }
    // fetchAllUser();
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Update User</h1>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            className="block w-full py-3 px-4 text-md text-gray-900 bg-transparent border-2 border-gray-300 rounded-md"
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
            className="block w-full py-3 px-4 text-md text-gray-900 bg-transparent border-2 border-gray-300 rounded-md"
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
            className="block w-full py-3 px-4 text-md text-gray-900 bg-transparent border-2 border-gray-300 rounded-md"
            placeholder="Enter Age"
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
            className="block w-full py-3 px-4 text-md text-gray-900 bg-transparent border-2 border-gray-300 rounded-md"
            placeholder="Male/Female"
            required
            value={inputUser.gender}
            onChange={handleChnage}
          />
        </div>

        <div className="flex justify-center my-6">
          <button type="submit" className="px-6 py-3 bg-yellow-400 rounded-md text-white font-bold hover:bg-yellow-500">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
