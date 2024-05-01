import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import CreateContactPage from "./pages/CreateContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/create" element={<CreateContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
