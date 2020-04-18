const PORT = process.env.PORT || 3000;
const SP_LIST_USER = `CALL sp_list_user();`;
const SP_CREATE_USER = `CALL sp_create_user(?,?,?);`;
const SP_UPDATE_USER = `CALL sp_update_user(?,?,?,?);`;
const SP_USER_ID = `CALL  sp_user_id(?);`;
const SP_DELETE_USER = `call sp_delete_user(?);`;
export {
    PORT,
    SP_LIST_USER,
    SP_CREATE_USER,
    SP_UPDATE_USER,
    SP_USER_ID,
    SP_DELETE_USER
}