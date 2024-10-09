import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contactsSlice";
import { selectContacts, selectFilter } from "../redux/selectors";
import Contact from "./Contact";
import css from "../css/ContactList.module.css";

export default function ContactList() {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const filter = useSelector(selectFilter);

	const filteredContacts = Array.isArray(contacts)
		? contacts.filter((contact) =>
				contact.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: [];

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
