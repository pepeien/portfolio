'use client';

import React from 'react';

// Interface
import { Dictionary } from '@utils/interfaces';

interface Props {
    dictionary: Dictionary;
}

export default function Component({ dictionary }: Props) {
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const textInputRef = React.useRef<HTMLTextAreaElement>(null);

    const [status, setStatus] = React.useState<string>('');

    const submitContactForm = (ev: React.FormEvent) => {
        ev.preventDefault();

        setStatus(dictionary['CONTACT_SENDING_MESSAGE']);

        const form = ev.target as HTMLFormElement;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.open(form.method, form.action);

        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status !== 200) {
                setStatus(dictionary['CONTACT_FAILURE_MESSAGE']);

                return;
            }

            form.reset();

            setStatus(dictionary['CONTACT_SUCCESS_MESSAGE']);
        };

        xhr.send(data);
    };

    return (
        <form
            className='contact__form --hidden-overflow-all'
            onSubmit={submitContactForm}
            onFocus={() => setStatus('')}
            action={process.env.NEXT_PUBLIC_FORM_SERVICE_URL}
            method='POST'
        >
            <div className='contact__form-input'>
                <label className='--color-ease-in' htmlFor='email'>
                    {dictionary['CONTACT_EMAIL_LABEL']}
                </label>
                <input
                    id='email'
                    ref={emailInputRef}
                    name='email'
                    className='contact__form-email'
                    type='email'
                />
            </div>
            <div className='contact__form-input'>
                <label className='--color-ease-in' htmlFor='message'>
                    {dictionary['CONTACT_MESSAGE_LABEL']}
                </label>
                <textarea
                    id='message'
                    ref={textInputRef}
                    name='message'
                    className='contact__form-message'
                />
            </div>
            <button className='contact__form-button'>
                <div className='contact__form-button__background --skewd-background' />
                <span className='--color-ease-in'>{dictionary['CONTACT_SEND_LABEL']}</span>
            </button>
            <div className='contact__form-status --flex-row'>
                <span>{status}</span>
            </div>
        </form>
    );
}
