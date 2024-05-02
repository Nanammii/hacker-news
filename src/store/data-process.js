import {createSlice} from "@reduxjs/toolkit";
import {fetchNews, fetchNewsDetails} from "./api-actions.js";

const initialState = {
  news: [],
  isNewsLoading: false,
  hasError: false,
  newsDetails: {},
  isDetailsLoading: false,
  currentNewsItem: null,
  comments: [],
  isKids: false
}

export const dataProcess = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCurrentNewsItem: (state, action) => {
      state.currentNewsItem = action.payload;
    },
    setComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setIsKids: (state, action) => {
      state.isKids = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isNewsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.isNewsLoading = false
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isNewsLoading = false;
        state.hasError = true
      })
      .addCase(fetchNewsDetails.pending, (state) => {
        state.isDetailsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchNewsDetails.fulfilled, (state, action) => {
        state.newsDetails = action.payload;
        state.isDetailsLoading = false
      })
      .addCase(fetchNewsDetails.rejected, (state) => {
        state.isDetailsLoading = false;
        state.hasError = true
      })
  }
})

export const {setCurrentNewsItem} = dataProcess.actions;
