import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";
import initialState from "./initialState";

export default createSlice({
  name: "project",
  initialState,
  reducers,
});