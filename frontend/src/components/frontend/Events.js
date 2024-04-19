import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

const Events = () => {
    let events = [
        { img: "https://images.pexels.com/photos/3452356/pexels-photo-3452356.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Cricket", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi in distinctio minima ullam repellat expedita obcaecati dolore laborum sint enim eaque neque, at totam officia velit natus nisi tenetur et autem ratione eum, rem provident incidunt? Eaque, facilis enim saepe odit quaerat dolorum sed ex temporibus dicta quidem natus." },
        { img: "https://images.pexels.com/photos/1089087/pexels-photo-1089087.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Basketball", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi in distinctio minima ullam repellat expedita obcaecati dolore laborum sint enim eaque neque, at totam officia velit natus nisi tenetur et autem ratione eum, rem provident incidunt? Eaque, facilis enim saepe odit quaerat dolorum sed ex temporibus dicta quidem natus." },
        { img: "https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Badminton", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi in distinctio minima ullam repellat expedita obcaecati dolore laborum sint enim eaque neque, at totam officia velit natus nisi tenetur et autem ratione eum, rem provident incidunt? Eaque, facilis enim saepe odit quaerat dolorum sed ex temporibus dicta quidem natus." }
    ]
    return (
        <section id='events' className='mb-14'>
            <Typography variant='h2' className='text-rose-800 font-sans'>Games & Events</Typography>
            <div className='flex mt-8 gap-10 flex-col'>
                {
                    events.map((event, i) => {
                        return <Card className='w-full' key={i}>
                            <CardBody className={`flex gap-8 ${i % 2 != 0 || 'flex-row-reverse'}`}>
                                <div className='w-1/2'>
                                    <img
                                        src={event.img}
                                        alt={`Image ${i + 1}`}
                                        className="max-h-[350px] w-full object-cover rounded-xl hover:-translate-y-1 hover:scale-105 duration-300"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <Typography variant='h3' className='mb-3'>{event.name}</Typography>
                                    <Typography variant="h5" className="mb-2 font-serif font-thin">
                                        {event.desc}
                                    </Typography>
                                    <Button className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3'>See more</Button>
                                </div>

                            </CardBody>
                        </Card>
                    })
                }

            </div>
        </section>
    )
}

export default Events