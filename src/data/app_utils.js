

var USER_ID = '';

class AppUtils {
    static getUserId() {
        return USER_ID.toString();
    }
    static setUserId(userId) {
        USER_ID = userId;
    }
}
export default AppUtils;