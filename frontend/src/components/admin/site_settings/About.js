import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL } from "../../../constants/constant"
import axios from 'axios';
import { toast } from 'react-toastify'

const About = ({ data }) => {
    const [aboutData, setAboutData] = useState({ title: "", description: "" })
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        Object.keys(data).length && setAboutData({ title: data.title, description: data.description })
    }, [data])

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
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                console.log(err);
                setIsSubmitting(false);
            })
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
        </div>
    )
}

export default About