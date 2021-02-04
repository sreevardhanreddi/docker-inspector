import jwtDecode from "jwt-decode";

export const verifyJwtToken = (token) => {
    try {
        const decodedInfo = jwtDecode(token);
        if (Date.now() <= decodedInfo.exp * 1000) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return false;
};