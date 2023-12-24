import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams} from "react-router-dom";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function SearchNavBar({path, filter, executeSearch, changeFilter}) {
    const params = useParams()
    if (params.componentid!=undefined){
        path = [...path, [params.componentid]]
    }
    if (filter == undefined){
        return (
            <Navbar className="bg-body-tertiary justify-content-between">
            </Navbar>
            )
    }
    if (filter[0] == undefined) {
        filter[1]("")
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
        </Navbar>
    );
}

export default SearchNavBar;