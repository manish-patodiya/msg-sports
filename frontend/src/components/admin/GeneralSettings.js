import { Input, Textarea, Typography, Button } from '@material-tailwind/react'
import React from 'react'

const GeneralSettings = () => {
    return (
        <form className='flex flex-col gap-3'>
            <Typography variant='h4'>General Information</Typography>
            <hr />
            <Input label="Site Name" required />
            <Input label="Contact No." required />
            <Input label="Email" required />
            <Textarea label="Address" required ></Textarea>

            <hr className='border-t-2 border-gray-500' />

            <Typography variant='h4'>Social links</Typography>
            <hr />
            <Input label="Website" />
            <Input label="Twitter" />
            <Input label="Facebook" />
            <Input label="Instagram" />

            <div className='text-right'>
                <Button className='bg-rose-800'>Save</Button>
            </div>
        </form>
    )
}

export default GeneralSettings