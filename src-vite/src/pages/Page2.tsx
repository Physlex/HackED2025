import { Link } from "react-router-dom"
import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";


export function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                area-haspopup="true"
                area-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}><Link to="/"> Home</Link></MenuItem>
                <MenuItem onClick={handleClose}> <Link to="/page1">Cool Graph </Link> </MenuItem>
            </Menu>

        </div>
    );
}



export default function Page2() {
    return (
        <div className="Page2">
            <nav>
                <BasicMenu/>
            </nav>
            <h1>
                Page 2
            </h1>
        </div>
    )
}