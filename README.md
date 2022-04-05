# chat-app

# back end api

## User login https://collaballapp.herokuapp.com/api/authlogin

```
fetch('https://collaballapp.herokuapp.com/api/auth',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        email,
        password,
    })
    })
```

## User Register https://collaballapp.herokuapp.com/api/auth/register

```
fetch('https://collaballapp.herokuapp.com/api/auth/register',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        email,
        password,
        birthDate,
        gender,
        firstName,
        lastName,
        phone
    })
    })
```

## User change password https://collaballapp.herokuapp.com/api/auth/change-password

```
fetch('https://collaballapp.herokuapp.com/api/auth/change-password',{
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      oldPassword,
      password,
      password2
    })
    })
```

## User forget password https://collaballapp.herokuapp.com/api/auth/forget-password

```
fetch('https://collaballapp.herokuapp.com/api/auth/forget-password',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
     email,
     phone
    })
    })
```

## User reset password https://collaballapp.herokuapp.com/api/auth/reset-password

```
fetch('https://collaballapp.herokuapp.com/api/auth/reset-password',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
     password,
     password2
    })
    })
```
