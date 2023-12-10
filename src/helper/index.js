export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("comments")) || [];
};

export const commentDataBackUp = (data) => {
  localStorage.setItem("comments", JSON.stringify(data));
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  // Extracting components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month starts from 0
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Formatting the date
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return { formattedDate, formattedTime };
};
