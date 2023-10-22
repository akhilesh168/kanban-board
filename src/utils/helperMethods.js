export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const createKeysObject = (cards) => {
  const newArray = {};
  cards.forEach((item) => {
    newArray[item] = [];
  });
  return newArray;
};
