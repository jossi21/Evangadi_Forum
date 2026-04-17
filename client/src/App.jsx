import { useEffect, useState } from "react";
import "./App.css";
import axios from "./Axios/axiosConfig";
import { contextData } from "./components/ContextData/ContextData";
import Routing from "../Router";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get("/user/checkUser");
      setUser({ username: data.username, userid: data.userid });
    } catch (error) {
      console.log("Auth check failed:", error?.response?.data?.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <contextData.Provider value={{ user, setUser }}>
      <Routing />
    </contextData.Provider>
  );
}

export default App;
