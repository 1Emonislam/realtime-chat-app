import { Grid, ToggleButton} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as React from 'react';
export default function PeopleOffline() {
    const [selected, setSelected] = React.useState(false);
    return (
        <Grid container spacing={2} alignItems="center"style={{cursor:'pointer'}}>
            <Grid item xs={3}>
                <Stack>
                    <Avatar variant="inherit" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <ToggleButton value="check"
                    selected={selected}
                    style={{ border: 'none', textTransform: 'capitalize', position: 'relative', left: '-10px' }}
                    onChange={() => {
                        setSelected(false);
                    }}>

                    Emon Islam
                </ToggleButton>
            </Grid>
        </Grid>
    );
}
