// src/components/ContactList.jsx

import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContacts } from "../redux/contactsSlice";
import {
	selectContacts,
	selectLoading,
	selectError,
	selectFilter,
} from "../redux/selectors";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";
import { useEffect } from "react";

export default function ContactList() {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const filter = useSelector(selectFilter);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	const filteredContacts = Array.isArray(contacts)
		? contacts.filter((contact) =>
				contact.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: [];

	if (loading) {
		return <p>Loading contacts...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<ul className={css.contactList}>
			{filteredContacts.map((contact) => (
				<Contact
					key={contact.id}
					contact={contact}
					onDelete={() => dispatch(deleteContact(contact.id))}
				/>
			))}
		</ul>
	);
}
