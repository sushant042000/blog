import {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
} from "../slices/userSlices"
import { userApi } from "../../api/userApi";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserStart());
    const response = await userApi.register(userData);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(
      registerUserFailure(
        error.message || "An error occurred during registration."
      )
    );
  }
};
