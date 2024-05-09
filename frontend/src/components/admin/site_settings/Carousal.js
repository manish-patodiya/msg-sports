import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Switch, Typography } from '@material-tailwind/react'
import { API_BASE_URL, BASE_URL } from '../../../constants/constant';
import axios from 'axios';
import { toast } from 'react-toastify';

const Carousal = ({ data }) => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        data.length && setBanners(data);
    }, [data]);

    const [doUpdate, setDoUpdate] = useState(false);
    useEffect(() => {
        if (doUpdate) {
            updateBanners();
            setDoUpdate(false);
        }
    }, [doUpdate]);

    const [preview, setPreview] = useState();
    const showPreview = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        } else {
            setPreview("");
            setFile("");
        }
    }

    const [file, setFile] = useState();
    const fileRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const uploadBannerImage = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Plase select a image")
            return;
        }
        const formData = new FormData()
        formData.append('banner_image', file);
        setIsSubmitting(true);
        axios.post(API_BASE_URL + "site_settings/banner/add", formData, {
        }).then((res) => {
            setIsSubmitting(false);
            if (res.data.status) {
                banners.push({ image: res.data.response.image, show: false });
                setBanners(banners);
                setPreview("");
                setFile("");
                fileRef.current.value = null
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => {
            console.log(err);
            setIsSubmitting(false);
        })
    }

    const updateBannerStatus = (e, index) => {
        banners[index].show = e.target.checked;
        setBanners(banners);
        updateBanners();
    }

    const deleteBanner = (index) => {
        let con = window.confirm("Are you sure?")
        if (con) {
            setBanners(banners.filter((ele, i) => {
                return i != index;
            }));
            setDoUpdate(true);
        }
    }

    const updateBanners = () => {
        axios.post(API_BASE_URL + "site_settings/banner/update", { banners }, {
        }).then((res) => {
            if (res.data.status) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className='flex flex-col gap-3'>
            <Typography variant='h4'>Upload banner image</Typography>
            <hr />
            <form className='flex gap-5' onSubmit={uploadBannerImage}>
                <div className='w-1/2'>
                    <div className='h-80 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-3'>
                        <div className={`flex flex-col items-center justify-center ${preview && "hidden"}`}>
                            <i className="fa-regular fa-images text-8xl"></i>
                            <Typography variant='h4'>Image preview</Typography>
                        </div>
                        <img src={preview} alt="Image Preview" className={`rounded-md object-cover object-center max-w-full max-h-full ${preview || "hidden"}`} accept="image/*" />
                    </div>
                    <input type="file" ref={fileRef} className='mt-1' accept="image/*" onChange={showPreview} />
                </div>
                <div className='w-1/2 flex flex-col items-center justify-center '>
                    <Button type='submit' className='bg-rose-800 w-3/4 text-md'>
                        {isSubmitting ? <i className='fa fa-spinner animate-spin'></i> :
                            <span><i className="fa-regular fa-image"></i> Upload Image</span>}
                    </Button>
                </div>
            </form>
            <hr className='border-t-2 border-gray-500' />
            <Typography variant='h4'>Manage banner images</Typography>
            <hr />
            <div className='w-full h-screen overflow-y-auto flex gap-3 flex-wrap'>
                {
                    banners.map((banner, key) => {
                        return (
                            <Card className='w-[32%] rounded h-64' key={key}>
                                <CardBody className='p-0'>
                                    <div className='m-0 rounded-none w-full h-52 flex justify-center items-center p-2 border-b-2'>
                                        <img src={BASE_URL + "banners/" + banner.image} className="max-w-full rounded-md max-h-full object-cover" alt="" />
                                    </div>
                                    <div className='p-2 flex justify-between'>
                                        <Switch className='checked:bg-rose-800 peer-checked:border-r-rose-800 peer-checked:before:bg-rose-800' label="Show" defaultChecked={banner.show} onChange={(e) => updateBannerStatus(e, key)} />
                                        <Button size='sm' onClick={() => deleteBanner(key)} className='bg-rose-800 text-xs'> Remove</Button>
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