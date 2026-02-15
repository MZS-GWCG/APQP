import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

const initialState = {
  items: [],
  currentItem: null,
  isLoading: false,
  isError: false,
  message: ''
};

// Get all items
export const getItems = createAsyncThunk(
  'items/getAll',
  async (epicId, thunkAPI) => {
    try {
      const url = epicId ? `/items?epicId=${epicId}` : '/items';
      const response = await api.get(url);
      return response.data.data.items;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get item by ID
export const getItemById = createAsyncThunk(
  'items/getById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data.data.item;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create item
export const createItem = createAsyncThunk(
  'items/create',
  async (itemData, thunkAPI) => {
    try {
      const response = await api.post('/items', itemData);
      return response.data.data.item;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update item
export const updateItem = createAsyncThunk(
  'items/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`/items/${id}`, data);
      return response.data.data.item;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete item
export const deleteItem = createAsyncThunk(
  'items/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/items/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const itemSlice = createSlice({
  name: 'items',
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
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  }
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
