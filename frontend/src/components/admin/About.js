import { Button, Card, CardBody, Input, Textarea, Typography } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL, BASE_URL } from "../../constants/constant"
import axios from 'axios';
import { toast } from 'react-toastify'

const About = ({ data }) => {
    const TABLE_HEAD = ["Image", "House", "Description", "Action"];
    const [aboutData, setAboutData] = useState({ title: "", description: "" })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const fileRef = useRef();
    const [houses, setHouses] = useState([]);
    const initialValues = { name: "", description: "", background: "#000000" }
    const [houseValues, setHouseValues] = useState(initialValues);
    const [doUpdate, setDoUpdate] = useState(false);

    useEffect(() => {
        Object.keys(data).length && setAboutData({ title: data.title, description: data.description })
        data.houses && setHouses(data.houses);
    }, [data])

    useEffect(() => {
        if (doUpdate) {
            updateHouses();
            setDoUpdate(false);
        }
    }, [doUpdate]);

    const handleAboutData = (e) => {
        setAboutData({ ...aboutData, [e.target.name]: e.target.value });
    }

    const saveAboutInfo = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios.post(API_BASE_URL + 'site_settings/about/update', aboutData, {}).
            then((res) => {
                setIsSubmitting(false);
                if (res.data.status) {
                    toast.success(res.data.message, {
                        position: 'top-right'
                    })
                } else {
                    toast.error(res.data.message, {
                        position: 'top-right'
                    })
                }
            }).catch((err) => {
                console.log(err);
                setIsSubmitting(false);
            })
    }

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
        console.log(e)
        setHouseValues({ ...houseValues, [e.target.name]: e.target.value });
    }

    const addHouse = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Plase select a image", {
                position: "top-right"
            })
            return;
        }
        const formData = new FormData()
        formData.append('house_image', file);
        formData.append('name', houseValues.name);
        formData.append('background', houseValues.background);
        formData.append('description', houseValues.description);
        setIsSubmitting(true);
        axios.post(API_BASE_URL + "site_settings/house/add", formData, {
        }).then((res) => {
            setIsSubmitting(false);
            if (res.data.status) {
                houses.push({ ...houseValues, image: res.data.response.image });
                setHouses(houses);
                setPreview("");
                setFile("");
                setHouseValues(initialValues);
                fileRef.current.value = null
                toast.success(res.data.message, {
                    position: "top-right"
                });
            } else {
                toast.error(res.data.message, {
                    position: "top-right"
                })
            }
        }).catch(err => {
            console.log(err);
            setIsSubmitting(false);
        })
    }

    const deleteHouse = (index) => {
        let con = window.confirm("Are you sure?")
        if (con) {
            setHouses(houses.filter((ele, i) => {
                return i != index;
            }));
            setDoUpdate(true);
        }
    }

    const updateHouses = () => {
        axios.post(API_BASE_URL + "site_settings/house/update", { houses }, {
        }).then((res) => {
            if (res.data.status) {
                toast.success(res.data.message, {
                    position: "top-right"
                })
            } else {
                toast.error(res.data.message, {
                    position: "top-right"
                })
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className='flex flex-col gap-3'>
            <Typography variant='h4'>Content</Typography>
            <form className='flex flex-col gap-5' onSubmit={saveAboutInfo}>
                <Input name='title' label="Title" required value={aboutData.title} onChange={handleAboutData}></Input>
                <Textarea name='description' label="Description" required value={aboutData.description} onChange={handleAboutData} />
                <Button type='submit' className="bg-rose-800" disabled={isSubmitting}>{isSubmitting ? <i className='fas fa-spinner animate-spin'></i> : "Save"}</Button>
            </form>
            <hr />
            <Typography variant='h4'>Houses</Typography>
            <div className='flex gap-3'>
                <div className='w-2/3 h-screen flex flex-col gap-3 overflow-y-auto bg-orange'>
                    <table className='table-auto w-full text-left'>
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, key) => (
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4" key={key}>
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
                        <tbody>
                            {
                                houses.map((house, index) => {
                                    const isLast = index == houses.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td width={"20%"} className={classes}>
                                                <img src={BASE_URL + 'houses/' + house.image} alt="House image" className="object-cover w-16 h-16" />
                                            </td>
                                            <td width={"20%"} className={classes + " text-white"} style={{ backgroundColor: house.background }}>{house.name}</td>
                                            <td width={"50%"} className={classes}>
                                                <Typography className='leading-snug max-h-16 overflow-hidden text-ellipsis'>
                                                    {house.description}
                                                </Typography>
                                            </td>
                                            <td width={"10%"} className={classes} >
                                                <Button size='sm' color="red" variant="outlined" onClick={(e) => { deleteHouse(index) }}><i className='fas fa-trash'></i></Button>
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
                        <Input required name="name" label='House' type="text" onChange={handleHouseValues} value={houseValues.name}></Input>
                        <Input name="background" label='Backgroud Color' type="color" value={houseValues.background ? houseValues.background : "#000000"} onChange={handleHouseValues}></Input>
                        <Textarea required name="description" label="Description" onChange={handleHouseValues} value={houseValues.description}></Textarea>
                        <Button type='submit' className="bg-rose-800" disabled={isSubmitting} >{isSubmitting ? <i className='fas fa-spinner animate-spin'></i> : "Save"}</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default About