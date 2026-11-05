import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/">
                    Product Manager
                </NavLink>

                <div className="navbar-nav ms-auto">
                    <NavLink className="nav-link" to="/">
                        Products
                    </NavLink>

                    <NavLink className="nav-link" to="/add">
                        Add Product
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar