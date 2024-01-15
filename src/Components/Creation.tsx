import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {setCurrentRequestId, useAuth} from "../store/data/slice.ts";
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

    const userChangeButtons =
        creation.creationstatus !== 0 || auth?.is_staff == true ? (
            <></>
        ): (
            <>
                <button className="button-68" style={{}}
                        disabled={creation.creationstatus !== 0 || auth?.is_staff == true}
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
                        }}>Добавить ещё 1
                </button>
                {' '}
                <button className="button-68" style={{backgroundColor: "red"}}
                        disabled={creation.creationstatus !== 0 || auth?.is_staff == true}
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
                        }}>Уменьшить на 1
                </button>
                {' '}
            </>
        )

    const userStatusButtons =
        creation.creationstatus == 0 ? (
            <>
                <button className="button-68" style={{backgroundColor: "blue"}} disabled={creation.creationstatus != 0}
                        onClick={
                            () => {
                                axios.post("/api/datacentercreations/" + creation.creationid + "/user", {"status": 1}).then(result => {
                                    console.log(result)
                                })
                                changeRefresh((prevState) => !prevState)
                                navigate("/creationHistory/" + creation.creationid)
                            }
                        }>
                    Сформировать
                </button>
                <button className="button-68" style={{backgroundColor: "red"}} disabled={creation.creationstatus != 0}
                        onClick={
                            () => {
                                axios.post("/api/datacentercreations/" + creation.creationid + "/user", {"status": 5}).then(result => {
                                    console.log(result)
                                })
                                changeRefresh((prevState) => !prevState)
                                navigate("/creationHistory/" + creation.creationid)
                            }
                        }>
                    Удалить
                </button>
            </>
        ) : (
            <></>
        )


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
                <button className="button-68" disabled={creation.creationstatus != 1} onClick={
                    () => {
                        axios.post("/api/datacentercreations/" + creation.creationid + "/moderator", {"status": 2}).then(result => {
                            console.log(result)
                        })
                        changeRefresh((prevState) => !prevState)
                    }
                }>
                    Завершить
                </button>
                <button className="button-68" style={{backgroundColor: "red"}} disabled={creation.creationstatus != 1}
                        onClick={
                            () => {
                                axios.post("/api/datacentercreations/" + creation.creationid + "/moderator", {"status": 3}).then(result => {
                                    console.log(result)
                                })
                                changeRefresh((prevState) => !prevState)
                            }
                        }>
                    Отклонить
                </button>
            </div>
        ) : (
            <>
            {userStatusButtons}
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
                                <button className="button-68" style={{backgroundColor: "blue"}}
                                        onClick={() => navigate(`/components/${component.componentid.toString()}`)}>Подробнее
                                </button>
                                {' '}
                                <Row>
                                    {userChangeButtons}
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