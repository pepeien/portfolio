import React from 'react';
import { v4 } from 'uuid';

export interface SpecialtyProps {
    level: number;
    name: string;
    isFramework?: boolean;
    isSelectable?: boolean;
    isSelected?: boolean;
    wasSelected?: boolean;
    frameworks?: Omit<SpecialtyProps, 'isSelected' | 'isSelectable' | 'frameworks'>[];
    onClick?: () => void;
}

const Specialty = ({
    level,
    name,
    onClick,
    isFramework = false,
    isSelectable = true,
    isSelected = false,
    wasSelected = false,
}: SpecialtyProps) => {
    const onButtonClick = () => {
        if (isSelectable && onClick) {
            onClick();
        }
    };

    const getAnimationDelayInSeconds = (index: number): number => {
        const roundedLevel = Math.round(level);
        const isLevelRound = roundedLevel % 2 === 0;
        const correctIndex = index + 1;

        const mid = Math.round(roundedLevel / 2);
        const median = isLevelRound
            ? (isSelectable && wasSelected) || isFramework
                ? [mid, mid + 1]
                : [1, level]
            : [mid, mid];

        if (correctIndex <= median[0]) {
            return Math.abs((correctIndex - median[0]) / 10);
        }

        return Math.abs((correctIndex - median[1]) / 10);
    };

    return (
        <button
            className={`specialty`}
            data-is-selected={(isSelectable && isSelected) || isFramework}
            data-was-selected={(isSelectable && wasSelected) || isFramework}
            onClick={onButtonClick}
        >
            <span className='specialty__name'>{name}</span>
            <div className='specialty__steps'>
                {Array(level)
                    .fill(0)
                    .map((_, index) => {
                        const delay = getAnimationDelayInSeconds(index);

                        return (
                            <div
                                key={v4()}
                                className='specialty__step'
                                style={{
                                    animationDelay: `${delay}s`,
                                }}
                            ></div>
                        );
                    })}
            </div>
        </button>
    );
};

export default Specialty;
