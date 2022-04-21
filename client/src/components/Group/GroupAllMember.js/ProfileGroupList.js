import { Tooltip, Grid, ToggleButton, Avatar } from '@mui/material'
import React from 'react'
function ProfileGroupList({ memberInfo }) {
    return (
        <>
            {memberInfo?.map((member, index) => (
                <Grid container spacing={2} key={index} alignItems="center" sx={{ padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #dddddd59' }}>
                    <Grid item xs={2}>
                        <Tooltip component="span" title={member?.firstName + ' ' + member?.lastName}>
                            <Avatar style={{ width: "50px", height: '50px', borderRadius: '50px' }} alt={member.username} src={member?.pic}>
                            </Avatar>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={10}>
                        <ToggleButton value="one"style={{border:'none'}}>
                            {member.firstName + ' ' + member?.lastName}
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
        </>
    )
}

export default ProfileGroupList