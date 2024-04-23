import { TextField, Button } from "@mui/material"

import { useState } from "react"


const fetchSeatsData = async (count) => {
    try {
        const response = await fetch(`https://codebuddy.review/seats?count=${count}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData
      } catch (error) {
      }
}

export const TakeNumberOfRows = ({ setSeatsData}) => {
    const [count, setCount] = useState(0)
    const handleCountChange = (e) => {
        if(e.target.value >= 3  || e.target.value <= 10){
            setCount(e.target.value)
        }
    }
    const handleSubmit = () => {
        const seatsData = fetchSeatsData(count)
        setSeatsData(seatsData)
        console.log('>>>>>>',seatsData)
    }
    return(
        <>
            <div>
               <TextField
                id={"outlined-required"}
                label={"Phone Number"}
                size="small"
                type="number"
                onChange={handleCountChange}
                value={count}
                />        
            </div>
            <div>
                <Button size="small" variant={"contained"} onClick={handleSubmit} color={"success"} >{'Submit'}</Button>
            </div>
        </>

    )
}