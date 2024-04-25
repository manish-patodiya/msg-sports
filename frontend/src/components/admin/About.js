import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

const About = () => {
    const TABLE_HEAD = ["House", "Backgroud", "Description", "Action"];
    const TABLE_BODY = [
        ["red", "red", "white", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, possimus!", "action"]
    ]

    const initialHouseValues = { house: "", background: "#000000", image: "", description: "" }
    const [houseValues, setHouseValues] = useState(initialHouseValues);
    const [preview, setPreview] = useState();

    const showPreview = (e) => {
        e.target.files.length ? setPreview(URL.createObjectURL(e.target.files[0])) : setPreview("");
    }

    const handleAddHouseChanges = (e) => {
        console.log((e.target.value))
        setHouseValues({ ...houseValues, [e.target.name]: e.target.value });
    }

    const handleAddHouse = (e) => {

    }
    return (
        <div className='flex flex-col gap-3'>
            <Typography variant='h4'>Content</Typography>
            <form className='flex flex-col gap-5'>
                <Input label="Title" required></Input>
                <Textarea label="Description" required></Textarea>
            </form>
            <hr />
            <Typography variant='h4'>Houses</Typography>
            <div className='flex gap-3'>
                <div className='w-3/5 h-screen border'>
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

                        </tbody>
                    </table>
                </div>
                <div className='w-2/5'>
                    <form className='flex flex-col gap-5 w-full' onSubmit={handleAddHouse}>
                        <div className='h-56 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-2'>
                            <div className={`flex flex-col items-center justify-center ${preview && "hidden"}`}>
                                <i className="fa-regular fa-images text-4xl"></i>
                                <Typography variant='h4'>Image preview</Typography>
                            </div>
                            <img src={preview} alt="Image Preview" className={`rounded-md object-cover object-center max-w-full max-h-full ${preview || "hidden"}`} accept="image/*" />
                        </div>
                        <input name="image" type="file" className='mt-1' value={houseValues.image} accept="image/*" onChange={(e) => {
                            showPreview(e);
                            handleAddHouseChanges(e);
                        }} />
                        <Input name="house" label='House' type="text" onChange={handleAddHouseChanges} value={houseValues.house}></Input>
                        <Input name="background" label='Backgroud Color' type="color" value={houseValues.background} onChange={handleAddHouseChanges}></Input>
                        <Textarea name="description" label="Description" onChange={handleAddHouseChanges} value={houseValues.description}></Textarea>
                        <Button className="bg-rose-800" onChange={handleAddHouseChanges}>Save</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default About