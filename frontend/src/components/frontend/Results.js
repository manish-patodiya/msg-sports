import { Card, CardHeader, CardBody, Typography, CardFooter, Button, Table } from '@material-tailwind/react'

const tableData = {
    headers: ["S.No", "Event", "Team 1", "Team 2", "Winner", "Points"],
    rows: [
        [1, "Men's Badminton - Singles", 1, 2, 1, 100],
        [2, "Women's Badminton - Singles", 3, 4, 3, 100],
        [3, "Foosball", 5, 2, 2, 200],
        [4, "Carrom", 1, 2, 1, 100],
        [5, "Men's Football", 3, 2, 2, 150],
        [6, "Women's Cricket", 1, 4, 1, 100]
    ]
};

const Results = () => { 
    return(
        <>
         <div id="results" className="container mx-auto">
            <Typography variant='h2' className='text-rose-800 font-sans'>Results</Typography>
            <div id='table1' className='p-5'>
                <table className="border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-rose-900 text-white">
                            {tableData.headers.map((header, index) => (
                                <th key={index} className="border border-gray-400 px-4 py-2">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-400 px-4 py-2">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Results 