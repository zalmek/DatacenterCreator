import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {setCurrentRequestId, useAuth} from "../store/data/slice.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {LoadingIndicator} from "./LoadingIndicator.tsx";

export function Creation() {
    const [components, setComponents] = useState()
    const [creation, setCreation] = useState()
    const [number_of_components, setNumber] = useState()
    const [refresh, changeRefresh] = useState(false)
    const [forbidden, setForbidden] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const auth = useAuth()

    if (params.creationid !== undefined) {
        useEffect(() => {
            axios.get("/api/datacentercreations/" + params.creationid).then(
                (result) => {
                    console.log(result)
                    setComponents(result.data.components)
                    setCreation(result.data.creation)
                    setNumber(result.data.number_of_components)
                    if (result.data.components == 0) {
                        dispatch(setCurrentRequestId(null))
                        navigate("/")
                    }
                }).catch(error => {
                setForbidden(true)
            })
        }, [refresh])
    }
    if (!auth?.is_staff && params.creationid == undefined)
        useEffect(() => {
            axios.get("/api/datacentercreations/latest").then(
                (result) => {
                    console.log(result)
                    setComponents(result.data.components)
                    setCreation(result.data.creation)
                    setNumber(result.data.number_of_components)
                    if (result.data.components == 0) {
                        dispatch(setCurrentRequestId(null))
                        navigate("/")
                    }
                }
            )
        }, [refresh]);

    if (components == undefined) {
        if (forbidden)
            return <div>ДОСТУП ЗАПРЕЩЁН</div>
        else
            return <LoadingIndicator></LoadingIndicator>
    }
    if (components != undefined && params.creationid == undefined) {
        navigate("/creation/" + creation.creationid)
    }

    const status = () => {
        if (creation.creationstatus == 0) {
            return (<h4>Статус: Черновик</h4>)
        }
        if (creation.creationstatus == 1) {
            return (<h4>Статус: Сформирована</h4>)
        }
        if (creation.creationstatus == 2) {
            return (<h4>Статус: Завершена</h4>)
        }
        if (creation.creationstatus == 3) {
            return (<h4>Статус: Отклонена</h4>)
        }
        if (creation.creationstatus == 4) {
            return (<h4>Статус: Завершена(удалённый статус)</h4>)
        }
        if (creation.creationstatus == 5) {
            return (<h4>Статус: Удалена</h4>)
        }
    }
    const buttons =
        auth?.is_staff ? (
            <div>
                <Button variant={"success"} disabled={creation.creationstatus != 1} onClick={
                    () => {
                        axios.post("/api/datacentercreations/" + creation.creationid + "/moderator_approvement").then(result => {
                            console.log(result)
                        })
                        changeRefresh((prevState) => !prevState)
                    }
                }>
                    Завершить
                </Button>
                <Button variant={"danger"} disabled={creation.creationstatus != 1} onClick={
                    () => {
                        axios.post("/api/datacentercreations/" + creation.creationid + "/moderator_rejection").then(result => {
                            console.log(result)
                        })
                        changeRefresh((prevState) => !prevState)
                    }
                }>
                    Отклонить
                </Button>
            </div>
        ) : (
            <>
                <Button disabled={creation.creationstatus != 0} onClick={
                    () => {
                        axios.post("/api/datacentercreations/" + creation.creationid + "/user_publish").then(result => {
                            console.log(result)
                        })
                        changeRefresh((prevState) => !prevState)
                    }
                }>
                    Сформировать
                </Button>
                <Button variant={"danger"} disabled={creation.creationstatus != 0} onClick={
                    () => {
                        axios.post("/api/datacentercreations/" + creation.creationid + "/user_deletion").then(result => {
                            console.log(result)
                        })
                        changeRefresh((prevState) => !prevState)
                    }
                }>
                    Удалить
                </Button>
            </>
        )

    return (
        <>
            <Col>
                <h1>Заявка №{creation.creationid}</h1>
                {status()}
                <Row xs={1} md={1} lg={2} xl={3} xxl={3} className="g-4">
                    {components.map((component, index) => <Col key={component.componentid}>
                        <Card>
                            <Card.Img variant="top" src={(`${component.componentimage}`)} width={"400"} height={"200"}/>
                            <Card.Body>
                                <Card.Title>{component.componentname}</Card.Title>
                                <Card.Text>
                                    Цена: {component.componentprice}р
                                </Card.Text>
                                <Card.Text>
                                    Количество: {number_of_components[index]}шт.
                                </Card.Text>
                                <Button variant="outline-info"
                                        onClick={() => navigate(`/components/${component.componentid.toString()}`)}>Подробнее</Button>{' '}
                                <Row>
                                    <Button variant="success" disabled={creation.creationstatus !== 0 || auth?.is_staff!==null}
                                            onClick={() => {
                                                axios.put("/api/creationcomponents/", {
                                                    "componentsnumber": (number_of_components[index] + 1),
                                                    "component_id": component.componentid,
                                                    "creation_id": creation.creationid
                                                }).then((result) => {
                                                    console.log(result)
                                                    // @ts-ignore
                                                    dispatch(setCurrentRequestId({
                                                        currentRequestId: result.data.creation
                                                    }))
                                                    changeRefresh((prevState) => !prevState)
                                                })
                                            }}>Добавить ещё 1</Button>{' '}
                                    <Button variant="warning" disabled={creation.creationstatus !== 0 || auth?.is_staff!==null}
                                            onClick={() => {
                                                axios.put("/api/creationcomponents/", {
                                                    "componentsnumber": (number_of_components[index] - 1),
                                                    "component_id": component.componentid,
                                                    "creation_id": creation.creationid
                                                }).then((result) => {
                                                    console.log(result)
                                                    // @ts-ignore
                                                    dispatch(setCurrentRequestId({
                                                        currentRequestId: result.data.creation
                                                    }))
                                                    changeRefresh((prevState) => !prevState)
                                                })
                                            }}>Уменьшить на 1</Button>{' '}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>)}
                </Row>
            </Col>
            {buttons}
        </>
    );
}