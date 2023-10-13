import React from "react";
import store from "./store";
import { Provider } from "react-redux";

import Editor from "./containers/Editor";
import Renderer from "./containers/Renderer";

const App = () => {
  return (
	<Provider store={store}>
		<Editor renderer={Renderer} />
	</Provider>
	);
};

export default App;