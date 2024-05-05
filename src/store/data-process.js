import {createSlice} from "@reduxjs/toolkit";
import {fetchNews, fetchNewsDetails} from "./api-actions.js";

const initialState = {
  news: [],
  isNewsLoading: false,
  hasError: false,
  newsDetails: [],
  isDetailsLoading: false,
  comments: [],
  isKids: false
}

export const dataProcess = createSlice({
  name: 'news',
  initialState,
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
        state.newsDetails = [...state.newsDetails, action.payload];
        state.comments = [...state.comments, action.payload]
        state.isDetailsLoading = false
      })
      .addCase(fetchNewsDetails.rejected, (state) => {
        state.isDetailsLoading = false;
        state.hasError = true
      })
  }
})

export const {setCurrentNewsItem} = dataProcess.actions;
