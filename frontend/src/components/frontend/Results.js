import React, { useState } from 'react';
import { Card, CardBody, Typography, CardFooter, Button, Navbar } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const cardData = [
  {
    title: "Men's Badminton (Singles)",
    winner: "Pink House",
    status: "completed",
    link: "#",
  },

  {
    title: "Women's Badminton (Singles)",
    winner: "Red House",
    status: "completed",
    link: "#",
  },
  
  {
    title: "Men's Carrom (Singles)",
    winner: "Blue House",
    status: "completed",
    link: "#",
  },

  {
    title: "Women's Table Tennies (Singles)",
    winner: "Undecided",
    status: "ongoing",
    link: "#",
  },

  {
    title: "Women's Volleyball",
    winner: "Undecided",
    status: "ongoing",
    link: "#",
  },

  {
    title: "Men's Foosball",
    winner: "Undecided",
    status: "ongoing",
    link: "#",
  },

  {
    title: "Chess",
    winner: "Undecided",
    status: "not started",
    link: "#",
  },

  {
    title: "Men's Badminton (Doubles)",
    winner: "Undecided",
    status: "not started",
    link: "#",
  },

  {
    title: "Women's Cricket",
    winner: "Undecided",
    status: "not started",
    link: "#",
  },
];

const CardComponent = ({ title, winner, link }) => (
  <Card className="mt-6 w-96 shadow-rose-300">
    <CardBody>
      <Typography variant="h4" className="mb-2 text-rose-900">
        {title}
      </Typography>
      <Typography variant = "h6">Winner: {winner}</Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <a href={link} className="inline-block hover:underline">
        <Button size="sm" variant="text" className="flex items-center gap-2 hover:bg-rose-800 hover:text-white">
          See Games!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </a>
    </CardFooter>
  </Card>
);

const CardsList = ({ cards = [] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {cards.map((card, index) => (
        <CardComponent
          key={index}
          title={card.title}
          winner={card.winner}
          link={card.link}
        />
      ))}
    </div>
  );
};

const Results = () => {
  const [selectedCategory, setSelectedCategory] = useState('completed'); //seting default as completed 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredCards = cardData.filter(card => card.status === selectedCategory);

  return (
    <div>
      <Navbar className='text-black flex justify-between items-center sticky top-0 left-0 end-0 bg-white bg-opacity-100 mx-auto rounded-none z-50 max-w-full' >
            <Link to='/'>
                <Typography variant='h3' className='flex text-gray-600'><span className='font-serif text-rose-900 font-bold'>.</span>msg-<span className='text-rose-900'> Sports</span ></Typography>
            </Link>
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography variant='h5'className="text-rose-800 p-1" >
                    <a href="#" className="flex items-center hover:text-rose-300" onClick={() => handleCategoryChange('completed')}>Completed</a>
                </Typography>
                <Typography variant='h5'className="text-rose-800 p-1">
                    <a href="#" className="flex items-center hover:text-rose-300" onClick={() => handleCategoryChange('ongoing')}>On Going</a>
                </Typography>
                <Typography variant='h5'className="text-rose-800 p-1">
                    <a href="#" className="flex items-center hover:text-rose-300" onClick={() => handleCategoryChange('not started')}>Not Started</a>
                </Typography>
            </ul>
        </Navbar>
      <CardsList cards={filteredCards} />
    </div>
  );
};

export default Results;
