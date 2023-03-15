import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Roles from "./web/Roles/Roles";
import Users from "./web/Users/Users";
import { Provider } from "react-redux";
import store from "./store/configureStore"

function App() {  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/roles" element={<Roles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Navigate replace to="/roles" />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
