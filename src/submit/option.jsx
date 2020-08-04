import React, { Component } from "react";
import "./submit.css";

const Option = ({ id, valueOption, label, readonly, nameOption, onChange }) => {
  return (
    <React.Fragment>
      <textarea
        style={{ marginTop: "2vh" }}
        placeholder={label}
        className="input"
        id={id}
        name={nameOption}
        rows="2"
        cols="40"
        value={valueOption}
        onChange={onChange}
        required
        readOnly={readonly}
      ></textarea>
    </React.Fragment>
  );
};

export default Option;
