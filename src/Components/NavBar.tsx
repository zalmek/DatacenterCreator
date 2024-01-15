import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";


function NavBar() {
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Link className="nav-link text-dark" to={"/DatacenterCreator"}>
                Компоненты
            </Link>
        </Navbar>
    );
}

export default NavBar;