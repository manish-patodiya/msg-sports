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
        <section id="about">
            <h1 className='text-rose-800 font-sans text-5xl text-pretty'>About</h1>
            <Typography variant="h2" color="blue-gray" className="mb-2">
                msg global
            </Typography>
            <Typography variant="h4" className="mb-2 font-serif font-thin">
                We are a system integrator, software development partner, and managed services provider that helps companies improve their operational efficiency and decision-making capabilities utilizing SAP® technology. Our company tagline is Passion. People. Performance. and accurately summarizes who we are.
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