

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

   

function ButtonUsage() {
    const click = () => {
        alert("Page 1");
      }
  return <Button onClick={click}>Hello </Button>;
  
}



export default function Page1() {
    return (
        <div className="Page1">
            <nav>
            <Link to="/">Home </Link>
            <Link to="/Page2">Page2</Link>   
                
            </nav>
            
            <h1>
          Page 1 </h1>
            
            <ButtonUsage />
            
        </div>
    )
}