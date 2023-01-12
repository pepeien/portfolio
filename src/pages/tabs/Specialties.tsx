import React from 'react';
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
				name: 'Angular JS',
				level: 3,
			},
			{
				name: 'React JS',
				level: 5,
			},
			{
				name: 'Node JS',
				level: 5,
			},
			{
				name: 'Next JS',
				level: 2,
			},
		],
	},
	{
		name: 'Golang',
		level: 1,
	},
	{
		name: 'C++',
		level: 3,
		frameworks: [
			{
				name: 'Open CV',
				level: 1,
			},
			{
				name: 'Unreal Engine 4',
				level: 2,
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
			{
				name: 'Mongo',
				level: 1,
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
						name={speciality.name}
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
						<Specialty key={v4()} name={speciality.name} level={speciality.level} isFramework={true} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default SpecialtiesTab;
