import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
// @ts-ignore
import img1 from "./08ea41bbc0ac10de581b7ea3edf070d5e292f151ee805ef6f2dd5a12addbaa43.jpg";
// @ts-ignore
import img2 from "./72daa4a1199c44c41105cadc0fc6ab447b24a918f15c6e32cbf0134027a963e6.jpg";
// @ts-ignore
import img3 from "./879dd5ff8210e347cffc72bdd14e492278c55e5d0eceac511fac9abbe75ebc78.jpg";
// @ts-ignore
import * as url from "url";
import {useParams} from "react-router-dom";
import SearchForm from "./SearchForm.tsx";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setCurrentRequestId, useAuth} from "../store/data/slice.ts";
import {ComponentsTableView} from "./ComponentsTableView.tsx";

interface ComponentsGridProps {
    components: ({
        componentprice: number;
        componentdescription: string;
        componentid: number;
        componentname: string;
        componentimage: string;
        componentstatus: number
    })[],
    goToInfoPage: (componentId: string) => void,
    path: string[],
    Filter: any[],
    changeFilter: (event: { target: { value: React.SetStateAction<string> } }) => void,
    executeSearch: (filter: string) => void
}

function ComponentsGrid({components, goToInfoPage, Filter, changeFilter, executeSearch}: ComponentsGridProps) {
    const params = useParams()
    let filter = ""
    if (params.filterText != undefined) {
        filter = params.filterText
    }
    components = components.filter((component) => component.componentname.includes(filter))
    console.log(components)
    const dispatch = useDispatch()
    const auth = useAuth()
    if (auth?.is_staff) {
        {
           return <ComponentsTableView components={components}></ComponentsTableView>
        }
    } else
        return <Col>
            <SearchForm filter={[Filter[0], Filter[1]]} changeFilter={changeFilter}
                        executeSearch={executeSearch}/>
            <Row xs={1} md={1} lg={2} xl={3} xxl={3} className="g-4">
                {components.map((component) => <Col key={component.componentid}>
                    <Card>
                        <Card.Img variant="top" src={(`${component.componentimage}`)} width={"400"} height={"200"}/>
                        <Card.Body>
                            <Card.Title>{component.componentname}</Card.Title>
                            <Card.Text>
                                Цена: {component.componentprice}р
                            </Card.Text>
                            <Button variant="outline-info"
                                    onClick={() => goToInfoPage(component.componentid.toString())}>Подробнее</Button>{' '}
                            <Button variant="outline-success" onClick={() => {
                                axios.post("api/components/" + component.componentid + "/post_to_creation").then((result) => {
                                    console.log(result)
                                    // @ts-ignore
                                    dispatch(setCurrentRequestId({
                                        currentRequestId: result.data.creation
                                    }))
                                })
                            }}>Добавить в корзину</Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>)}
            </Row>
        </Col>;
}

export default ComponentsGrid;