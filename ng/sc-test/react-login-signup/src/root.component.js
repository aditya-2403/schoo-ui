import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
export default function Root(props) {
  return(
    <>
    <BrowserRouter>
   <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}
