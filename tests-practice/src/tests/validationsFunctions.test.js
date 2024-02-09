import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePostCode,
} from "../components/validationFunctions";

/**
 * Tests des fonctions de validations du formulaire
 */

describe("validateFirstName", () => {
  test("returns true for valid first names", () => {
    expect(validateFirstName("John")).toBe(true);
    expect(validateFirstName("Jean-Pierre")).toBe(true);
    expect(validateFirstName("Jean-René")).toBe(true);
  });

  test("returns false for invalid first names", () => {
    expect(validateFirstName("123John")).toBe(false);
    expect(validateFirstName("John@Doe")).toBe(false);
    expect(validateFirstName("Thomas06")).toBe(false);
  });
});

describe("validateLastName", () => {
  test("returns true for valid last names", () => {
    expect(validateLastName("Doe")).toBe(true);
    expect(validateLastName("D'Angelo")).toBe(true);
    expect(validateLastName("Doffémont")).toBe(true);
  });

  test("returns false for invalid last names", () => {
    expect(validateLastName("Doe123")).toBe(false);
    expect(validateLastName("Doe&smith")).toBe(false);
    expect(validateLastName("Dupont39")).toBe(false);
  });
});

describe("validateEmail", () => {
  test("returns true for valid email addresses", () => {
    expect(validateEmail("john.doe@example.com")).toBe(true);
    expect(validateEmail("jean_pierre@domain.fr")).toBe(true);
  });

  test("returns false for invalid email addresses", () => {
    expect(validateEmail("john.doe@com")).toBe(false);
    expect(validateEmail("renaud-test")).toBe(false);
  });
});

describe("validatePostCode", () => {
  test("returns true for valid post codes", () => {
    expect(validatePostCode("06100")).toBe(true);
    expect(validatePostCode("75001")).toBe(true);
  });

  test("returns false for invalid post codes", () => {
    expect(validatePostCode("1234")).toBe(false);
    expect(validatePostCode("123456")).toBe(false);
    expect(validatePostCode("123A5")).toBe(false);
    expect(validatePostCode("123&5")).toBe(false);
  });
});
