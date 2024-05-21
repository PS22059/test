import { createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios").default;

export const createOrder = createAsyncThunk(
    "CREATE_ORDER",
    async (order, { rejectWithValue }) => {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const config = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER}/order/new`,
          order,
          config
        );
        return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );