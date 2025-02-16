import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div>
            <nav>
                <Link to="/page1">Page 1 </Link>
                <Link to="/page2">Page 2</Link>
            </nav>
            <h1>
                Home


            </h1>
        </div>
    )
}