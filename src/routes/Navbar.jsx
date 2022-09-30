import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className="nav">
            <Link className="nav__logo" to="/">
                <h3>LOGO</h3>
            </Link>
            <aside 
                className="nav__icon"
                onClick={handleClick}
                    >{open ? <FiX /> : <FiMenu />}
            </aside>
            <ul className={open ? 
                "nav__links active" : 
                "nav__links"}>
                <li className="nav__item">
                    <Link to="/"
                        className="nav__link"
                        onClick={closeMenu}
                        >Home
                    </Link>    
                </li>
                <li className="nav__item">
                    <Link to="/add"
                        className="nav__link"
                        onClick={closeMenu}
                        >Add
                    </Link>    
                </li>
            </ul>
        </nav>
    );
};



