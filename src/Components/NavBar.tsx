import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom";
import {reset, useAuth, useCurrentRequestId} from "../store/data/slice.ts";
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
    const auth = useAuth()
    const dispatch = useDispatch()
    const requestId = useCurrentRequestId()
    const requestView =
        requestId === null ? (
            <div>
                <Button onClick={goToCreationPage} disabled={true}>
                    Заявка
                </Button>
            </div>
        ) : (
            <div>
                <Button onClick={goToCreationPage}>
                    Заявка
                </Button>
            </div>
        )
    const displayForm =
        auth?.is_staff ? (
            <div>
                <Button onClick={goToComponentFormPage}>
                    Новый компонент
                </Button>
            </div>
        ) : (
            <></>
        )
    const requestHistory =
        requestId === null && !auth?.is_staff ? (
            <div>
                <Button onClick={goToCreationHistoryPage} disabled={true}>
                    История заявок
                </Button>
            </div>
        ) : (
            <div>
                <Button onClick={goToCreationHistoryPage}>
                    История заявок
                </Button>
            </div>
        )
    const loginDisplay =
        auth === null ? (
            <div>
                <Button onClick={goToAuthPage}>
                Войти
                </Button>{' '}
                <Button onClick={goToRegistrationPage}>
                    Зарегистрироваться
                </Button>
            </div>
        ) : (
            <div>
                Логин: <div className="btn btn-primary disabled">{auth.email}</div>
                <button className="btn btn-info ms-1" style={{position: 'absolute'}} onClick={
                    () => {
                        dispatch(reset())
                        axios.post("api/logout").then((result) => {
                            console.log(result)
                        })
                        navigate("/")
                    }
                }>
                    Logout
                </button>
            </div>
        );
    return (
        <Navbar className="bg-body-tertiary justify-content-between" style={{width: 1000}}>
            <Button onClick={goToMainPage}>
                Компоненты
            </Button>
            {requestView}
            {displayForm}
            {requestHistory}
            {loginDisplay}
        </Navbar>
    );
}

export default NavBar;