import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchForm({filter, executeSearch, changeFilter}) {
    if (filter[0]==undefined){
        filter[0] = ""
    }
    return (
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
    )
}

export default SearchForm