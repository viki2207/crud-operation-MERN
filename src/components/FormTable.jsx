import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";
const FormTable = ({ handleSubmit, handleChange, handleclose, rest }) => {
  return (
    <div>
      {" "}
      <div className="addContainer">
        <form onSubmit={handleSubmit}>
          <div className="close-btn" onClick={handleclose}>
            <MdClose />
          </div>
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={rest.name}
          />
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={rest.email}
          />
          <label htmlFor="mobile"> Mobile: </label>
          <input
            type="number"
            name="mobile"
            id="mobile"
            value={rest.mobile}
            onChange={handleChange}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormTable;
