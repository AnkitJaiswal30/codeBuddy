import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const SecondPageForm = ({formData}) => {
    const classes =  useStyle()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(formData?.firstName || '')
    const [lastName, setLastName] = useState(formData?.lastName || '')
    const [address, setAddress] = useState(formData?.address || '')
console.log(formData)
    const handleFirstNameChange = (e) => {
        const { value } = e.target
        const re = /^[A-Za-z]+$/;
        if ((value === "" || re.test(value)) && value.length <= 50) {
            setFirstName(e.target.value)
        }
    }
    const handleLastNameChange = (e) => {
        const re = /^[A-Za-z]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setLastName(e.target.value)
        }
    }
    const handleAddressChange = (e) => {
        if(e.target.value.length<= 10) setAddress(e.target.value)
    }
    const handleSave = () => {
        formData['firstName'] = firstName
        formData['lastName'] = lastName
        formData['address'] = address
        navigate('/set1/thirdPage')
    }
    const handleBack = () => {
        navigate('/set1')
    }

    return (
        <>
        <div className={classes.formContainer}>
            <div  className={classes.email}>  
                <TextField
                required
                id={"outlined-required"}
                label={"FirstName"}
                size="small"
                onChange={handleFirstNameChange}
                value={firstName}
                />
            </div>
            <div  className={classes.email}> 
                <TextField
                id={"outlined-required"}
                label={"LastName"}
                size="small"
                onChange={handleLastNameChange}
                value={lastName}
                />
            </div>
            <div  className={classes.email}> 
                <TextField
                required
                id={"outlined-required"}
                label={"Address"}
                size="small"
                onChange={handleAddressChange}
                value={address}
                />
            </div>
        </div>
        <div className={classes.buttonWrapper}>
            <div className={classes.button}>
                <Button size="small" variant={"outlined"} onClick={handleBack}>{'Back'}</Button>
            </div>
            <Button size="small" variant={"contained"} onClick={handleSave} color={"success"} className={classes.buttons} disabled ={firstName.length <2 || address.length === 0}>{'Save & Next'}</Button>
        </div>
        </>
    )
}
export default SecondPageForm