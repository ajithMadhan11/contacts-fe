import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { deleteUser, updateUser } from "./apiHelpers";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
const Tablerow = ({ data }) => {
  const [modal, setModal] = useState(false);

  const [state, setstate] = useState({
    formData: new FormData(),
    fname: data.fname,
    lname: data.lname,
    email: data.email,
    ustate: data.ustate,
    address: data.address,
    pincode: data.pincode,
    phone_number: data.phone_number,
  });
  const {
    fname,
    lname,
    ustate,
    address,
    pincode,
    email,
    phone_number,
    formData,
  } = state;

  const handleChange = (name) => (e) => {
    formData.set(name, e.target.value);
    setstate({ ...state, [name]: e.target.value });
  };

  const deletedetails = (id) => {
    deleteUser(id).then((data) => {
      console.log(data);
      notification("success", "User deleted successfully");
    });
    window.location.reload();
  };

  const editDetails = (id) => {
    updateUser(id, formData).then((data, err) => {
      if (err) {
        console.log("Error Updating event");
      } else {
        setModal(false);
        notification("success", "Post Updated Successfully");
      }
    });
  };
  const notification = (mode, field) => {
    if (mode == "error") {
      return NotificationManager.error(field);
    } else if (mode == "success") {
      return NotificationManager.success(field);
    }
  };

  return (
    <>
      <PureModal
        header="Edit Details"
        footer={
          <button
            className="signin_btn"
            style={{ marginTop: "20px" }}
            onClick={() => editDetails(data._id)}
          >
            Edit Details
          </button>
        }
        width="500px"
        isOpen={modal}
        closeButton="x"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <p className="form_label">First Name</p>
        <input
          type="text"
          className="form_input"
          placeholder="Enter your First Name"
          value={fname}
          onChange={handleChange("fname")}
          required
        />
        <p className="form_label">last Name</p>
        <input
          type="text"
          className="form_input"
          placeholder="Enter your Last Name"
          value={lname}
          onChange={handleChange("lname")}
          required
        />
        <p className="form_label">Email</p>
        <input
          type="email"
          className="form_input"
          placeholder="Enter your Email"
          value={email}
          onChange={handleChange("email")}
          required
        />
        <p className="form_label">Phone Number</p>
        <input
          type="number"
          className="form_input"
          placeholder="Enter your Phone number"
          value={phone_number}
          onChange={handleChange("phone_number")}
          required
        />

        <p className="form_label">State</p>
        <input
          type="text"
          className="form_input"
          placeholder="Enter your State"
          value={ustate}
          onChange={handleChange("ustate")}
          required
        />
        <p className="form_label">Address</p>
        <input
          type="text"
          className="form_input"
          placeholder="Enter your Address"
          value={address}
          onChange={handleChange("address")}
          required
        />
        <p className="form_label">Pincode</p>
        <input
          type="text"
          className="form_input"
          placeholder="Enter your Pincode"
          value={pincode}
          onChange={handleChange("pincode")}
          required
        />
      </PureModal>
      <tr>
        <th scope="row">1</th>
        <td>{data.fname}</td>
        <td>{data.lname}</td>
        <td>{data.email}</td>
        <td>{data.phone_number}</td>
        <td>{data.address}</td>
        <td>{data.ustate}</td>
        <td>{data.pincode}</td>
        <td>
          <button className="btn btn-warning" onClick={() => setModal(true)}>
            Edit
          </button>
        </td>

        <td>
          <button
            className="btn btn-danger"
            onClick={() => deletedetails(data._id)}
          >
            Delete
          </button>
        </td>
      </tr>
      <NotificationContainer />
    </>
  );
};

export default Tablerow;
