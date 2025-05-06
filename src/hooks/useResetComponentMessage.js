// Redux
import { resetMessage as resetPhotoMessage } from "../slices/photoSlice";
import { resetMessage as resetUserMessage } from "../slices/userSlice";

export const useResetComponentMessage = (dispatch, slice) => {
    const choseSlice = () => {
        if (slice == "user") {
            dispatch(resetUserMessage());
        } else if (slice === "photo") {
            dispatch(resetPhotoMessage());
        } else if (slice === "both") {
            dispatch(resetPhotoMessage());
            dispatch(resetUserMessage());
        } else {
            dispatch(resetPhotoMessage());
        }
    };

    return () => {
        setTimeout(() => {
            choseSlice();
        }, 2000);
    };
};
