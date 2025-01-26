// src/utils/fileUtils.js

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // e.g. "data:application/pdf;base64,JVBERi0xLjUK..."
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  