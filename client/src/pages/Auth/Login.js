import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import './auth.css';
function Login() {
    const { register, reset, handleSubmit } = useForm();
    const [values, setValues] = React.useState({
        password: '',
        password2: '',
        showPassword: false,
    });
    const onSubmit = data => {
    console.log(data) 
console.log(reset)
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Container maxWidth="xs">
                <div className="logo">
                    <Link to="/"><img width="80px" height="80px" src={logo} alt="logo" style={{ display: 'block', margin: 'auto', marginBottom: '20px' }} /></Link>
                </div>
                <div className="auth-form" style={{ marginBottom: '50px' }}>
                    <h2 className="text text-large">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                            <Input
                                type="email"
                                {...register("email", { min: 0 })} required
                                sx={{ paddingBottom: '6px' }} />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                sx={{ paddingBottom: '6px' }}
                                autoComplete="off"{...register("password", { min: 0 })} required
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <span><Link to="/forget-password" style={{ color: 'blueviolet', paddingLeft: '8px', fontSize: '14px' }} className="text text-links">Forget password?</Link></span>
                        <Button type="submit" variant="contained" style={{ margin: '20px auto', padding: '11px 60px', fontSize: '15px', textTransform: 'capitalize', display: 'block', }}> Login</Button>
                    </form>
                    <span className="text-center">New user? <span><Link to="/register" style={{ color: 'blueviolet' }} className="text text-links">Create an account</Link></span>
                    </span>
                    {/* <Stack sx={{ width: '100%' }} spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {err && <Alert severity="error">{err}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            {msgError && <Alert severity="success">{msgError}</Alert>}
          </Stack> */}

                </div>
            </Container>
        </>
    )
}

export default Login