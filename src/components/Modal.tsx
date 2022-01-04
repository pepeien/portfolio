import React, { useEffect } from 'react';

//Externals Types
import { ComponentAsProp } from '../utils/types';

//Internal Types
export type ModalStatus = 'waiting' | 'success' | 'error';

export type ModalBackgroundStyle = 'solid' | 'faded' | 'transparent';

export interface ModalProps {
	isVisible?: boolean;
	hasStatus?: boolean;
	modalStatus?: ModalStatus;
	backgroundStyle?: ModalBackgroundStyle;
	ContentComponent?: ComponentAsProp;
	onShow?: () => void;
}

const Modal = ({
	isVisible = false,
	hasStatus = false,
	modalStatus = 'waiting',
	backgroundStyle = 'transparent',
	ContentComponent,
	onShow,
}: ModalProps) => {
	const isStatusValid: boolean = hasStatus && modalStatus && modalStatus.length > 0;

	useEffect(() => {
		if (isVisible && onShow) {
			onShow();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	const getContentComponent = (ContentComponent: ComponentAsProp): React.ReactNode => {
		if (typeof ContentComponent === 'function') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			return ContentComponent() as React.ReactNode;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return ContentComponent;
	};

	return (
		<div
			className='modal'
			is-active={new String(isVisible)}
			form-status={isStatusValid ? modalStatus : undefined}
			background-style={backgroundStyle}
		>
			<div className='modal__content'>{ContentComponent ? getContentComponent(ContentComponent) : null}</div>
			{isStatusValid ? <div className='modal__footer' /> : null}
		</div>
	);
};

export default Modal;
