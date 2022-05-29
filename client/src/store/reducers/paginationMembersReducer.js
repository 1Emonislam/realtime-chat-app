const initState = {
    members: [],
    groupAdmin: [],
    pageUser: 1,
    limitUser: 10,
    countMember: 0,
    countAdmin: 0
}
export const MEMBER_ADD_STORE = 'MEMBER_ADD_STORE'
export const ADMIN_MEMBER_STORE = 'ADMIN_MEMBER_STORE'
export const paginationMembersReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === MEMBER_ADD_STORE) {
        return {
            ...state,
            members: payload.members,
            pageUser: payload.pageUser || 1,
            limitUser: payload.limitUser || 10,
            countMember: payload.countMember
        }
    }
    if (type === ADMIN_MEMBER_STORE) {
        return {
            ...state,
            groupAdmin: payload.groupAdmin,
            pageUser: payload.pageUser || 1,
            limitUser: payload.limitUser || 10,
            countAdmin: payload.countAdmin
        }
    }
    return state;

}