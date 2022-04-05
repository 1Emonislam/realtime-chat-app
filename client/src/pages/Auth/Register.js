import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Container, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import { userRegister } from '../../store/actions/authAction';
import './auth.css';
function Register() {
  const dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm();
  const [values, setValues] = React.useState({
    password: '',
    password2: '',
    showPassword: false,
  });
  const onSubmit = data => {
    dispatch(userRegister(data, reset));
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
  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
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
        <div className="auth-form">
          <h2 className="text text-large">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0} textAlign="center">
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-name">First Name</InputLabel>
                  <Input
                    type="text"
                    autoComplete="off"{...register("firstName", { min: 0 })} required
                    sx={{ paddingBottom: '10px' }} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-name">Last Name</InputLabel>
                  <Input
                    type="text"
                    autoComplete="off"{...register("lastName", { min: 0 })} required
                    sx={{ paddingBottom: '10px' }} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-name">Email</InputLabel>
                  <Input
                    type="text"
                    autoComplete="off"{...register("email", { min: 0 })} required
                    sx={{ paddingBottom: '10px' }} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    sx={{ paddingBottom: '10px' }}
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
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                  <Input
                    autoComplete="off"{...register("password2", { min: 0 })} required
                    sx={{ paddingBottom: '10px' }}
                    type={values.showPassword2 ? 'text' : 'password'}
                    value={values.password2}
                    onChange={handleChange('password2')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleClickShowPassword2}
                        >
                          {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-birth">Date Of Birth</InputLabel>
                  <input type="date" className="input-birth" {...register("birthDate", { min: 0 })} required />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-gender" className='gender-label'>Gender</InputLabel>
                  <select {...register("gender")} className="gender-input" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" id="auth-btn" style={{ margin: '20px auto', fontSize: '15px', textTransform: 'capitalize', display: 'block', }}> Register</Button>
          </form>
          <span className="text-center">Already user? <span><Link to="/login" style={{ color: 'blueviolet' }} className="text text-links">Login</Link></span>
          </span>
        </div>
      </Container>
    </>
  )
}

export default Register