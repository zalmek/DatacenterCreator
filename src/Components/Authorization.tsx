import {useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {setAuth, setCurrentRequestId} from "../store/data/slice.ts";
import {Link, useNavigate} from "react-router-dom";

const BASE_URL = "api/login"

export function Authorization() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError =
        error == true ? (
            <h4 color={"#F44E3B"}>
                Неправильный логин или пароль
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
            <Button variant="outline-success" onClick={() => axios.post(BASE_URL, {
                email: login,
                password: password,
            }).then(result => {
                console.log(result)
                if (result.data !== "{'status': 'error', 'error': 'login failed'}") {
                    dispatch(setAuth({
                            email: login,
                            password: password,
                            is_staff: result.data.is_staff,
                        }
                    ))
                    navigate("/")
                    axios.get("api/components/").then((result) => {
                            console.log(result)
                            if (result.data.creation !== null) {
                                // @ts-ignore
                                dispatch(setCurrentRequestId({
                                    currentRequestId: result.data.creation
                                }))
                            }
                        }
                    )
                }
                else{
                    setError(true)
                }
            }).catch(() => {
                setError(true)
            })}>Авторизоваться</Button>
            {authError}
        </>
    );
}