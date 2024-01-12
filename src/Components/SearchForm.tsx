import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {setComponentNameForSearch, useComponentNameForSearch} from "../store/data/slice.ts";

function SearchForm({filter, executeSearch, changeFilter}) {
    const dispatch = useDispatch()
    const query = useComponentNameForSearch()
    if (filter[0]==undefined || filter[0] == ""){
        filter[0] = query
        if (filter[0]==undefined || filter[0] == "")
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
            <Button variant="outline-success" onClick={() => {
                executeSearch(filter[0])
                dispatch(setComponentNameForSearch(filter[0]))
            }
            }>Поиск</Button>
        </Form>
    )
}

export default SearchForm