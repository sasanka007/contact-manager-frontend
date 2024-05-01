import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
const ContactList = ({
  contacts,
  setPage,
  page,
  totalPages,
  totalNoOfContacts,
}) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    setSelectAll(false);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    setSelectAll(false);
  };

  const handleCheckboxChange = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
      setSelectAll(false);
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
      if (contacts.length === selectedContacts.length + 1) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAllChange = () => {
    if (!selectAll) {
      setSelectedContacts(contacts.map((contact) => contact._id));
      setSelectAll(true);
    } else {
      setSelectedContacts([]);
      setSelectAll(false);
    }
  };

  const downloadSelectedContacts = async () => {
    try {
      const response = await axios.post(
        "https://contact-manager-backend2.onrender.com/api/contacts/download",
        { contactIds: selectedContacts },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contacts.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading contacts:", error);
    }
  };

  return (
    <div>
      <button
        onClick={downloadSelectedContacts}
        disabled={!selectedContacts.length}
        style={{ marginBottom: "1rem", float: "right" }}
      >
        Download
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Tags</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact._id)}
                  onChange={() => handleCheckboxChange(contact._id)}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.mobileNumber}</td>
              <td>{contact.tags.join(", ")}</td>
              <td>API</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <div>
          Entries {(page - 1) * 10 + 1} -{" "}
          {page === totalPages ? totalNoOfContacts : page * 10}
        </div>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;
