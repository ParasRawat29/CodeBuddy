const { http } = require("../utils/http");

export const newRoom = () => {
  return new Promise((resolve, reject) => {
    http("/room/getNewRoom")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const validateRoom = (id) => {
  return new Promise((resolve, reject) => {
    http("/room/validate", "POST", { id })
      .then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else reject(res.data.message);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};
