import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";

import { getallUsers, signout } from "./apiHelpers";
import Tablerow from "./TableRow";

const Home = () => {
  const dispatch = useDispatch();
  const [users, setusers] = useState([]);

  useEffect(() => {
    getallUsers().then((data) => {
      console.log(data);
      if (data.error) {
        console.log("ERROR");
      }
      setusers(data);
    });
    return () => {};
  }, []);

  const logoutUser = () => {
    signout().then(() => {
      dispatch(logout());
      window.location.reload();
    });
  };

  return (
    <>
      <div className="container">
        <h3 className="mt-5">List of Users</h3>
        <button className="btn btn-danger mt-2" onClick={logoutUser}>
          Logout
        </button>
        <table class="table table-light table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fName</th>
              <th scope="col">lName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone no</th>
              <th scope="col">Address</th>
              <th scope="col">State</th>
              <th scope="col">Pincode</th>
              <th scope="col">Edit</th>
              <th scope="col">Pincode</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((data) => {
                return <Tablerow key={data._id} data={data} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
