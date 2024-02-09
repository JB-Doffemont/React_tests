/**
 *
 * @param {Object} p is people an object with birth attribut
 * @returns int;
 */
export function calculateAge(p) {
  if (!p) {
    throw new Error("missing param p");
  }
  if (typeof p != "object") {
    throw new Error("param is not an object");
  }

  if (!p.hasOwnProperty("birth")) {
    throw new Error("object must have birth property");
  }

  if (p.birth instanceof Date === false) {
    throw new Error("birth must be a Date");
  }

  if (p.birth.toString().includes("Invalid Date")) {
    throw new Error("Date is not valid");
  }

  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
}
