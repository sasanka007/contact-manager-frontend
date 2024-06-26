import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactList from "../components/ContactList";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNoOfContacts, setTotalNoOfContacts] = useState(0);
  useEffect(() => {
    fetchContacts(page);
  },[page]);

  const fetchContacts = async (page) => {
    try {
      const response = await axios.get(
        `https://contact-manager-backend2.onrender.com/api/contacts?page=${page}`
      );
      setContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
      setTotalNoOfContacts(response.data.totalNoOfContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div>
      <ContactList
        contacts={contacts}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        totalNoOfContacts={totalNoOfContacts}
      />
    </div>
  );
};

export default ContactsPage;
