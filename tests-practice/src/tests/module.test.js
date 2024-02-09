import { calculateAge } from "../components/module";

describe("calculateAge Unit Test Suites", () => {
  it("should return a correct age", () => {
    let today = new Date();
    let birth = today.setFullYear(today.getFullYear() - 20);
    let p = { birth: new Date(birth) };
    expect(calculateAge(p)).toEqual(20);
  });

  it('should throw a "missing param p" error', () => {
    expect(() => calculateAge()).toThrow("missing param p");
  });

  it('should throw a "param is not an object" error', () => {
    expect(() => calculateAge("not an object")).toThrow(
      "param is not an object"
    );
  });

  it('should throw a "object must have birth property" error', () => {
    const p = {
      name: "JB",
    };
    expect(() => calculateAge(p)).toThrow("object must have birth property");
  });

  it('should throw a "birth must be a Date" error', () => {
    const p = {
      name: "JB",
      birth: "Date",
    };
    expect(() => calculateAge(p)).toThrow("birth must be a Date");
  });

  it('should throw a "Date is not valid" error', () => {
    const p = {
      name: "JB",
      birth: new Date("17/17/1986"),
    };
    expect(() => calculateAge(p)).toThrow("Date is not valid");
  });
});
