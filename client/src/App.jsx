import { useEffect, useState } from "react";
import Routing from "../Router";
import "./App.css";
import axios from "./Axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { contextData } from "./components/ContextData/ContextData";
function App() {
  const nav = useNavigate();
  // create user context which helps us to get the user where ever we want
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axios.get("/user/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
      nav("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <contextData.Provider value={{ user, setUser }}>
        <Routing />
      </contextData.Provider>
    </>
  );
}

export default App;
