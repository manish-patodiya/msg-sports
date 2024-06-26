import { Card, CardHeader, CardBody, Typography, CardFooter, Button, Table } from '@material-tailwind/react'
import React from "react";
import Header from '../Header';
import Results from './Results';

const ResultsPage = () => {
    return(
        <>
            
            <Typography className=" text-rose-900 variant='h2'"></Typography>
            <Results />
        </>
    )
}

export default ResultsPage 