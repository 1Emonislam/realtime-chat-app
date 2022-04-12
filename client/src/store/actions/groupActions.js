export const getGroupData = (data, token) => {
    return (dispatch) => {
        fetch('https://collaballapp.herokuapp.com/api/chat/group/create', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Authorizaion": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
}