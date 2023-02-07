import "bootstrap/dist/css/bootstrap.min.css";
import { Link, MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "./pages/Grid";
import User from "./pages/User";
const App: React.FC = () => {
    return (
        <div className="container-fluid px-0">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Grid />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/grid" element={<Grid />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
