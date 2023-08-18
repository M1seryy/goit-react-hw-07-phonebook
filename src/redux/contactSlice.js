import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNewContact, getAllContacts } from './apiRequests';
import { initialState } from './initialState';

export const getAllThunk = createAsyncThunk(
  'contacts/getAllContacts',
  async () => {
    return await getAllContacts();
  }
);
export const createNewThunk = createAsyncThunk('contacts/create', body => {
  return createNewContact(body);
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // [createNewThunk.pending]: state => {
    //   console.log('state: ', state);
    //   state.contacts.isLoading = true;
    // },
    [createNewThunk.fulfilled]: (state, { payload }) => {
      console.log('state: ', state);
      console.log('payload', payload);
      state.contacts.items.push(payload);
    },
    [getAllThunk.pending]: state => {
      state.contacts.isLoading = true;
      state.contacts.error = '';
    },
    [getAllThunk.fulfilled]: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.items = payload;
    },
    [getAllThunk.rejected]: (state, { payload }) => {
      state.contacts.isLoading = false;
      state.contacts.error = payload.message;
    },
  },
});

// reducers: {
//   fetching(state) {
//     console.log(state);
//     state.contacts.isLoading = true;
//     state.contacts.error = '';
//   },
//   success(state, { payload }) {
//     console.log(payload);
//     state.contacts.isLoading = false;
//     state.contacts.items.push(payload);
//   },
//   isRejected(state, { payload }) {
//     state.contacts.isLoading = false;
//     state.contacts.error = payload.message;
//   },
// addContact: {
//   reducer(state, action) {
//     state.contacts.push(action.payload);
//   },
//   prepare(obj) {
//     return {
//       payload: obj,
//     };
//   },
// },
//   deleteContact: {
//     reducer(state, action) {
//       const filteredArr = state.contacts.items.filter(
//         item => item.id !== action.payload
//       );
//       state.contacts.items = filteredArr;
//     },
//     prepare(id) {
//       return {
//         payload: id,
//       };
//     },
//   },
// },
export const { success, fetching, isRejected } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;