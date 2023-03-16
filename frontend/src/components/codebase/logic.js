import axios from "axios";
import { http } from "../../utils/http";
export const getData = async (setCodeList) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}getAllCodes?page=1&limit=20`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    if (!data.success) {
    } else {
      setCodeList(data.codes);
    }
  } catch (error) {}
};

export const getSingleCode = async (id, setCodeData) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}code/${id}`,
      {
        withCredentials: true,
      }
    );

    if (!data.success) {
    } else {
      setCodeData(data.code);
    }
  } catch (error) {}
};

export const getNewRoom = () => {
  return new Promise((resolve, reject) => {
    http(`${process.env.REACT_APP_BACKEND_URL}room/getNewRoom/`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteFile = (id) => {
  return new Promise((resolve, reject) => {
    http(`${process.env.REACT_APP_BACKEND_URL}code/delete/`, "DELETE", { id })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
