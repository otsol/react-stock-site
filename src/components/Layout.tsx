import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return(
        <>
        <nav>
            <ul>
            <li>
                <Link to="/">About & Contact</Link>
            </li>
            <li>
                <Link to="/stock_chart">Stock Chart</Link>
            </li>
            <li>
                <Link to="/stock_search">Stock Search</Link>
            </li>
            <li>
                <Link to="/react">React</Link>
            </li>
            </ul>
        </nav>
        

        <Outlet />
        </>
    )
};

export default Layout;