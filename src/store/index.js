import { configureStore } from "@reduxjs/toolkit";

import project from "./project";
import editor from "./editor";

export default configureStore({
  reducer: {
    project: project.reducer,
    editor: editor.reducer,
  },
});