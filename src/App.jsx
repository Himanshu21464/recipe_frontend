import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import RecipeForm from "./components/RecipeForm/RecipeForm.jsx";
import RecipeCatalog from "./components/RecipeCatalog/RecipeCatalog.jsx";
import DeleteRecipe from "./components/DeleteRecipe/DeleteRecipe.jsx";
import LoginSignupPage from "./components/Auth/LoginSignupPage.jsx";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<RecipeCatalog />} />
          <Route path="/RecipeForm" element={<RecipeForm />} />
          <Route path="/delete-recipe" element={<DeleteRecipe />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
