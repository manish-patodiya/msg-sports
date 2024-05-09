import { Input, Textarea, Typography, Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../../constants/constant';
import { toast, ToastContainer } from 'react-toastify';

const GeneralSettings = ({ data }) => {
    const initValues = { name: "", email: "", contact: "", address: "", website: "", twitter: "", instagram: "", facebook: "" }
    const [generalInfo, setGeneralInfo] = useState(initValues);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        Object.keys(data).length && setGeneralInfo(data);
    }, [data])

    const handleChanges = (e) => {
        setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios({
            url: API_BASE_URL + "site_settings/general_settings/update",
            method: "POST",
            data: generalInfo
        }).then((res) => {
            setIsSubmitting(false);
            if (res.data.status) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            setIsSubmitting(false);
            console.log(err);
        })
    }

    let i = 0;
    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <Typography variant='h4'>General Information</Typography>
            <hr />
            <Input name="name" label="Site Name" required onChange={handleChanges} value={generalInfo.name} />
            <Input name="contact" label="Contact No." required onChange={handleChanges} value={generalInfo.contact} />
            <Input name="email" label="Email" required onChange={handleChanges} value={generalInfo.email} />
            <Textarea name="address" label="Address" required onChange={handleChanges} value={generalInfo.address} />

            <hr className='border-t-2 border-gray-500' />

            <Typography variant='h4'>Social links</Typography>
            <hr />
            <Input name="website" label="Website" onChange={handleChanges} value={generalInfo.website} />
            <Input name="twitter" label="Twitter" onChange={handleChanges} value={generalInfo.twitter} />
            <Input name="facebook" label="Facebook" onChange={handleChanges} value={generalInfo.facebook} />
            <Input name="instagram" label="Instagram" onChange={handleChanges} value={generalInfo.instagram} />

            <div className='text-right'>
                <Button type='submit' disabled={isSubmitting} className='bg-rose-800'>{isSubmitting ? <i className='fas fa-spinner animate-spin'></i> : "Save"}</Button>
            </div>
        </form>
    )
}

export default GeneralSettings