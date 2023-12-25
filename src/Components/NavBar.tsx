import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";


function NavBar() {
    const navigate = useNavigate()
    const goToMainPage = () => {
        const newpath = `/`
        navigate(newpath)
    }
    const goToAuthPage = () => {
        const newpath = `/auth`
        navigate(newpath)
    }
    const goToRegistrationPage = () => {
        const newpath = `/register`
        navigate(newpath)
    }
    const goToCreationPage = () => {
        const newpath = `/creation`
        navigate(newpath)
    }
    const goToCreationHistoryPage = () => {
        const newpath = `/creationHistory`
        navigate(newpath)
    }
    const goToComponentFormPage = () => {
        const newpath = `/componentForm`
        navigate(newpath)
    }
    const dispatch = useDispatch()
    return (
        <Navbar className="bg-body-tertiary justify-content-between" style={{width: 1000}}>
            <Button onClick={goToMainPage}>
                Компоненты
            </Button>
        </Navbar>
    );
}

export default NavBar;