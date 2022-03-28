import { Button, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import './auth.css';
function ForgetPassword() {
    const { register, reset, handleSubmit } = useForm();
    const onSubmit = data => {
    console.log(data) 
console.log(reset)
    };
    return (
        <>
            <Container maxWidth="xs">
                <div className="logo">
                    <Link to="/"><img width="80px" height="80px" src={logo} alt="logo" style={{ display: 'block', margin: 'auto', marginBottom: '20px' }} /></Link>
                </div>
                <div className="auth-form" style={{ marginBottom: '50px' }}>
                    <h2 className="text text-large">Forget Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                            <Input
                                type="email"
                                {...register("email", { min: 0 })} required
                                sx={{ paddingBottom: '6px' }} />
                        </FormControl>
                        <Button type="submit" variant="contained" style={{ margin: '20px auto', padding: '11px 60px', fontSize: '15px', textTransform: 'capitalize', display: 'block', }}> Forget Password</Button>
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

export default ForgetPassword