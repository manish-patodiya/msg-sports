import React, { useState } from 'react'
import { Button, Card, CardBody, Switch, Typography } from '@material-tailwind/react'

const Carousal = () => {
    const [file, setFile] = useState();
    const handleFileChange = (e) => {
        e.target.files.length ? setFile(URL.createObjectURL(e.target.files[0])) : setFile("");
    }
    const img = ["https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80", "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"]

    return (
        <div className='flex flex-col gap-3'>
            <Typography variant='h4'>Upload banner image</Typography>
            <hr />
            <div className='flex gap-5'>
                <div className='w-1/2'>
                    <div className='h-80 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-3'>
                        <div className={`flex flex-col items-center justify-center ${file && "hidden"}`}>
                            <i className="fa-regular fa-images text-8xl"></i>
                            <Typography variant='h4'>Image preview</Typography>
                        </div>
                        <img src={file} alt="Image Preview" className={`rounded-md object-cover object-center max-w-full max-h-full ${file || "hidden"}`} accept="image/*" />
                    </div>
                    <input type="file" className='mt-1' accept="image/*" onChange={handleFileChange} />
                </div>
                <div className='w-1/2 flex flex-col items-center justify-center '>
                    <Button className='bg-rose-800 w-3/4 text-md'><i className="fa-regular fa-image"></i> Upload Image</Button>
                </div>
            </div>
            <hr className='border-t-2 border-gray-500' />
            <Typography variant='h4'>Manage banner images</Typography>
            <hr />
            <div className='w-full h-screen overflow-y-auto flex gap-3 flex-wrap'>
                {
                    img.map((i, key) => {
                        return (
                            <Card className='w-[32%] rounded h-64' key={key}>
                                <CardBody className='p-0'>
                                    <div className='m-0 rounded-none w-full h-52 flex justify-center items-center p-2 border-b-2'>
                                        <img src={i} className="max-w-full rounded-md max-h-full object-cover" alt="" />
                                    </div>
                                    <div className='p-2 flex justify-between'>
                                        <Switch className='checked:bg-rose-800 peer-checked:border-r-rose-800 peer-checked:before:bg-rose-800' label="Show" ripple={false} />
                                        <Button size='sm' className='bg-rose-800 text-xs'> Remove</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default Carousal