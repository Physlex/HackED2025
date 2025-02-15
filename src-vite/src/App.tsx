/**
 * @details React component. This allows you to write html and it will render as
 * formatted. This will use react-router dom eventually, so look into that to get the
 * SPA going.
* 
 * @returns The highest-level react component
 */

import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

export default function App() {
    return (
        <div>
            <nav className="main-nav">
                <ul>
                    <li key="Home">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li key="page1">
                        <Link to="/page1">
                            Page 1
                        </Link>
                    </li>
                    <li key="page2">
                        <Link to="/page2">
                            Page 2
                        </Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
            </Routes>
        </div>
    )
}
