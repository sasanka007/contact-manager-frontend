import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateContactPage = () => {
  const [contactData, setContactData] = useState({
    name: "",
    mobileNumber: "",
    tags: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/createContact", {
        ...contactData,
        tags: contactData.tags.split(","),
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={contactData.name}
        onChange={handleChange}
        required
        style={{ width: "20rem", marginBottom: "0.5rem", padding: "0.3rem" }}
      />

      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        name="mobileNumber"
        value={contactData.mobileNumber}
        onChange={handleChange}
        style={{ width: "20rem", marginBottom: "0.5rem", padding: "0.3rem" }}
        required
      />

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={contactData.tags}
        style={{ width: "20rem", marginBottom: "0.5rem", padding: "0.3rem" }}
        onChange={handleChange}
      />

      <button style={{ marginTop: "1rem", width: "10rem" }} type="submit">
        Create Contact
      </button>
    </form>
  );
};

export default CreateContactPage;
