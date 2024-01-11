import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,NavLink } from "react-router-dom";


const ReadUser = () => {
  const { id } = useParams();
  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchSingleUser = async () => {
    const res = await axios.get(`https://naresh-8neg.onrender.com/NewPeople/${id}`);
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <div className="w-2/3 mx-auto mt-5">
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {userData.name}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {userData.email}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {userData.age}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {userData.gender}
              </th>
             
            </tr>
          </tbody>
        </table>
      </div>
      <NavLink
  to={`/dash`}
  className="block mx-auto py-2 px-4 bg-blue-500 text-white-700 dark:text-blue-500 rounded hover:bg-blue-600 hover:underline text-center font-bold"
>
  Back
</NavLink>


    </div>
  );
};

export default ReadUser;