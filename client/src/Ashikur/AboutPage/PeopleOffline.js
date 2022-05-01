import { Grid, ToggleButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as React from 'react';
export default function PeopleOffline({ offline }) {
    const [selected, setSelected] = React.useState(false);
    return (
        <>

            {offline?.map((member, index) => (
                    
                <Grid key={index} container spacing={2} alignItems="center" style={{ cursor: 'pointer',paddingBottom:'10px' }}>
                        {/* {console.log(member?.pic)} */}
                    <Grid item xs={3}>
                        <Stack>
                            <Avatar variant="inherit" alt={member?.username} src={member?.pic} />
                        </Stack>
                    </Grid>
                    <Grid item xs={9}>
                        <ToggleButton value="check"
                            selected={selected}
                            style={{ border: 'none', textTransform: 'capitalize', position: 'relative', left: '-10px' }}
                            onChange={() => {
                                setSelected(false);
                            }}>

                            {member?.firstName + ' ' + member?.lastName}
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
        </>

    );
}
