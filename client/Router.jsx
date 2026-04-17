import { Route, Routes } from "react-router-dom";
import Home from "./src/Pages/Home/Home";
import Register from "./src/components/Auth/Register";
import LayOut from "./src/components/LayOut/LayOut";
import Landing from "./src/Pages/Landing/Login";
import AskQuestion from "./src/Pages/AskQuestion/AskQuestion";
import QuestionDetail from "./src/Pages/Question Detiail&Answer/QuestionDetail";
import ProtectedRoute from "./src/components/ProtectedRoute";

const Routing = () => {
  return (
    <LayOut>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/askQuestion"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question/:question_id"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </LayOut>
  );
};

export default Routing;
