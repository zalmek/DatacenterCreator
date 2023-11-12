import './App.css'
import axios from "axios";
import SearchNavBar from "./Components/SearchNavBar.tsx";
import ComponentsGrid from "./Components/CardGroup.tsx";
import {SetStateAction, useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';


const BASE_URL = "http://localhost:8000/components/"

function App() {
    const params= useParams()
    const [Filter, setFilter] = useState(params.filterText)
    const [Components, setComponents] = useState([
        {
            "componentid": 6,
            "componentname": "Комплект направляющих Synology RKS-02",
            "componentprice": 4199,
            "componentimage": "72daa4a1199c44c41105cadc0fc6ab447b24a918f15c6e32cbf0134027a963e6.jpg",
            "componentdescription": "Комплект направляющих Synology RKS-02 поможет закрепить на стойке серверное оборудование, '\n                 'коммутаторы и прочие устройства. Изделия подходят для монтажной стойки/панели шириной от 45/48 см. '\n                 'Допускается глубина монтажа в пределах 61-89 см.\\n'\n                 'С помощью таких направляющих Synology RKS-02 вы удобно разместите все необходимое оборудование, '\n                 'обеспечив при этом быстрый доступ ко всем разъемам и кабелям. Прочные металлические стойки '\n                 'выдерживают большую нагрузку, не боятся быстрого износа и деформаций. Для фиксации используются '\n                 'круглые или квадратные отверстия с размерами 7.1 мм или 9.5x9.5 мм.",
            "componentstatus": 1
        },
        {
            "componentid": 1,
            "componentname": "Комплект направляющих Supermicro MCP-290-50404-0N",
            "componentprice": 14999,
            "componentimage": "08ea41bbc0ac10de581b7ea3edf070d5e292f151ee805ef6f2dd5a12addbaa43.jpg",
            "componentdescription": "Направляющие SuperMicro MCP-290-50404-0N для серверных систем SC504 / 505. ",
            "componentstatus": 1
        },
        {
            "componentid": 11,
            "componentname": "Шкаф коммутационный ЦМО ШРН-Э-9.500",
            "componentprice": 9499,
            "componentimage": "879dd5ff8210e347cffc72bdd14e492278c55e5d0eceac511fac9abbe75ebc78.jpg",
            "componentdescription": "Шкаф коммутационный ЦМО ШРН-Э-9.500 обеспечивает безопасные и комфортные условия эксплуатации \n                    сетевого оборудования и серверов. Высота модели в юнитах – 9. Работу оборудования можно \n                    контролировать визуально: данная возможность обеспечивается благодаря наличию дверцы со стеклом. \n                    Дверца имеет замок. Шкаф, закрытый на ключ, защищен от несанкционированного доступа. Ширина, \n                    высота и глубина рабочего пространства шкафа ЦМО ШРН-Э-9.500 равны 482, 396 и 456 мм \n                    соответственно. Габаритные размеры модели – 600x480x520 мм. Масса шкафа составляет 17.28 кг.",
            "componentstatus": 1
        }
        ])

    function changeFilter(event: { target: { value: SetStateAction<string>; }; }){
        console.log(event.target.value)
        setFilter(event.target.value)
    }
    const navigate = useNavigate()
    const goToInfoPage = (componentId: string) => {
        const path = `components/${componentId}`
        navigate(path)
    }

    const executeSearch = (filter: string) => {
        const path = `/${filter}`
        navigate(path)
    }

    useEffect(() =>{
        axios.get(BASE_URL).then((result) => setComponents(result.data));
    })


  return (
      <>
          <SearchNavBar filter={Filter} changeFilter={changeFilter} executeSearch={executeSearch}/>
          <ComponentsGrid filter={Filter} components={Components} goToInfoPage={goToInfoPage} />
      </>
  )
}

export default App
