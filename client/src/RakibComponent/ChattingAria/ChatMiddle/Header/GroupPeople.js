import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import * as React from 'react';
import GroupAllMember from '../../../../components/Group/GroupAllMember.js/GroupAllMember';
// import { useContext } from 'react'
// import { PaginationContext } from '../../../../App';
import { useSelector } from 'react-redux';

export default function GroupPeople({ memberInfo }) {
  const [memberOpen, setMemberOpen] = React.useState(false);
  const handleMemberOpen = () => setMemberOpen(true);
  const handleMemberClose = () => setMemberOpen(false);
  const { pageMembers } = useSelector(state => state)
  // console.log(pageMembers?.countMember)
  // const paginationContext = useContext(PaginationContext)
  // // const {
  //   // countMember,
  // } = paginationContext;
  return (
    <div>
      <AvatarGroup total={pageMembers?.countMember || 0} onClick={handleMemberOpen} style={{ cursor: 'pointer', justifyContent: 'flex-end' }}>
        {pageMembers?.members?.slice(0, 2)?.map((member, index) => (
          <Tooltip style={{ cursor: "pointer" }} title={member.firstName + ' ' + member?.lastName} key={index}>
            <Avatar style={{ cursor: 'pointer' }} key={index} alt={member.username} src={member?.pic} />
          </Tooltip>
        ))}
      </AvatarGroup>
      <GroupAllMember memberInfo={memberInfo} handleMemberClose={handleMemberClose} memberOpen={memberOpen} />
    </div>
  );
}