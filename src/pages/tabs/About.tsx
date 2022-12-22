import React from 'react';

// Context
import { LangContext } from '../../context';

const AboutTab = () => {
	const [selectedLang, _] = React.useContext(LangContext);

	const processText = (target: string, index: number) => {
		return (
			<span key={`${target[0]}-${index}`}>
				{target.split('*').map((text, index) => {
					if (text[0] === '-' && text[text.length - 1] === '-') {
						return (
							<span
								key={`${target[0]}-${index}-big-${index}`}
								className='about__text-big'
								style={{ color: '#00c896' }}
							>
								{text.substring(1, text.length - 1)}
							</span>
						);
					}

					return text;
				})}
			</span>
		);
	};

	return (
		<div className='about'>
			<div className='about__text'>
				{selectedLang['ABOUT_TEXT'].split('||').map((aboutText, index) => {
					return processText(aboutText, index);
				})}
			</div>
		</div>
	);
};

export default AboutTab;
