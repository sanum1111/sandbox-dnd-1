import React from "react";
import store from "./store";
import { Provider } from "react-redux";

import FieldBase from "./containers/FieldBase";

const App = () => {
  return (
	<Provider store={store}>
		<FieldBase />
	</Provider>
	);
};

export default App;