import React from 'react';
import { Box } from '@mui/system';
import HeaderContainer from '../../../pages/Shared/HeaderContainer';
import ProfileSetting from '../../ChatProfile/ProfileSetting/ProfileSetting';

const ProfileSettings = ({ mode }) => {
  // const data = [
  //   {
  //     name: "Michelle Green",
  //     pp: "",
  //     email: "michelle.green@gmail.com",
  //     country: "USA",
  //     phone: "555-555-21541",
  //     nickname: "Alberywo",
  //     fbac: "https://facebook.com/praan.too",
  //     instac: "https://instagram.com/prant.o",
  //     inac: "https://linkedin.com/in/iipranto",
  //     twac: "https://twitter.com/",
  //     youac: "https://youtube.com/",
  //     desktopNotification: "disable",
  //     soundNotification: "disable",
  //     profilePrivacy: "disable",
  //     twoStepVerification: "disable",
  //   },
  // ];
  return (
    <Box className="chat-box-container">
      <HeaderContainer mode={mode} />
      <ProfileSetting mode={mode} />
      <Box>
        {/* {data.map((per, index) => (
             <div key={index}>
             <h3>{per.name}</h3>
           </div>
          ))} */}
      </Box>
    </Box>
  );
};

export default ProfileSettings;