// Redux
import { resetMessage as resetPhotoMessage } from "../slices/photoSlice";
import { resetMessage as resetUserMessage } from "../slices/userSlice";

export const useResetComponentMessage = (dispatch, slice) => {
    return () => {
        setTimeout(() => {
            dispatch(
                slice == "photo" ? resetPhotoMessage() : resetUserMessage()
            );
        }, 2000);
    };
};
