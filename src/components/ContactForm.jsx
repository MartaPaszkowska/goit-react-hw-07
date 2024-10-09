import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../redux/contactsSlice";
import css from "../css/ContactForm.module.css";

const validationSchema = Yup.object({
	name: Yup.string()
		.matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
		.min(3, "Too short")
		.max(50, "Too long")
		.required("Required"),
	number: Yup.string()
		.matches(
			/^[0-9\-]{7,}$/,
			"Number must contain at least 7 digits and may include dashes"
		)
		.required("Required"),
});

export default function ContactForm() {
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{ name: "", number: "" }}
			validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				dispatch(addContact(values));
				resetForm();
			}}
		>
			{() => (
				<Form className={css.formContainer}>
					<label htmlFor="name">Name</label>
					<Field type="text" name="name" />
					<ErrorMessage name="name" component="div" />

					<label htmlFor="number">Number</label>
					<Field type="text" name="number" />
					<ErrorMessage name="number" component="div" />

					<button type="submit">Add Contact</button>
				</Form>
			)}
		</Formik>
	);
}
