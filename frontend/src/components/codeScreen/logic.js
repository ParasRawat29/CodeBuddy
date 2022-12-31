import store from "../../store/rootReducer";
import { http } from "../../utils/http";
export const saveCode = async (alert, fileName) => {
  let st = store.getState();

  return new Promise((resolve, reject) => {
    http(`/saveCode`, "POST", {
      code: st.code.code,
      language: st.code.language.val,
      fileName,
    })
      .then((res) => {
        if (res.data.success) {
          resolve("Code Saved");
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response);
        reject(err);
        // if (err.response.status === 401) {
        //   // user is not signed in
        //   alert.info(err.response.data.message);
        //   dispatch(loginAction.setActive(1));
        // } else if (err.response.status === 400) {
        //   // payload is not correct
        //   console.log(err);
        //   alert.info(err.response.data.message);
        // }
      });
  });
};

export const runCode = async () => {
  const { language, code } = store.getState().code;
  return new Promise((resolve, reject) => {
    http(`/run`, "POST", {
      language: language.val,
      code: code,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.data.error.stderr);
      });
  });
};
