import React from 'react';
import { v4 } from 'uuid';

//Components
import { Specialty, SpecialtyProps } from '../../components';

//Context
import { LangContext } from '../../context';

const SpecialtiesList: SpecialtyProps[] = [
	{
		name: 'Javascript',
		level: 5,
		frameworks: [
			{
				name: 'Angular',
				level: 3,
			},
			{
				name: 'React',
				level: 5,
			},
		],
	},
	{
		name: 'C++',
		level: 2,
		frameworks: [
			{
				name: 'Open CV',
				level: 1,
			},
		],
	},
	{
		name: 'Java',
		level: 3,
		frameworks: [
			{
				name: 'Spring Boot',
				level: 3,
			},
		],
	},
	{
		name: 'SQL',
		level: 3,
		frameworks: [
			{
				name: 'MySQL',
				level: 3,
			},
			{
				name: 'Postgress',
				level: 1,
			},
		],
	},
];

const SpecialtiesTab = () => {
	const [selectedLang, _] = React.useContext(LangContext);

	const [selectedSpecialty, setSelectedSpecialty] = React.useState<SpecialtyProps>(SpecialtiesList[0]);

	const onMainSpecialtyClick = (speciality: SpecialtyProps) => {
		setSelectedSpecialty(speciality);
	};

	return (
		<div className='specialties'>
			<div className='specialties__list'>
				<span className='specialties__sub-title'>{selectedLang['SPECIALTIES_MAIN_SKILL']}</span>
				{SpecialtiesList.map((speciality) => (
					<Specialty
						key={`${speciality.name}-${speciality.level}`}
						name={speciality.name}
						level={speciality.level}
						isSelected={speciality.name === selectedSpecialty.name}
						onClick={() => onMainSpecialtyClick(speciality)}
					/>
				))}
			</div>
			{selectedSpecialty && selectedSpecialty.frameworks ? (
				<div className='specialties__list'>
					<span className='specialties__sub-title'>{selectedLang['SPECIALTIES_SUB_SKILL']}</span>
					{selectedSpecialty.frameworks.map((speciality) => (
						<Specialty key={v4()} name={speciality.name} level={speciality.level} isSelectabale={false} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default SpecialtiesTab;
