# chat-app

# back end api

## User login https://chalechat.herokuapp.com/api/authlogin

```
fetch('https://chalechat.herokuapp.com/api/auth',{
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

## User log Out https://chalechat.herokuapp.com/api/auth/logout

```
fetch('https://chalechat.herokuapp.com/api/auth/logout',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## User Register https://chalechat.herokuapp.com/api/auth/register

```
fetch('https://chalechat.herokuapp.com/api/auth/register',{
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

## User change password https://chalechat.herokuapp.com/api/auth/change-password

```
fetch('https://chalechat.herokuapp.com/api/auth/change-password',{
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

## User forget password https://chalechat.herokuapp.com/api/auth/forget-password

```
fetch('https://chalechat.herokuapp.com/api/auth/forget-password',{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
     email
    })
    })
```

## User reset password https://chalechat.herokuapp.com/api/auth/reset-password

```
fetch('https://chalechat.herokuapp.com/api/auth/reset-password',{
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

## get my profile https://chalechat.herokuapp.com/api/profile

```
fetch('https://chalechat.herokuapp.com/api/profile',{
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## get public single profile https://chalechat.herokuapp.com/api/profile/:id

```
fetch('https://chalechat.herokuapp.com/api/profile/:id',{
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## delete public single profile https://chalechat.herokuapp.com/api/profile/:id

```
fetch('https://chalechat.herokuapp.com/api/profile/:id',{
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    })
```

## update my profile https://chalechat.herokuapp.com/api/profile/update

```
fetch('https://chalechat.herokuapp.com/api/profile/update',{
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        gender,
        birthDate,
        pic,
        userInfo,
    "socialMedia": [
        {
            "facebook": ""
        },
        {
            "linkedin": ""
        },
        {
            "twitter": ""
        }
    ]
})
    })
```

# Friend Routes api

```
router.post('/api/friend/add',protect)
router.put('/api/friend/remove',protect)
```

# Message Routes

```
 router.post('/api/message/message',protect)
 router.get('/api/message/message/:chatId',protect)
 router.delete('/api/message/message/:chatId',protect)
 router.put('/api/message/message/:chatId',protect)
```

# chat Routes api

```
router.post('/api/chat', protect, acessChat)
router.get('/api/chat', protect,getChat)
router.put('/api/chat/group/addTo', protect, groupAddTo)
router.put('/api/chat/', protect, groupRename)
router.post('/api/chat/group/create', protect, groupCreate)
router.put('/api/chat/group/removeTo', protect, groupMemberRemoveTo)
```

# chat-app-back-up-code
