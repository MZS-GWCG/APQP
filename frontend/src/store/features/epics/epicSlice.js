import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

const initialState = {
  epics: [],
  currentEpic: null,
  isLoading: false,
  isError: false,
  message: ''
};

// Get all epics
export const getEpics = createAsyncThunk(
  'epics/getAll',
  async ({ projectId, partId } = {}, thunkAPI) => {
    try {
      let url = '/epics?';
      if (projectId) url += `projectId=${projectId}&`;
      if (partId) url += `partId=${partId}`;
      const response = await api.get(url);
      return response.data.data.epics;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get epic by ID
export const getEpicById = createAsyncThunk(
  'epics/getById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/epics/${id}`);
      return response.data.data.epic;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create epic
export const createEpic = createAsyncThunk(
  'epics/create',
  async (epicData, thunkAPI) => {
    try {
      const response = await api.post('/epics', epicData);
      return response.data.data.epic;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update epic
export const updateEpic = createAsyncThunk(
  'epics/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/epics/${id}`, data);
      return response.data.data.epic;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete epic
export const deleteEpic = createAsyncThunk(
  'epics/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/epics/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const epicSlice = createSlice({
  name: 'epics',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEpics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEpics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.epics = action.payload;
      })
      .addCase(getEpics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEpicById.fulfilled, (state, action) => {
        state.currentEpic = action.payload;
      })
      .addCase(createEpic.fulfilled, (state, action) => {
        state.epics.push(action.payload);
      })
      .addCase(updateEpic.fulfilled, (state, action) => {
        const index = state.epics.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.epics[index] = action.payload;
        }
      })
      .addCase(deleteEpic.fulfilled, (state, action) => {
        state.epics = state.epics.filter(e => e.id !== action.payload);
      });
  }
});

export const { reset } = epicSlice.actions;
export default epicSlice.reducer;
