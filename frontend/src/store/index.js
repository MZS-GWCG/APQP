import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import projectReducer from './features/projects/projectSlice';
import clientReducer from './features/clients/clientSlice';
import partReducer from './features/parts/partSlice';
import epicReducer from './features/epics/epicSlice';
import itemReducer from './features/items/itemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    clients: clientReducer,
    parts: partReducer,
    epics: epicReducer,
    items: itemReducer
  }
});
