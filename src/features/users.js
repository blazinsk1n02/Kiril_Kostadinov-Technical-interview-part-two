import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateUsers: (state, { payload }, index) => {
      // state[index] = payload;
      state.users = payload;
      console.log(payload);
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  addUser,
  updateUsers,
} = usersSlice.actions;
export const usersSelector = (state) => state.users;
export default usersSlice.reducer;

export function fetchUsers() {
  return async (dispatch) => {
    dispatch(getUsers());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      // console.log(data)

      dispatch(getUsersSuccess(data));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}
