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
            photoData.id,
            token
        );

        if (data.errors) {
            return ThunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getPhoto = createAsyncThunk(
    "photo/getPhoto",
    async (id, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.getPhoto(id, token);

        return data;
    }
);

export const like = createAsyncThunk("photo/like", async (id, ThunkAPI) => {
    const token = ThunkAPI.getState().auth.user.token;

    const data = await photoService.like(id, token);

    if (data.errors) {
        return ThunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

export const comment = createAsyncThunk(
    "photo/comment",
    async (commentData, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.comment(
            { comment: commentData.comment },
            commentData.id,
            token
        );

        if (data.errors) {
            return ThunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getPhotos = createAsyncThunk(
    "photo/getAll",
    async (_, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.getPhotos(token);

        return data;
    }
);

export const searchPhotos = createAsyncThunk(
    "photo/search",
    async (query, ThunkAPI) => {
        const token = ThunkAPI.getState().auth.user.token;

        const data = await photoService.searchPhotos(query, token);

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
            })
            .addCase(getPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            })
            .addCase(like.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                const { photoId, userId } = action.payload;

                if (state.photo && state.photo._id === photoId) {
                    const likes = state.photo.likes || [];
                    const userLikeIndex = likes.indexOf(userId);

                    state.photo.likes =
                        userLikeIndex !== -1
                            ? likes.filter((id) => id !== userId)
                            : [...likes, userId];
                }

                state.photos = state.photos.map((photo) => {
                    if (photo._id === photoId) {
                        const likes = photo.likes || [];
                        const userLikeIndex = likes.indexOf(userId);

                        return {
                            ...photo,
                            likes:
                                userLikeIndex !== -1
                                    ? likes.filter((id) => id !== userId)
                                    : [...likes, userId],
                        };
                    }
                    return photo;
                });

                state.message = action.payload.message;
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                state.photo.comments.push(action.payload.comment);

                state.message = action.payload.message;
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(searchPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            });
    },
});

export const { resetMessage } = photoSlice.actions;

export default photoSlice.reducer;
