export const checkValidInput = (amount, date) => {
  // Check if the amount is valid
  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return false;
  }

  // Check if the date is valid
  if (!date) {
    alert("Please enter a valid date");
    return false;
  }

  // Check if the date is not in the future
  if (new Date(date) > new Date()) {
    alert("Please enter a date that is not in the future");
    return false;
  }

  return true;
};
