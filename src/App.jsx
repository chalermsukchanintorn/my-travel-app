import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import AddMyTravel from "./views/AddMyTravel"
import EditMyTravel from "./views/EditMyTravel"
import MyTravel from "./views/MyTravel"
import Register from "./views/Register"
import CssBaseline from '@mui/material/CssBaseline';
import EditProfile from "./views/EditProfile";

function App() {

  return (
    <>
      <CssBaseline future={{ v7_relativeSplatPath: true }} />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes >
          <Route path="/" element={<Login />} />
          <Route path="/addmytravel" element={<AddMyTravel />} />
          <Route path="/editmytravel/:travelId" element={<EditMyTravel />} />
          <Route path="/mytravel" element={<MyTravel />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/editprofile/" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
