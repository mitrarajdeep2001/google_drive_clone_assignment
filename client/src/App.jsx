import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/auth" />;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
