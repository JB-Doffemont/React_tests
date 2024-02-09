/**
 *
 * @param {String} firstName
 * @returns boolean;
 */
const validateFirstName = (firstName) => {
  const regex = /^[a-z ,.'\-, à-ü]+$/i;
  return regex.test(firstName);
};

/**
 *
 * @param {String} lastName
 * @returns boolean;
 */
const validateLastName = (lastName) => {
  const regex = /^[a-z ,.'\-, à-ü]+$/i;
  return regex.test(lastName);
};

/**
 *
 * @param {String} email
 * @returns boolean;
 */
const validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(email);
};

/**
 *
 * @param {String} postCode
 * @returns boolean;
 */
const validatePostCode = (postCode) => {
  const regex = /^(\d{5})$/;
  return regex.test(postCode);
};

export { validateFirstName, validateLastName, validateEmail, validatePostCode };
