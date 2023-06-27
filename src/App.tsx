import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header/Header";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Sidebar>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
