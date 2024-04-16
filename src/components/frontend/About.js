import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react'
import React from 'react'

const About = () => {
    let obj = [

        {
            img: "https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Red House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-red-800"
        },
        {
            img: "https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Purple House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-purple-800"
        },
        {
            img: "https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Green House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-green-800"
        },
        {
            img: "https://images.pexels.com/photos/54267/sunflower-blossom-bloom-flowers-54267.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Yellow House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-yellow-800 text-black"
        },
        {
            img: "https://images.pexels.com/photos/2156884/pexels-photo-2156884.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Pink House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-pink-800"
        },
        {
            img: "https://images.pexels.com/photos/714525/pexels-photo-714525.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Orange House",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident",
            color: "bg-orange-800"
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

            <div className='flex gap-5 mt-10 flex-wrap'>
                {
                    obj.map((e) => {
                        return (
                            <Card className={`w-[32%] text-white ${e.color}  `}>
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
                                    <Typography variant="h5" className="mb-2">
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