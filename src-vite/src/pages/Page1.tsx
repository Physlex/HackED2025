

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}



export default function Page1() {
    return (
        <div className="Page1">
            <nav>
            <Link to="/">Home </Link>
            <Link to="/Page2">Page2</Link>   
                
            </nav>
            
            <h1>
            Welcome to our awesome website and cool data tracker </h1>

            <ButtonUsage />
            
        </div>
    )
}