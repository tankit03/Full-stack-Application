import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="Site-title">The Real Estate Database</Link>
            <ul>
                <li>
                <Link to="/">Home</Link>
                <Link to="/properties">properties</Link>
                <Link to="/agent">Agent's</Link>
                <Link to="/user">User</Link>
                <Link to="/viewings">Viewing's</Link>
                <Link to="/reviews">Review's</Link>
                <Link to="/Property-Features">Property Feature's</Link>
                <Link to="/Property-Comparison">Property Comparison</Link>
                </li>
            </ul>
            
            {/* <a href="/" className="Site-title">The Real Estate Database</a> */}
            {/* <ul>
                <li>
                <a href="/">Home</a>
                <a href="/properties">properties</a>
                <a href="/agent">Agent's</a>
                <a href="/user">User</a>
                <a href="/viewings">Viewing's</a>
                <a href="/reviews">Review's</a>
                <a href="/Property-Features">Property Feature's</a>
                <a href="/Propety-Comparison">Property Comparison</a>
                </li>
            </ul> */}
        </nav>
    )
}