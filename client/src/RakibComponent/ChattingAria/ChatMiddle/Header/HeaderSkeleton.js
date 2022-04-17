import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import * as React from 'react';
function Media(props) {
    const { loading = true } = props;
    return (
        <CardHeader
            avatar={
                loading && (
                    <>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </>
                )
            }
            action={
                loading ? null : (
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                )
            }
            title={
                loading ? (
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                ) : (
                    'Ted'
                )
            }
            subheader={
                loading ? (
                    <Skeleton animation="wave" height={10} width="40%" />
                ) : (
                    '5 hours ago'
                )
            }
        />

    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default function HeaderSkeletonMember() {
    return (
        <div>
            <Media loading />
        </div>
    );
}
