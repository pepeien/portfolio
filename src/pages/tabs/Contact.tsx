import React from 'react';

// Components
import { ModalStatus } from '../../components/Modal';

const ContactTab = () => {
	const [formStatus, setFormStatus] = React.useState<ModalStatus>('waiting');
	const emailInputRef = React.useRef<HTMLInputElement>(null);
	const textInputRef = React.useRef<HTMLTextAreaElement>(null);

	const submitContactForm = (ev: React.FormEvent) => {
		ev.preventDefault();

		const form = ev.target as HTMLFormElement;
		const data = new FormData(form);
		const xhr = new XMLHttpRequest();

		xhr.open(form.method, form.action);

		xhr.setRequestHeader('Accept', 'application/json');

		xhr.onreadystatechange = () => {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;

			if (xhr.status === 200) {
				form.reset();

				setFormStatus('success');
			} else {
				setFormStatus('error');
			}
		};

		xhr.send(data);
	};

	return (
		<div>
			<form
				className='contact__form'
				onSubmit={submitContactForm}
				action={process.env.REACT_APP_FORM_SERVICE_URL}
				method='POST'
			>
				<div className='contact__form-input'>
					<label htmlFor='email'>Email</label>
					<input ref={emailInputRef} name='email' className='contact__form-email' type='email' />
				</div>
				<div className='contact__form-input'>
					<label htmlFor='message'>Message</label>
					<textarea ref={textInputRef} name='message' className='contact__form-message' />
				</div>
				<button className='contact__form-button'>
					<span>Send</span>
					<div></div>
				</button>
			</form>
		</div>
	);
};

export default ContactTab;
