import { Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

const HomeSettings = () => {
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className='flex gap-5'>
            <div className='border h-screen w-full'></div>
            <div className='h-screen w-full flex flex-col items-center'>
                <div className='border h-80 w-full rounded-md flex items-center justify-center text-gray-600'>
                    <div className={`flex flex-col items-center justify-center ${file && "hidden"}`}>
                        <i class="fa-regular fa-images text-8xl"></i>
                        <Typography variant='h4' color='grap'>Image preview</Typography>
                    </div>
                    <img src={file} alt="Image Preview" className={file ? "" : "hidden"} />
                </div>
                <input type="file" onChange={handleFileChange} />
            </div>
        </div>
    )
}

export default HomeSettings