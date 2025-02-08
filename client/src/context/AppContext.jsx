import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/users/credit`, {
        headers: {
          token: token,
        },
      });
      if (data.success) {
        setCredit(data.user.credit);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addCreditData = async(input)=>{
    try {
      const {data} = await axios.post(`${backendURL}/api/users/add-credit`,{input},{
        headers:{
          token: token
        }
      })
      if(data.success){
        loadCreditData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/image/generate`,
        { prompt },
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.success) {
        loadCreditData()
        return data.image;
      }else{
        toast.error(data.message);
        loadCreditData()
        if(data.credit==0){
          navigate('/buy-credit')
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setshowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logOut,
    generateImage,
    addCreditData
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
