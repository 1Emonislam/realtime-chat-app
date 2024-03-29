import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from '@mui/icons-material/Search';
import { Grid, ToggleButton, Typography } from '@mui/material';
import React from 'react';
import '../Group.css';
import GroupList from '../GroupList/GroupList';
import '../__Groupcontainer.css';

const GroupHome = () => {
    // const data = [
    //     {
    //         name: 'Helen',
    //         img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
    //     },
    //     {
    //         name: 'Alen',
    //         img: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    //     },
    //     {
    //         name: 'Samira',
    //         img: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    //     },
    //     {
    //         name: 'Fario',
    //         img: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    //     },
    // ]
    return (
      <div className="chat-box-container">
        <Grid
          container
          spacing={0}
          sx={{
            padding: {
              lg: "25px 20px",
              md: "25px 15px",
              sm: "25px 40px",
              xs: "25px 40px",
            },
          }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item xs={6}>
            <Typography
              sx={{
                color: "#5A078B",
                fontSize: {
                  lg: 14,
                  md: 20,
                  sm: 16,
                  xs: 14,
                },
                fontWeight: {
                  lg: 700,
                  md: 600,
                  sm: 500,
                  xs: 400,
                },
                fontFamily: `"Poppins", sans-serif`
              }}
              
              component="div"
            >
              GROUP CHAT
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            className="headIcon"
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          >
            <ToggleButton value="one">
              <GroupAddIcon
                sx={{
                  fontSize: {
                    lg: 15,
                    md: 20,
                    sm: 12,
                    xs: 11,
                  },
                  fontWeight: {
                    lg: 700,
                    md: 600,
                    sm: 500,
                    xs: 400,
                  },
                  borderRadius: {
                    lg: "5px",
                    md: "4px",
                    sm: "3px",
                    xs: "2px",
                  },
                  color: "#5A078B",
                }}
              />
            </ToggleButton>
          </Grid>
          <Grid item xs={12} style={{ padding: "6px 0" }}>
            <div className="search-field-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Contacts"
                style={{ color: "inherit" }}
              />
            </div>
          </Grid>
        </Grid>
        <GroupList />
      </div>
    );
};

export default GroupHome;