import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom";


function NavBar() {
    const navigate = useNavigate()
    const goToMainPage = () => {
        const newpath = `/`
        navigate(newpath)
    }
    return (
        <Navbar className="bg-body-tertiary justify-content-between" style={{width: 1000}}>
            <Button onClick={goToMainPage}>
                Компоненты
            </Button>
        </Navbar>
    );
}

export default NavBar;