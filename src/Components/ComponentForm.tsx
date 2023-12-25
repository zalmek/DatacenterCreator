import React, {useEffect, useState} from 'react';
import {Container, FormCheck, FormText, Image} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useAuth} from "../store/data/slice.ts";
import axios from "axios";
import {useParams} from "react-router-dom";
export function ComponentForm() {
    const [file, setFile] = useState<string>();
    const [imagePreview, setImagePreview] = useState<any>("");
    const [base64, setBase64] = useState<string>();
    const [name, setName] = useState<string>();
    const [size, setSize] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [component, setComponent] = useState()
    const [componentname, setComponentname] = useState()
    const [componentprice, setComponentprice] = useState()
    const [componentdescription, setComponentdescription] = useState()
    const [componentstatus, setComponentstatus] = useState()
    const [componentimage, setComponentimage] = useState()

    const params = useParams()

    if (params.componentid != undefined){
        useEffect(() => {
            axios.get("/api/components/"+params.componentid).then(
                (result) => {
                    console.log(result)
                    setComponent(result.data)
                    setComponentname(result.data.componentname)
                    setComponentimage(result.data.componentimage)
                    setComponentdescription(result.data.componentdescription)
                    setComponentprice(result.data.componentprice)
                    setComponentstatus(result.data.componentstatus)
                }
            )
        }, []);
    }

    function numberToStatus(status: number) {
        if (status==1){
            return true
        }
        else
            return false
    }

    function statusToNumber(status: boolean) {
        if (status==true){
            return 1
        }
        else
            return 0
    }


    const onChange = (e: any) => {
        console.log("file", e.target.files[0]);
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(file)
        }
    }

    const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        setBase64(btoa(binaryString))
    }

    const onFileSubmit = (e: any) => {
        setIsLoading(true);
        e.preventDefault()
        console.log("bine", base64)
        let payload = {image: base64}
        console.log("payload", payload)

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        if (params.componentid == undefined) {
            axios.post("/api/components/",
                {
                    componentname: componentname,
                    componentprice: componentprice,
                    componentdescription: componentdescription,
                    componentimage: base64,
                    componentstatus: componentstatus
                }).then((result) => {
                console.log(result)
            })
        }
        else {
            axios.put("/api/components/"+params.componentid,
                {
                    componentname: componentname,
                    componentprice: componentprice,
                    componentdescription: componentdescription,
                    componentimage: base64,
                    componentstatus: componentstatus
                }).then((result) => {
                console.log(result)
            })
        }

    }

    const photoUpload = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        console.log("reader", reader)
        console.log("file", file)
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setFile(file)
                setSize(file.size);
                setName(file.name)
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const remove = () => {
        setFile("")
        setImagePreview("")
        setBase64("")
        setName("")
        setSize("")
    }
    const auth = useAuth()

    if (!auth?.is_staff){
        return <h1>ДОСТУП ЗАПРЕЩЁН! ПОПЫТКА ДОСТУПА К СЛУЖЕБНОМУ РЕСУРСУ</h1>
    }
    return (
        <>
            <div className="mb-3">
                <input value={componentname} type="text" className="form-control" placeholder="Название компонента"
                       onChange={(event) => setComponentname(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input value={componentprice} type="text" className="form-control" placeholder="Стоимость"
                       onChange={(event) => setComponentprice(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input value={componentdescription} type="textarea" className="form-control" placeholder="Описание"
                       onChange={(event) => setComponentdescription(event.target.value)}/>
            </div>
            <Container>
                <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
                    <Card
                        width={imagePreview === "" ? 310 : 310}
                        height={imagePreview === "" ? 400 : 480}>
                        <input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload}
                               src={imagePreview}/>

                        {imagePreview !== "" &&
                            <>
                                <section>
                                    <label>Nome</label>
                                    <span>{name}</span>

                                    <label>Tamanho</label>
                                    <span>{size}</span>
                                </section>

                            </>
                        }
                    </Card>
                    <Button className={"btn-warning"} type="button" onClick={remove}>Очистить поля</Button>
                    <Button className={"btn-success"} type="submit"> Сохранить
                    </Button>
                </form>
                Активный
                <FormCheck checked={numberToStatus(componentstatus)} onClick={(event) => setComponentstatus(statusToNumber(event.target.value))}></FormCheck>
                <Image src={componentimage}></Image>
            </Container>
        </>
    )
}