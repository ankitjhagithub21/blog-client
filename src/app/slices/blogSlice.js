import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs:(state,action)=>{
        state.blogs=action.payload
    },
   
  },
})


export const { setBlogs} = blogSlice.actions

export default blogSlice.reducer