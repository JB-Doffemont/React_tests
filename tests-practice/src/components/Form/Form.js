import React, { useState } from "react";
import { calculateAge } from "../module";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePostCode,
} from "../validationFunctions";
import "./Form.css";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [postCode, setPostCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorFirstNameMessage, setErrorFirstNameMessage] = useState("");
  const [errorLastNameMessage, setErrorLastNameMessage] = useState("");
  const [errorDobMessage, setErrorDobMessage] = useState("");
  const [errorPostCodeMessage, setErrorPostCodeMessage] = useState("");

  const handleSubmission = () => {
    if (!validateFirstName(firstName)) {
      setErrorFirstNameMessage(
        "Names and surnames should contain only letters, accents, umlauts, and hyphens. Special characters and numbers are not allowed."
      );
      alert("Oups something went wrong !");
    } else if (!validateLastName(lastName)) {
      setErrorLastNameMessage(
        "Names and surnames should contain only letters, accents, umlauts, and hyphens. Special characters and numbers are not allowed."
      );
      alert("Oups something went wrong !");
    } else if (!validateEmail(email)) {
      setErrorEmailMessage("Email format invalide");
      alert("Oups something went wrong !");
    } else if (!validatePostCode(postCode)) {
      setErrorPostCodeMessage(
        "The postal code should consist of five digits in the French format."
      );
      alert("Oups something went wrong !");
    } else if (calculateAge({ birth: new Date(birthDate) }) < 18) {
      setErrorDobMessage("Age must be 18 or above");
      alert("Oups something went wrong !");
    } else {
      setErrorEmailMessage(true);
      localStorage.clear();
      let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        postCode: postCode,
        birthDate: birthDate,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));
      window.location.reload();
      alert("Data recorded!");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} data-testid="form-component">
      <label>
        First Name:
        <input
          className="input-field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          type="text"
          required
        />
        {errorFirstNameMessage && (
          <p data-testid="errorFirstName" className="error">
            {errorFirstNameMessage}
          </p>
        )}
      </label>

      <label>
        Last Name:
        <input
          className="input-field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          type="text"
          required
        />
        {errorLastNameMessage && (
          <p data-testid="errorLastName" className="error">
            {errorLastNameMessage}
          </p>
        )}
      </label>

      <label>
        Email:
        <input
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          type="email"
          required
        />
        {errorEmailMessage && (
          <p data-testid="errorEmail" className="error">
            {errorEmailMessage}
          </p>
        )}
      </label>

      <label>
        Post Code:
        <input
          className="input-field"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          placeholder="Enter your post code"
          type="text"
          name="postCode"
          required
        />
        {errorPostCodeMessage && (
          <p data-testid="errorPostCode" className="error">
            {errorPostCodeMessage}
          </p>
        )}
      </label>

      <label>
        Date of Birth:
        <input
          className="input-field"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Select your date of birth"
          max={new Date().toISOString().split("T")[0]}
          type="date"
          name="birthDate"
          required
        />
        {errorDobMessage && (
          <p data-testid="errorDob" className="error">
            {errorDobMessage}
          </p>
        )}
      </label>

      <button
        className="submit-button"
        onClick={handleSubmission}
        disabled={!email || !firstName || !lastName || !postCode || !birthDate}
        name="submit"
        data-testid="buttonSubmit"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
