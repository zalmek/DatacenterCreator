import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";
import {setAuth} from "../store/data/slice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const BASE_URL = "api/user/"

export function Registration() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authError =
        error == true ? (
            <h4 color={"#F44E3B"}>
                Недопустимый логин или пароль
            </h4>
        ) : (
            <></>
        )
    return (
        <>
            <Form className="d-flex">
                <Form.Control
                    value={login}
                    type="input"
                    placeholder="Email"
                    className="me-2"
                    aria-label="Email"
                    onChange={(event) => setLogin(event.target.value)}
                />
            </Form>
            <Form className="d-flex">
                <Form.Control
                    value={password}
                    type="input"
                    placeholder="Пароль"
                    className="me-2"
                    aria-label="Пароль"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Form>
            <button className={"button-68"} onClick={() => axios.post(BASE_URL, {
                email: login,
                password: password,
            }).then(result => {
                console.log(result)
                dispatch(setAuth({
                        email: login,
                        is_staff: result.data.is_staff,
                    }
                ))
                navigate("/")
            }).catch(() => {
                setError(true)
            })}>Зарегистрироваться</button>
            {authError}
        </>
    );
}