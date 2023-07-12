import React, { useEffect } from 'react';
import { v4 } from 'uuid';

//Components
import { Specialty, SpecialtyProps } from '../../components';

//Context
import { LangContext } from '../../context';

const SpecialtiesList: SpecialtyProps[] = [
	{
		name: 'Javascript / Typescript',
		level: 5,
		frameworks: [
			{
				name: 'Angular',
				level: 5,
			},
			{
				name: 'React',
				level: 5,
			},
			{
				name: 'Node / Express',
				level: 5,
			},
			{
				name: 'Socket IO',
				level: 5,
			},
		],
	},
	{
		name: 'Java',
		level: 5,
		frameworks: [
			{
				name: 'Spring Boot',
				level: 5,
			},
		],
	},
	{
		name: 'DB',
		level: 5,
		frameworks: [
			{
				name: 'MySQL',
				level: 5,
			},
			{
				name: 'Postgress',
				level: 5,
			},
			{
				name: 'Mongo',
				level: 5,
			},
		],
	},
	{
		name: 'SPECIALTY_TOOLS',
		level: 5,
		frameworks: [
			{
				name: 'Bash',
				level: 5,
			},
			{
				name: 'Docker',
				level: 5,
			},
			{
				name: 'NGINX',
				level: 5,
			},
			{
				name: 'Jira',
				level: 5,
			},
		],
	},
];

const SpecialtiesTab = () => {
	const [selectedLang, _] = React.useContext(LangContext);

	const [selectedSpecialty, setSelectedSpecialty] = React.useState<SpecialtyProps>(SpecialtiesList[0]);
	const [lastSelectedSpecialty, setLastSelectedSpecialty] = React.useState<SpecialtyProps>(SpecialtiesList[0]);

	const onMainSpecialtyClick = (speciality: SpecialtyProps) => {
		setLastSelectedSpecialty(selectedSpecialty);
		setSelectedSpecialty(speciality);
	};

	const sortSpecialtyByLevel = (a: SpecialtyProps, b: SpecialtyProps, isDescending = true): number => {
		if (isDescending) {
			return b.level - a.level;
		}

		return a.level - b.level;
	};

	return (
		<div className='specialties'>
			<div className='specialties__list'>
				<span className='specialties__sub-title'>{selectedLang['SPECIALTIES_MAIN_SKILL']}</span>
				{SpecialtiesList.sort(sortSpecialtyByLevel).map((speciality) => (
					<Specialty
						key={`${speciality.name}-${speciality.level}`}
						name={selectedLang[speciality.name] ?? speciality.name}
						level={speciality.level}
						isSelectable={true}
						isSelected={speciality.name === selectedSpecialty.name}
						wasSelected={speciality.name === lastSelectedSpecialty.name}
						onClick={() => onMainSpecialtyClick(speciality)}
					/>
				))}
			</div>
			{selectedSpecialty && selectedSpecialty.frameworks ? (
				<div className='specialties__list'>
					<span className='specialties__sub-title'>{selectedLang['SPECIALTIES_SUB_SKILL']}</span>
					{selectedSpecialty.frameworks.sort(sortSpecialtyByLevel).map((speciality) => (
						<Specialty
							key={v4()}
							name={selectedLang[speciality.name] ?? speciality.name}
							level={speciality.level}
							isFramework={true}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default SpecialtiesTab;
