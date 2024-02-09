import { render, screen, fireEvent } from "@testing-library/react";

import * as React from "react";
import Form from "../components/Form/Form";
import App from "../App";

test("render app", () => {
  render(<App />);
});

test("renders form properly", () => {
  render(<Form />);

  // Test for First Name field
  const firstNameLabel = screen.getByText(/First Name:/i);
  expect(firstNameLabel).toBeInTheDocument();
  const inputFirstName = screen.getByLabelText(/First Name:/i);
  expect(inputFirstName).toHaveAttribute("type", "text");

  // Test for Last Name field
  const lastNameLabel = screen.getByText(/Last Name:/i);
  expect(lastNameLabel).toBeInTheDocument();
  const inputLastName = screen.getByLabelText(/Last Name:/i);
  expect(inputLastName).toHaveAttribute("type", "text");

  // Test for Email field
  const emailLabel = screen.getByText(/Email:/i);
  expect(emailLabel).toBeInTheDocument();
  const inputEmail = screen.getByLabelText(/Email:/i);
  expect(inputEmail).toHaveAttribute("type", "email");

  // Test for Post Code field
  const postCodeLabel = screen.getByText(/Post code:/i);
  expect(postCodeLabel).toBeInTheDocument();
  const inputPostCode = screen.getByLabelText(/Post code:/i);
  expect(inputPostCode).toHaveAttribute("type", "text");

  // Test for Date of Birth field
  const dobLabel = screen.getByText(/Date of birth:/i);
  expect(dobLabel).toBeInTheDocument();
  const inputDob = screen.getByLabelText(/Date of birth:/i);
  expect(inputDob).toHaveAttribute("type", "date");
});

test("submit button is disabled initially", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test("submit button is disabled when First Name is empty", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "" },
  });

  expect(submitButton).toBeDisabled();
});

test("submit button is disabled when Last Name is empty", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "" },
  });

  expect(submitButton).toBeDisabled();
});

test("submit button is disabled when Email is empty", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "" },
  });

  expect(submitButton).toBeDisabled();
});

test("submit button is disabled when Post Code is empty", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "" },
  });

  expect(submitButton).toBeDisabled();
});

test("submit button is disabled when Date of Birth is empty", () => {
  render(<Form />);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "" },
  });

  expect(submitButton).toBeDisabled();
});

test("submit button is enabled when all fields are filled", () => {
  render(<Form />);

  // Remplacez les valeurs suivantes par des données de test valides
  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "2022-01-01" },
  });

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).not.toBeDisabled();
});

/**
 * Tests de la fonction handleSubmission
 */

test("handleSubmission displays error message and alert for invalid email", async () => {
  render(<Form />);

  // Mock window.alert
  window.alert = jest.fn();

  // Set valid values for each field
  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "1111" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "1990-01-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Oups something went wrong !");

  const errorElement = screen.getByTestId("errorEmail");

  // Vérifie si le message d'erreur est présent dans le DOM
  expect(errorElement).toBeInTheDocument();
  expect(errorElement.textContent).toBe("Email format invalide");
});

test("handleSubmission displays error message and alert for invalid first name", () => {
  render(<Form />);
  // Set valid values for each field

  // Mock window.alert
  window.alert = jest.fn();

  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John&" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "1990-01-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Oups something went wrong !");

  const errorElement = screen.getByTestId("errorFirstName");

  // Vérifie si le message d'erreur est présent dans le DOM
  expect(errorElement).toBeInTheDocument();
  expect(errorElement.textContent).toBe(
    "Names and surnames should contain only letters, accents, umlauts, and hyphens. Special characters and numbers are not allowed."
  );
});

test("handleSubmission displays error message and alert for invalid last name", () => {
  render(<Form />);
  // Set valid values for each field

  // Mock window.alert
  window.alert = jest.fn();

  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe&" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "1990-01-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Oups something went wrong !");

  const errorElement = screen.getByTestId("errorLastName");

  // Vérifie si le message d'erreur est présent dans le DOM
  expect(errorElement).toBeInTheDocument();
  expect(errorElement.textContent).toBe(
    "Names and surnames should contain only letters, accents, umlauts, and hyphens. Special characters and numbers are not allowed."
  );
});

test("handleSubmission displays error message and alert for invalid postal code", () => {
  render(<Form />);
  // Set valid values for each field

  // Mock window.alert
  window.alert = jest.fn();

  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "123456" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "1990-01-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Oups something went wrong !");

  const errorElement = screen.getByTestId("errorPostCode");

  // Vérifie si le message d'erreur est présent dans le DOM
  expect(errorElement).toBeInTheDocument();
  expect(errorElement.textContent).toBe(
    "The postal code should consist of five digits in the French format."
  );
});

test("handleSubmission displays error message and alert for age below 18", () => {
  render(<Form />);

  // Mock window.alert
  window.alert = jest.fn();

  // Set valid values for each field
  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "2011-01-11" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Oups something went wrong !");

  const errorElement = screen.getByTestId("errorDob");

  // Vérifie si le message d'erreur est présent dans le DOM
  expect(errorElement).toBeInTheDocument();
  expect(errorElement.textContent).toBe("Age must be 18 or above");
});

test("handleSubmission records data on successful submission", () => {
  render(<Form />);

  // Mock window.alert
  window.alert = jest.fn();
  // Mock window.location.reload
  const reloadMock = jest.fn();
  delete global.window.location;
  global.window.location = { reload: reloadMock };

  // Set valid values for each field
  fireEvent.change(screen.getByLabelText(/First Name:/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email:/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Post code:/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Date of birth:/i), {
    target: { value: "1990-01-01" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check that data is recorded
  const storedData = JSON.parse(localStorage.getItem("userInfo"));
  expect(storedData).toEqual({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    postCode: "12345",
    birthDate: "1990-01-01",
  });

  // Check if location.reload is called
  expect(reloadMock).toHaveBeenCalled();

  // Check if window.alert is called with the expected message
  expect(window.alert).toHaveBeenCalledWith("Data recorded!");
});
