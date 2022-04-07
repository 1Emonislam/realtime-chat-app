# chat-app

## Please join WhatsApp invitation link My team daily work and updated projects if you have any suggestions

# https://chat.whatsapp.com/DqPpq0YwEP2HgE508d2G43

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
    'Authorization':`Bearer ${token}`
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
     email
    })
    })
```

## User reset password https://collaballapp.herokuapp.com/api/auth/reset-password

```
fetch('https://collaballapp.herokuapp.com/api/auth/reset-password',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify({
     password,
     password2
    })
    })
```

## get my profile https://collaballapp.herokuapp.com/api/profile

```
fetch('https://collaballapp.herokuapp.com/api/profile',{
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## get public single profile https://collaballapp.herokuapp.com/api/profile/:id

```
fetch('https://collaballapp.herokuapp.com/api/profile/:id',{
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## update my profile https://collaballapp.herokuapp.com/api/profile/update

```
fetch('https://collaballapp.herokuapp.com/api/profile/update',{
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```
