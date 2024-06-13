import { useEffect, useState } from "react";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";

const App = () => {
  const [token, setToken] = useState(null);


  useEffect(()=>{
    // fetch access and refresh token pair for the fitst time when user opens the application.
    try {
      
    } catch (error) {
      
    }
  },[])
  return (
    <AuthWrapper />
  )
}


export default App;