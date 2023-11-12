import 'bootstrap/dist/css/bootstrap.css';
import {CardText, CardTitle, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const BASE_URL = "http://localhost:8000/components/"

function RealComponent() {
    const params= useParams()
    const [component, setComponent] = useState({
        "componentid": 6,
        "componentname": "Комплект направляющих Synology RKS-02",
        "componentprice": 4199,
        "componentimage": "72daa4a1199c44c41105cadc0fc6ab447b24a918f15c6e32cbf0134027a963e6.jpg",
        "componentdescription": "Комплект направляющих Synology RKS-02 поможет закрепить на стойке серверное оборудование, '\n                 'коммутаторы и прочие устройства. Изделия подходят для монтажной стойки/панели шириной от 45/48 см. '\n                 'Допускается глубина монтажа в пределах 61-89 см.\\n'\n                 'С помощью таких направляющих Synology RKS-02 вы удобно разместите все необходимое оборудование, '\n                 'обеспечив при этом быстрый доступ ко всем разъемам и кабелям. Прочные металлические стойки '\n                 'выдерживают большую нагрузку, не боятся быстрого износа и деформаций. Для фиксации используются '\n                 'круглые или квадратные отверстия с размерами 7.1 мм или 9.5x9.5 мм.",
        "componentstatus": 1
    })
    useEffect(() =>{
        axios.get(BASE_URL+params.componentid).then((result) => setComponent(result.data));
    })
    return (
        <Col>
            <Image src={(`src/assets/${component.componentimage}`)} >
            </Image>
            <CardTitle>
                {component.componentname}
            </CardTitle>
            <CardText>
                {component.componentdescription}
            </CardText>
            <CardText>
                {component.componentprice}р
            </CardText>
        </Col>
    );
}

export default RealComponent;