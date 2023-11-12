import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function FormExample({ filter, executeSearch, changeFilter }) {
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Form className="d-flex">
                <Form.Control
                    value={filter}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={changeFilter}
                />
                <Button variant="outline-success" onClick={() => executeSearch(filter)}>Search</Button>
            </Form>
        </Navbar>
    );
}

export default FormExample;