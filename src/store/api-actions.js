import {createAsyncThunk} from "@reduxjs/toolkit";
import {BACKEND_URL, NEWS_PER_PAGE} from "../const.js";

export const newsListUrl = `${BACKEND_URL}/newstories.json`;
export const newsUrl = `${BACKEND_URL}/item`;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async () => {
    const response = await fetch(newsListUrl);
    const result = await response.json();
    const dataNews = result.slice(0, NEWS_PER_PAGE);
    return dataNews;
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
