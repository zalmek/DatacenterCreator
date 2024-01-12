import 'bootstrap/dist/css/bootstrap.css';
import {CardText, CardTitle, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import  {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
// @ts-ignore
import img1 from "assets/08ea41bbc0ac10de581b7ea3edf070d5e292f151ee805ef6f2dd5a12addbaa43.jpg";
// @ts-ignore
import img2 from "assets/72daa4a1199c44c41105cadc0fc6ab447b24a918f15c6e32cbf0134027a963e6.jpg";
// @ts-ignore
import img3 from "assets/879dd5ff8210e347cffc72bdd14e492278c55e5d0eceac511fac9abbe75ebc78.jpg";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs.tsx";
// @ts-ignore
const BASE_URL = "/api/components/"

function RealComponent() {
    const params= useParams()
    const [component, setComponent] = useState({
        "componentid": 6,
        "componentname": "Комплект направляющих Synology RKS-02",
        "componentprice": 4199,
        "componentimage": "/assets/72daa4a1199c44c41105cadc0fc6ab447b24a918f15c6e32cbf0134027a963e6.jpg",
        "componentdescription": "Комплект направляющих Synology RKS-02 поможет закрепить на стойке серверное оборудование, '\n                 'коммутаторы и прочие устройства. Изделия подходят для монтажной стойки/панели шириной от 45/48 см. '\n                 'Допускается глубина монтажа в пределах 61-89 см.\\n'\n                 'С помощью таких направляющих Synology RKS-02 вы удобно разместите все необходимое оборудование, '\n                 'обеспечив при этом быстрый доступ ко всем разъемам и кабелям. Прочные металлические стойки '\n                 'выдерживают большую нагрузку, не боятся быстрого износа и деформаций. Для фиксации используются '\n                 'круглые или квадратные отверстия с размерами 7.1 мм или 9.5x9.5 мм.",
        "componentstatus": 1
    })
    useEffect(() =>{
        axios.get(BASE_URL+params.componentid).then((result) => setComponent(result.data));
    },[params.componentid])
    return (
        <Col>
            <Breadcrumbs></Breadcrumbs>
            <Image src={(`${component.componentimage}`)} width={400} height={400}>
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