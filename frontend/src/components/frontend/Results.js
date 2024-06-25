import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react'

const tableData = {
    headers: ["S.No", "Event", "Team 1 ID", "Team 2 ID", "Winner", "Points"],
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
         <div className="container mx-auto">
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
        </>
    )
}

export default Results 