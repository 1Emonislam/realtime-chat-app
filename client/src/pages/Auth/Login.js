import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Container, ToggleButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo/logo_green.png';
import Loading from '../../components/Spinner/Loading';
import { userLogin } from '../../store/actions/authAction';
import { AUTH_ERROR, AUTH_MESSAGE } from '../../store/type/authType';
import './auth.css';
function Login({ mode }) {
    const { register, reset, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { auth, theme } = useSelector(state => state);
    const { loading, error, message } = auth;
    const [values, setValues] = React.useState({
        password: '',
        password2: '',
        showPassword: false,
    });
    const onSubmit = data => {
        dispatch(userLogin(data, reset))
    };
    useEffect(() => {
        if (auth?.user?.user?.email) {
            window?.location.replace("/chat")
        }
    }, [auth?.user?.user?.email])
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
    if (error) {
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
            <Container sx={{ mt: 4, pt: 3, boxShadow: `${mode === 'dark' && '1px 1px 10px #0c1aa9'}` }} maxWidth="xs">
                <div className="logo">
                    <Link to="/"><img width="80px" height="80px" src={logo} alt="logo" style={{ display: 'block', margin: 'auto', marginBottom: '20px' }} /></Link>
                </div>
                <div className="auth-form" style={{ marginBottom: '50px' }}>
                    <ToggleButton value="one" style={{ fontSize: '20px', textTransform: 'capitalize', border: 'none' }}>
                        Login
                    </ToggleButton>
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
                        {loading ? <div style={{ margin: '20px 0' }}>
                            <Loading />
                        </div> :
                            <Button type="submit" variant="contained" id="auth-btn" style={{ margin: '20px auto', fontSize: '15px', background: '#5865f2', color: '#fff', textTransform: 'capitalize', display: 'block', }}> Login</Button>}
                    </form>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <ToggleButton style={{ textTransform: 'none', border: 'none' }} value="two" className="text-center">New user?
                        </ToggleButton>
                        <ToggleButton style={{ textTransform: 'none', border: 'none' }} value="two" className="text-center">
                            <Link to="/register" style={{ color: 'blueviolet' }} className="text text-links">Create an account</Link>
                        </ToggleButton>
                    </div>
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

export default Login