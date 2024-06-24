import React, { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";
import "./styles/App.css";

function App() {
  //Initialize the state for emails and the hideRead checkbox
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  //Function to toggle the read state of an email
  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  //Function to toggle the star state of an email
  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id
        ? { ...email, starred: !email.starred }
        : email
    );
    setEmails(updatedEmails);
  };

  //Filter emails based on the hideRead state
  const filteredEmails = hideRead
    ? emails.filter((email) => !email.read)
    : emails;

  // Render the component
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">
              {emails.filter((email) => !email.read).length}
            </span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((email) => email.starred).length}
            </span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
          >
            <input
              type="checkbox"
              checked={email.read}
              onChange={() => toggleRead(email)}
            />
            <span
              className={`star ${email.starred ? "starred" : ""}`}
              onClick={() => toggleStar(email)}
            >
              ☆
            </span>
            <span className="sender">{email.sender}</span>
            <span className="title">{email.title}</span>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
