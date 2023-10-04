import { configureStore } from "@reduxjs/toolkit";

import project from "./project";

export default configureStore({
  reducer: {
    project: project.reducer,
  },
});