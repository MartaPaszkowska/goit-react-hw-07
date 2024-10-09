import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addContact } from "../redux/operations";
import css from "../css/ContactForm.module.css";
import * as Yup from "yup";

const formatPhoneNumber = (value) => {
	if (!value) return value;
	const phoneNumber = value.replace(/[^\d]/g, "");
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 4) return phoneNumber;
	if (phoneNumberLength < 7) {
		return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
	}
	return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6, 10)}`;
};

const validationSchema = Yup.object({
	name: Yup.string()
		.min(3, "Too short")
		.max(50, "Too long")
		.required("Required"),
	phone: Yup.string()
		.matches(
			/^\d{3}-\d{3}-\d{4}$/,
			"Invalid phone number format (e.g. 123-456-7890)"
		)
		.required("Required"),
});

export default function ContactForm() {
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{ name: "", phone: "" }}
			validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				dispatch(addContact(values));
				resetForm();
			}}
		>
			{({ values, setFieldValue }) => (
				<Form className={css.formContainer}>
					<label htmlFor="name">Name</label>
					<Field
						type="text"
						name="name"
						placeholder="John Kowalski"
					/>
					<ErrorMessage name="name" component="div" />

					<label htmlFor="phone">Number</label>
					<Field
						type="text"
						name="phone"
						placeholder="123-456-7890"
						className={css.phoneInput}
						value={values.phone}
						onChange={(e) => {
							const formattedPhoneNumber = formatPhoneNumber(
								e.target.value
							);
							setFieldValue("phone", formattedPhoneNumber);
						}}
					/>

					<ErrorMessage name="phone" component="div" />

					<button type="submit">Add Contact</button>
				</Form>
			)}
		</Formik>
	);
}
