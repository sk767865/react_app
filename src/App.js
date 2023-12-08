import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import RootLayout from './pages/RootLayout';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Footer from './pages/Footer';
import NoDataFound from "./pages/NoDataFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

    <Router>
      <RootLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/no-data-found" element={<NoDataFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-center" />
    </Router>

  );
}

export default App;
