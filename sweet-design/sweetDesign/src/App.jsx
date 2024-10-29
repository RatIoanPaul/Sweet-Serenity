import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/index";
import SignIn from "./pages/loginPage/index";
import Register from "./pages/registerPage/index";
import VerificationOtp from "./pages/verificationOtp/index";

const App = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path='/PatientMainPage' element={<PatientRoute><PatientMainPage/></PatientRoute>}/><Route path='/PatientMainPage' element={<PatientRoute><PatientMainPage/></PatientRoute>}/>*/}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerificationOtp />} />
            </Routes>
        </Router>
    );
};

export default App;
