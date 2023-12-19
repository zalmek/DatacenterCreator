import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";

const BASE_URL = "api/user/"

export function Registration() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
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
            }).then(r => console.log(r))}>Авторизоваться</Button>
        </>
    );
}