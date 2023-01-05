import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import RandomUserPage from "../pages/randomUserPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="SignUp" element={<SignUpPage />} />
        <Route path="RandomUser" element={<RandomUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
