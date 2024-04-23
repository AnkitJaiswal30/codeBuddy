import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Typography } from '@mui/material';
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
const FirstPageForm = ({formData}) => {
    const classes =  useStyle()
    const navigate = useNavigate()
    const [email, setEmail] = useState(formData?.emailId || '')
    const [password, setPassword] = useState(formData?.password || '')
    const [isInvalidEmail, setIsInvalidEmail]= useState(false)
    const [isInvalidPassword, setIsInvalidPassword]= useState(false)
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validPasswordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{8,}$/;
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        validEmailRegex.test(e.target.value) || !e.target.value ? setIsInvalidEmail(false) : setIsInvalidEmail(true)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        validPasswordRegex.test(e.target.value) || !(e.target.value) ? setIsInvalidPassword(false) : setIsInvalidPassword(true)
    }
    const handleSave = () => {
        if(!!email && !!password){
            navigate('/set1/secondPage')
            formData['emailId'] = email
            formData['password'] = password
        }
    }
    return (
        <>
        <div className={classes.formContainer}>
            <div  className={classes.email}>  
                <TextField
                required
                error={isInvalidEmail}
                id={"outlined-required"}
                label={"Email-Id"}
                size="small"
                onChange={handleEmailChange}
                value={email}
                />
                {
                   isInvalidEmail && <Typography variant='caption' color={'error'}>
                        {'Please Enter valid Email'}
                    </Typography>
                }
            </div>
            <div  className={classes.email}> 
                <TextField
                required
                error={isInvalidPassword}
                id={"outlined-required"}
                label={"Password"}
                type='password'
                size="small"
                onChange={handlePasswordChange}
                value={password}
                />
                {
                isInvalidPassword && <Typography variant='caption' color={'error'}>
                    {'Please Enter valid Password At least 2 uppercase letters At least 2 lowercase letters At least 2 digits At least 2 special characters Minimum 8 characters'}
                </Typography>
                }
            </div>
        </div>
        <div className={classes.buttonWrapper}>
            <div className={classes.button}>
                <Button size="small" variant={"outlined"} disabled= {true}>{'Back'}</Button>
            </div>
            <Button size="small" variant={"contained"} color={"success"} className={classes.buttons} disabled= {isInvalidEmail || isInvalidPassword} onClick={handleSave}>{'Save & Next'}</Button>
        </div>
        </>
    )
}
export default FirstPageForm