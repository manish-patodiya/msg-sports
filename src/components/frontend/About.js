import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react'
import React from 'react'

const About = () => {
    let obj = [
        {
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            title: "Title 1",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident"
        },
        {
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            title: "Title 2",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident"
        },
        {
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            title: "Title 3",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident"
        },
    ]
    return (
        <section id="about" className='mb-14'>
            <Typography variant='h2' className='text-rose-800 font-sans'>About</Typography>
            <Typography variant="h2" color="blue-gray" className="mb-2">
                msg sports
            </Typography>
            <Typography variant="h4" className="mb-2 font-serif font-thin">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam ut laborum cum architecto itaque dolores delectus obcaecati expedita quos temporibus aliquid atque mollitia unde labore, ullam autem! Rerum cupiditate pariatur saepe, tempora, quod totam dolorem eum voluptates enim, facere hic delectus perspiciatis inventore nostrum exercitationem consequatur maxime consectetur corrupti.
            </Typography>

            <div className='flex justify-between mt-10 gap-5'>
                {
                    obj.map((e) => {
                        return (
                            <Card className="w-1/3">
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="m-0 rounded-none"
                                >
                                    <img
                                        src={e.img}
                                        alt="ui/ux review check"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {e.title}
                                    </Typography>
                                    <Typography>
                                        {e.desc}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <a href='#'>Read More...</a>
                                </CardFooter>
                            </Card>
                        )
                    })
                }

            </div>

        </section>
    )
}

export default About