import { Link } from "react-router-dom"

export default function Page2() {
    return (
        <div className="Page2">
            <nav>
                <Link to="/">Home </Link>
                <Link to="/Page1">Page1</Link>      
            </nav>
            <h1>
                Page 2
            </h1>
        </div>
    )
}