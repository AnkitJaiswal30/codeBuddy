import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Checkbox, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const useStyle = makeStyles(()=>({
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:  'center',
        flexDirection: 'column'
    },
    email: {
        padding: '10px 0px',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 250
    },
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:  'center',
    },
    button: {
        paddingRight: 10
    }
}))

const submitData = async (formData) => {
    try {
        const response = await axios.post('https://codebuddy.review/submit', formData,  {
            headers: {
                'Content-Type': 'application/json',
            }
          });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData
      } catch (error) {
        console.log(error)
      } 
}

const ThirdPageForm = ({formData}) => {
    const classes =  useStyle()
    const navigate = useNavigate()
    const [country, setCountryCode] = useState(formData?.countryCode || '')
    const [phoneNumber, setPhoneNumber] = useState(formData?.phoneNumber)
    const [declaration, setDeclaration] = useState(false)


    const handlePhoneNumberChange = (e) => {
        const numbersRegex = /^[0-9]+$/;
        if(numbersRegex.test(e.target.value)) setPhoneNumber(e.target.value)
    }
    const handleCountryCode = (e) => {
        setCountryCode(e.target.value)
    }
const handleSave = () => {
    formData['countryCode'] = country
    formData['phoneNumber'] = phoneNumber
    const data = submitData(formData)
    console.log(data)
}

    return (
        <>
        <div className={classes.formContainer}>
        <div  className={classes.email}>
            <select onChange={handleCountryCode} value={country}>
                <option value = '+91'>{'+91'}</option>
                <option value = '+1'>{'+1'}</option>
            </select>
        </div>
        <div  className={classes.email}> 
                <TextField
                id={"outlined-required"}
                label={"Phone Number"}
                size="small"
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                />
        </div>
            <div  className={classes.email}>
                <Checkbox onChange={(e) => {
                    setDeclaration(e.target.checked)
                }} checked = {declaration} />
                <Typography variant='caption'>{'Declaration'}</Typography>
             </div>

        </div>
        <div className={classes.buttonWrapper}>
            <div className={classes.button}>
                <Button size="small" variant={"outlined"} onClick={()=> {
                    navigate('/set1/secondPage')
                }}>{'Back'}</Button>
            </div>
            <Button size="small" variant={"contained"} onClick={handleSave} color={"success"} className={classes.buttons} disabled ={!declaration && phoneNumber === ''}>{'Save & Next'}</Button>
        </div>
        </>
    )
}
export default ThirdPageForm