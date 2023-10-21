import { createSlice } from '@reduxjs/toolkit'
import { getListPost,createPost, deletePost,updatePost } from '../actions/postActions'
import { getValueLocalStorage } from '~/utils/contactWithLocalStorage'

const initialState = []

console.log(initialState)
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getList: (state, action) =>{
    },
    addPost: (state, action) => {
    },
    removePost: (state) => {
    },
    clearPost: (state, action)=>{
      state = [];
      return state
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(getListPost.fulfilled,(state,action) =>{
      console.log(action)
      if(action.payload){
        return [...state,...action.payload?.returnObj];
      }
    })
    builder.addCase(createPost.fulfilled,(state,action) =>{
      if(action.payload){
        return [action.payload?.returnObj, ...state];
      }
    })
    builder.addCase(updatePost.fulfilled,(state,action) =>{
      if(action.payload){
        const updatedPost = action.payload?.returnObj;
      
      // Tìm và cập nhật bài viết trong mảng state
        const updatedState = state.map((post) => {
          console.log(post.post_id,updatedPost.post_id,"ssds")
          if (post.post_id === updatedPost.post_id) {
            return updatedPost;
          }
          return post;
        });

        return updatedState;
      }
    })
    builder.addCase(deletePost.fulfilled,(state,action) =>{
      if(action.payload){
        const postIdToDelete = action.payload;
        return state.filter((post)=>post.post_id != action.payload.returnObj)
      }
    })
  }
})



export const { clearPost } = postSlice.actions;

export default postSlice.reducer