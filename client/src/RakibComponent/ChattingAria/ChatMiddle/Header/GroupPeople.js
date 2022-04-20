import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Tooltip } from '@mui/material';
import GroupAllMember from '../../../../components/Group/GroupAllMember.js/GroupAllMember';

export default function GroupPeople({ memberInfo }) {
  const [memberOpen, setMemberOpen] = React.useState(false);
  const handleMemberOpen = () => setMemberOpen(true);
  const handleMemberClose = () => setMemberOpen(false);
  return (
    <div>
      <AvatarGroup total={memberInfo?.totalMember} onClick={handleMemberOpen} style={{ cursor: 'pointer' }}>
        {memberInfo?.members?.slice(0, 3)?.map((member, index) => (
          <Tooltip title={member.firstName + ' ' + member?.lastName} key={index}>
            <Avatar style={{ cursor: 'pointer' }} key={index} alt={member.username} src={member?.pic} />
          </Tooltip>
        ))}
      </AvatarGroup>
      <GroupAllMember handleMemberClose={handleMemberClose} memberOpen={memberOpen} />
    </div>
  );
}