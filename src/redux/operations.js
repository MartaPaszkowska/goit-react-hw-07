import { createAsyncThunk } from "@reduxjs/toolkit";
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
// redux/operations.js
axios.interceptors.request.use((request) => {
	console.log("Starting Request", request);
	return request;
});

axios.interceptors.response.use((response) => {
	console.log("Response:", response);
	return response;
});
