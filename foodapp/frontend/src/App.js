import "./App.css";
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./screen/Login";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from "./screen/Signup";
import CartProvider from "./components/ContextReducer";

function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
