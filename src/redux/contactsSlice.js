// src/redux/contactsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://670656a4a0e04071d2266a12.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (contact) => {
		const response = await axios.post(API_URL, contact);
		return response.data;
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (id) => {
		await axios.delete(`${API_URL}/${id}`);
		return id;
	}
);

const initialState = {
	items: [],
	loading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter(
					(contact) => contact.id !== action.payload
				);
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default contactsSlice.reducer;
