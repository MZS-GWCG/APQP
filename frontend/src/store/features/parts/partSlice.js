import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

const initialState = {
  parts: [],
  currentPart: null,
  isLoading: false,
  isError: false,
  message: ''
};

// Get all parts
export const getParts = createAsyncThunk(
  'parts/getAll',
  async (projectId, thunkAPI) => {
    try {
      const url = projectId ? `/parts?projectId=${projectId}` : '/parts';
      const response = await api.get(url);
      return response.data.data.parts;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get part by ID
export const getPartById = createAsyncThunk(
  'parts/getById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/parts/${id}`);
      return response.data.data.part;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create part
export const createPart = createAsyncThunk(
  'parts/create',
  async (partData, thunkAPI) => {
    try {
      const response = await api.post('/parts', partData);
      return response.data.data.part;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update part
export const updatePart = createAsyncThunk(
  'parts/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/parts/${id}`, data);
      return response.data.data.part;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete part
export const deletePart = createAsyncThunk(
  'parts/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/parts/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const partSlice = createSlice({
  name: 'parts',
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
      .addCase(getParts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.parts = action.payload;
      })
      .addCase(getParts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPartById.fulfilled, (state, action) => {
        state.currentPart = action.payload;
      })
      .addCase(createPart.fulfilled, (state, action) => {
        state.parts.push(action.payload);
      })
      .addCase(updatePart.fulfilled, (state, action) => {
        const index = state.parts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.parts[index] = action.payload;
        }
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        state.parts = state.parts.filter(p => p.id !== action.payload);
      });
  }
});

export const { reset } = partSlice.actions;
export default partSlice.reducer;
