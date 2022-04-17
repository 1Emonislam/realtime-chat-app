import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupPeople({ memberInfo }) {
  return (
    <div>
      <AvatarGroup total={memberInfo?.totalMember}>
        {memberInfo?.members?.map((member, index) => (
          <Avatar key={index} alt={member.firstName} src={member?.pic} />
        ))}
      </AvatarGroup>
    </div>
  );
}