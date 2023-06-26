export const RolUser = {
    EXTERNAL_USER: 'EXTERNAL_USER',
    ADMIN_USER: 'ADMIN_USER',
}

export let checkAdmin: Function = (role: string) => role  == RolUser.ADMIN_USER;
