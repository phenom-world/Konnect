import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export const login = (formData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await postDataAPI("login", formData);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: data.access_token,
        user: data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: data?.msg,
      },
    });
  } catch (err) {
    toast.error(err.response?.data?.msg);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    dispatch({ type: "SET_AUTH_LOADING", payload: true });

    try {
      const {
        data: { data },
      } = await postDataAPI("refresh");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: data.access_token,
          user: data.user,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      dispatch({ type: "SET_AUTH_LOADING", payload: false });
    } catch (err) {
      dispatch({ type: "SET_AUTH_LOADING", payload: false });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response?.data?.msg,
        },
      });
    }
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await postDataAPI("register", formData);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: data.access_token,
        user: data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
  } catch (err) {
    toast.error(err.response?.data?.msg);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logout" });
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data.msg,
      },
    });
  }
};
