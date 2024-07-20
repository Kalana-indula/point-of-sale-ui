import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import SingleProduct from './pages/SingleProduct';
import Category from './pages/Category';
import AddProduct from './pages/AddProduct';
import Checkout from './pages/Checkout';
import { CartProvider } from './pages/CreateContext';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <>

      <div className='application-body'>
        <BrowserRouter>
          <CartProvider>
            <div className='header-section'>

              <Navbar />

            </div>

            <Routes>
              <Route element={<ProtectedRoutes/>}>
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/categories/:id" element={<Category />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>

              <Route index element={<Home />} />

              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
