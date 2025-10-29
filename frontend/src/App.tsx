import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Navbar from "@/components/layouts/Navbar.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;