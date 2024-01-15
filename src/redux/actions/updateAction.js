// import {CAP_NHAT_EMAIL, CAP_NHAT_ID} from '../reducers/infoReducer';
import {CAP_NHAT_EMAIL} from '../reducers/infoReducer'



export const updateEmail = (email) => async dispatch => {
    try {

        await console.log("Bat dau goi len sever");
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            },3000);
        });
        await console.log("DA CAP NHAT EMAIL LEN SEVER");

        dispatch({
            type: CAP_NHAT_EMAIL,
            email: email,
        })
    } catch (error) {
        console.log("Error: ",error);
    }
};