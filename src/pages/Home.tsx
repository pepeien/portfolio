import React, { useState, useRef, FormEvent } from 'react';

const Home = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [formStatus, setFormStatus] = useState<'waiting' | 'success' | 'error'>('waiting');
	const emailInputRef = useRef<HTMLInputElement>(null);
	const textInputRef = useRef<HTMLTextAreaElement>(null);

	const modalHandler = () => {
		setIsModalVisible(!isModalVisible);
	};

	const submitContactForm = (ev: FormEvent) => {
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
		<div className='home'>
			<div className='home__title'>
				<span>Coming </span>
				<div />
				<span>Soon</span>
			</div>
			<div className='home__footer'>
				<button className='home__footer-button' is-upward={new String(isModalVisible)} onClick={modalHandler}>
					<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 330 330'>
						<path
							d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
							l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
							C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
						/>
					</svg>
					<div />
				</button>
			</div>
			<div className='home__modal' is-active={new String(isModalVisible)} form-status={formStatus}>
				<div className='home__modal__content'>
					<form
						className='contact__form'
						onSubmit={submitContactForm}
						action={process.env.REACT_APP_FORM_SERVICE_URL}
						method='POST'
					>
						<div className='contact__form-title'>Contact</div>
						<div className='contact__form-input'>
							<label htmlFor='email'>Email</label>
							<input ref={emailInputRef} name='email' className='contact__form-email' type='email' />
						</div>
						<div className='contact__form-input'>
							<label htmlFor='message'>Message</label>
							<textarea
								ref={textInputRef}
								name='message'
								className='contact__form-message --box-shadowed'
							/>
						</div>
						<button className='contact__form-button --box-shadowed'>
							<span>Send</span>
							<div></div>
						</button>
					</form>
				</div>
				<div className='home__modal__footer' />
			</div>
		</div>
	);
};

export default Home;
