import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function SearchNavBar({path, filter, executeSearch, changeFilter}) {
    if (filter == undefined){
        return (
            <Navbar className="bg-body-tertiary justify-content-between">
                <Button>
                    Авторизация
                </Button>
                <Button>
                    Регистрация
                </Button>
                <Button>
                    Заказ
                </Button>
                <h3>
                    <a href={"/"}>Главная</a> /
                    {path.map((url: string) => (
                        <> {url}
                        </>
                    ))}
                </h3>
            </Navbar>
            )
    }
    if (filter[0] == undefined) {
        filter[1]("")
    }
    const navigate = useNavigate()
    const goToAuthPage = () => {
        const newpath = `auth`
        navigate(newpath)
    }
    const goToRegistrationPage = () => {
        const newpath = `register`
        navigate(newpath)
    }
    const goToCreationPage = () => {
        const newpath = `creation`
        navigate(newpath)
    }
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Form className="d-flex">
                <Form.Control
                    value={filter[0]}
                    type="search"
                    placeholder="Поиск"
                    className="me-2"
                    aria-label="Поиск"
                    onChange={changeFilter}
                />
                <Button variant="outline-success" onClick={() => executeSearch(filter[0])}>Поиск</Button>
            </Form>
            <Button onClick={goToAuthPage}>
                Авторизация
            </Button>
            <Button onClick={goToRegistrationPage}>
                Регистрация
            </Button>
            <Button onClick={goToCreationPage}>
                Заказ
            </Button>
            <h3>
                {path.map((url: string) => (
                    <a href={"/"}>{url}</a>
                ))}
            </h3>
        </Navbar>
    );
}

export default SearchNavBar;