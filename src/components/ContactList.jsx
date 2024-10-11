import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/operations";
import {
	selectContacts,
	selectFilter,
	selectLoading,
	selectError,
} from "../redux/selectors";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";

export default function ContactList() {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const filter = useSelector(selectFilter);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		if (contacts.length === 0) {
			dispatch(fetchContacts());
		}
	}, [dispatch, contacts.length]);

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
