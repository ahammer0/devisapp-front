export const toFormDateString = (date: string | Date) => {
  console.log(date);
  if (typeof date === "string") {
    const test = new Date(date);
    if (test.toString() !== "Invalid Date") {
      return test.toISOString().split("T")[0];
    }
  }
  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }
  return date.split(" ")[0];
};
