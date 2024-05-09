import { Avatar, Button, Input, Textarea, Tooltip, Typography } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL, BASE_URL } from "../../constants/constant"
import axios from 'axios';
import { toast } from 'react-toastify'
import MakeCaptainDiaglog from './MakeCaptainDiaglog';

const Houses = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const TABLE_HEAD = ["House details", "Action"];
    const COLUMN_WIDTH = ["75%", "25%"];
    const [dialogHouseData, setDialogHouseData] = useState({});
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const fileRef = useRef();
    const [houses, setHouses] = useState([]);
    const initialValues = { house_name: "", house_description: "", background: "#000000" }
    const [houseValues, setHouseValues] = useState(initialValues);

    useEffect(() => {
        axios.get(API_BASE_URL + "houses").then(res => {
            if (res.data.status) {
                setHouses(res.data.response.houses);
            } else {
                toast.error(res.data.message);
            }
        })
    }, [])

    const showPreview = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        } else {
            setPreview("");
            setFile("");
        }
    }

    const handleHouseValues = (e) => {
        setHouseValues({ ...houseValues, [e.target.name]: e.target.value });
    }

    const addHouse = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Plase select a image")
            return;
        }
        const formData = new FormData()
        formData.append('house_image', file);
        formData.append('name', houseValues.house_name);
        formData.append('background', houseValues.background);
        formData.append('description', houseValues.house_description);
        setIsSubmitting(true);
        axios.post(API_BASE_URL + "houses/add", formData, {
        }).then((res) => {
            setIsSubmitting(false);
            if (res.data.status) {
                toast.success(res.data.message);
                houses.push({ ...houseValues, image: res.data.response.image, id: res.data.response.result.insertId });
                setHouses(houses);
                setPreview("");
                setFile("");
                setHouseValues(initialValues);
                fileRef.current.value = null
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => {
            console.log(err);
            setIsSubmitting(false);
        })
    }

    const deleteHouse = (house_id) => {
        let con = window.confirm("Are you sure?")
        if (con) {
            axios.delete(API_BASE_URL + "houses/" + house_id).then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message)
                    setHouses(houses.filter((ele) => {
                        return ele.id != house_id;
                    }));
                } else {
                    toast.error(res.data.message)
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }

    const openDialogForMakeCaptain = (house) => {
        setDialogHouseData(house);
        setOpen(!open);
    }
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className='flex gap-3'>
            <MakeCaptainDiaglog open={open} handler={handleOpen} house_data={dialogHouseData} />
            <div className='w-2/3 h-screen flex flex-col gap-3 bg-orange'>
                <table className='table-auto w-full text-left'>
                    <thead className='table' style={{ width: "calc(100% - 16px)" }}>
                        <tr>
                            {TABLE_HEAD.map((head, key) => (
                                <th width={COLUMN_WIDTH[key]} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4" key={key}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='overflow-y-scroll h-screen block w-full'>
                        {
                            houses.map((house, index) => {
                                const isLast = index == houses.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 text-sm";
                                return (
                                    <tr key={index} className='w-full table'>
                                        <td width={COLUMN_WIDTH[0]} className={classes + " text-white"} style={{ backgroundColor: house.background }}>
                                            <div className='flex gap-1 items-center'>
                                                <Avatar src={BASE_URL + 'houses/' + house.image} variant='square' />
                                                <div className='flex flex-col'>
                                                    {house.house_name}
                                                    <Typography className='leading-snug max-h-10 overflow-hidden text-ellipsis' variant='small'>
                                                        {house.house_description}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td width={COLUMN_WIDTH[1]} className={classes} >
                                            <Button size='sm' className='me-1' color="red" variant="outlined" onClick={(e) => { deleteHouse(house.house_id) }}><i className='fas fa-trash'></i></Button>
                                            <Button size='sm' className='' color="blue" variant="outlined" onClick={(e) => { openDialogForMakeCaptain(house) }}><i className="fa-solid fa-user-plus"></i></Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='w-1/3'>
                <form className='flex flex-col gap-5 w-full' onSubmit={addHouse}>
                    <div className='h-56 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-2'>
                        <div className={`flex flex-col items-center justify-center ${preview && "hidden"}`}>
                            <i className="fa-regular fa-images text-4xl"></i>
                            <Typography variant='h4'>Image preview</Typography>
                        </div>
                        <img src={preview} alt="Image Preview" className={`rounded-md object-cover object-center max-w-full max-h-full ${preview || "hidden"}`} accept="image/*" />
                    </div>
                    <input name="image" type="file" ref={fileRef} className='mt-1' accept="image/*" onChange={(e) => {
                        showPreview(e);
                    }} />
                    <Input required name="house_name" label='House' type="text" onChange={handleHouseValues} value={houseValues.house_name}></Input>
                    <Input name="background" label='Backgroud Color' type="color" value={houseValues.background ? houseValues.background : "#000000"} onChange={handleHouseValues}></Input>
                    <Textarea required name="house_description" label="Description" onChange={handleHouseValues} value={houseValues.house_description}></Textarea>
                    <Button type='submit' className="bg-rose-800" disabled={isSubmitting} >{isSubmitting ? <i className='fas fa-spinner animate-spin'></i> : "Save"}</Button>
                </form>
            </div>
        </div>
    )
}

export default Houses