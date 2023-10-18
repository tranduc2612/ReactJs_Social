import { createAsyncThunk } from '@reduxjs/toolkit'
import fetchApiWithSignal from '~/services/FetchApiWithSignal';
import * as request from "~/services/base"
import checkResponse from '~/utils/checkResponse';

export const getListPost = createAsyncThunk(
  'post/getList',
  async (payload,options) => {
    // Đoạn này đóng vai trò như gọi từ service
    try {
        const resPost = await request.Get(`/post/get-list?page_count=${payload.pageCount}&page_index=${payload.pageIndex}`, {}, payload.token);
        if (checkResponse(resPost)) {
            return resPost
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
  }
)

export const createPost = createAsyncThunk(
    'post/addPost',
    async (payload,options) => {
      // Đoạn này đóng vai trò như gọi từ service
      try {
        const {token,...reqData} = payload
        const reqHandle = await request.Post(
            "/post/handle-post", reqData, token
        )

        if (checkResponse(reqHandle)) {
            return reqHandle
        }
      } catch (error) {
          console.log(error)
      }
    }
  )

  export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (payload,options) => {
      // Đoạn này đóng vai trò như gọi từ service
      try {
        const {token,...reqData} = payload
        console.log(reqData,"sdsd")
        const reqHandle = await request.Post(
            "/post/handle-post", reqData, token
        )
        if (checkResponse(reqHandle)) {
            return reqHandle
        }
      } catch (error) {
          console.log(error)
      }
    }
  )

  export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (payload,options) => {
      // Đoạn này đóng vai trò như gọi từ service
      try {
        const {token,...reqData} = payload
        const reqHandle = await request.Post(
            "/post/handle-post", reqData, token
        )

        if (checkResponse(reqHandle)) {
            return reqHandle
        }
      } catch (error) {
          console.log(error)
      }
    }
  )