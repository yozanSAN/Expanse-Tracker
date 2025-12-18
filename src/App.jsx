import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes> 
               <Route path="/" element={<Home/>}/>
               <Route path="/signup" element={<Register/>}/>
               <Route path="/login" element={<Login/>}/>
            </Routes>  
    </div>
  )
}
