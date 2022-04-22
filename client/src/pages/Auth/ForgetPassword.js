import { Button, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo/logo.png';
import Loading from '../../components/Spinner/Loading';
import { forgetPassword } from '../../store/actions/authAction';
import { AUTH_ERROR, AUTH_MESSAGE } from '../../store/type/authType';
import './auth.css';
function ForgetPassword() {
    const { register, reset, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { auth, theme } = useSelector(state => state);
    const { loading, error, message } = auth;
    const onSubmit = data => {
        //console.log(data)
        dispatch(forgetPassword(data, reset))
    };
    if (message) {
        toast.success(`${message}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: AUTH_MESSAGE
        })
    }
    if (Object?.values(error)?.length) {
        Object.values(error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: AUTH_ERROR
            })
        })
    }
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
                        {loading ? <div style={{ margin: '20px 0' }}>
                            <Loading />
                        </div> :
                            <Button type="submit" variant="contained" id="auth-btn" style={{ margin: '20px auto', fontSize: '15px', textTransform: 'capitalize', display: 'block', }}> Forget Password</Button>}
                    </form>
                    <span className="text-center">New user? <span><Link to="/register" style={{ color: 'blueviolet' }} className="text text-links">Create an account</Link></span>
                    </span>

                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>
        </>
    )
}

export default ForgetPassword