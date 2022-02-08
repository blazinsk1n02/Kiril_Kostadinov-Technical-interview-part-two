import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
};

// export function fetchPosts(userId) {
//   return async (dispatch) => {
//     dispatch(getPosts());
//     try {
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
//       );
//       const data = await response.json();
//       console.log(data);

//       dispatch(getPostsSuccess(data));
//     } catch (error) {
//       dispatch(getPostsFailure());
//     }
//   };
// }
// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (userId, { dispatch }) => {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
//     );
//     const result = await response.json();
//     console.log(result);
//     return result;
//   }
// );

// const postsAdapter = createEntityAdapter({
//   postId: (post) => post.id,
// });
const postsAdapter = createEntityAdapter();

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId, { dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState,
  reducers: {
    addPost: postsAdapter.addOne,
    removePost: postsAdapter.removeOne,
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
    },
    [fetchPosts.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { addPost, removePost } = postsSlice.actions;
export const postsSelector = (state) => state.posts;

export default postsSlice.reducer;
