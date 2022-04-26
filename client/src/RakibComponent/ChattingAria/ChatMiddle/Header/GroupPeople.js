import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import * as React from 'react';
import GroupAllMember from '../../../../components/Group/GroupAllMember.js/GroupAllMember';

export default function GroupPeople({ memberInfo }) {
  const [memberOpen, setMemberOpen] = React.useState(false);
  const handleMemberOpen = () => setMemberOpen(true);
  const handleMemberClose = () => setMemberOpen(false);
  return (
    <div>
      <AvatarGroup total={memberInfo?.chat?.members?.length} onClick={handleMemberOpen} style={{ cursor: 'pointer' }}>
        {memberInfo?.chat?.members?.slice(0, 3)?.map((member, index) => (
          <Tooltip style={{cursor:"pointer"}} title={member.firstName + ' ' + member?.lastName} key={index}>
            <Avatar style={{ cursor: 'pointer' }} key={index} alt={member.username} src={member?.pic} />
          </Tooltip>
        ))}
      </AvatarGroup>
      <GroupAllMember memberInfo={memberInfo} handleMemberClose={handleMemberClose} memberOpen={memberOpen} />
    </div>
  );
}