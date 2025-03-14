import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: null,
    success: false,
    loading: false,
    message: null,
};

export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token);

        if (data.errors) {
            return ThunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getUserPhotos = createAsyncThunk(
    "photos/userPhotos",
    async (id, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        return data;
    }
);

export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async (id, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id, token);

        if (data.errors) {
            return ThunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const updatePhoto = createAsyncThunk(
    "photo/update",
    async (photoData, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto(
            { title: photoData.title },
            photoData._id,
            token
        );

        if (data.errors) {
            return ThunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso";
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
            .addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.photos = state.photos.filter((photo) => {
                    return photo._id !== action.payload.id;
                });

                state.message = action.payload.message;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.photos.map((photo) => {
                    if (photo._id === action.payload.photo._id) {
                        return (photo.title = action.payload.photo.title);
                    }
                    return photo;
                });

                state.message = action.payload.message;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            });
    },
});

export const { resetMessage } = photoSlice.actions;

export default photoSlice.reducer;
