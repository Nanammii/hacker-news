import {createAsyncThunk} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../const.js";

export const newsListUrl = `${BACKEND_URL}/newstories.json`;
export const newsUrl = `${BACKEND_URL}/item`;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async () => {
    const response = await fetch(newsListUrl);
    return await response.json();
  }
)

export const fetchNewsDetails = createAsyncThunk(
  'news/fetchNewsDetails',
  async (id) => {
    const response = await fetch(`${newsUrl}/${id}.json`);
    const data =  await response.json();

    return data;
  }
)
