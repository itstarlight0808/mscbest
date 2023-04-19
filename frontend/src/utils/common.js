export const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const classType = [
    { name: "Private Class", color: "#ff0000" },
    { name: "Normal Class", color: "#00ff00"},
    { name: "Master Class", color: "#0000ff"},
    { name: "Bootcamp", color: "#af2dbf"}
];
export const classLevel = ["Beginner", "College Prep", "College Student", "Advanced", "Professional"];
export const studentStatus = [
    { name: "Deactive", color: "#ff0000" },
    { name: "Active", color: "#00ff00" },
];
export const transactionType = ["Payment", "Refund", "Charge", "Discount"];

export const omitStringByWords = (string, length) => {
    const words = string.split(" ");
    let newString = "";

    for(let i=0; i<words.length; i++) {
        newString += words[i];
        if(newString.length > length)
            return newString;
        newString += " ";
    }

    return newString;
}

export const isSameByYearMonthDay = (first, second) => {
    if(first.isSame(second, "year") && first.isSame(second, "month") && first.isSame(second, "day"))
        return true;
    return false;
}

export const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    }
};