import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./src/Pages/Home/Home";
import Register from "./src/components/Auth/Register";
import LayOut from "./src/components/LayOut/LayOut";
import Landing from "./src/Pages/Landing/Login";
import AskQuestion from "./src/Pages/AskQuestion/AskQuestion";
import QuestionDetail from "./src/Pages/Question Detiail&Answer/QuestionDetail";

const Routing = () => {
  return (
    <LayOut>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/askQuestion" element={<AskQuestion />} />
        <Route path="/question/:question_id" element={<QuestionDetail />} />
      </Routes>
    </LayOut>
  );
};

export default Routing;
