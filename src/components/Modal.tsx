import React from 'react';

//Types
import { ComponentAsProp } from '../utils/types';

//Services
import { extractPropComponent } from '../utils/services';

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

	React.useEffect(() => {
		if (isVisible && onShow) {
			onShow();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return (
		<div
			className='modal'
			is-active={new String(isVisible)}
			form-status={isStatusValid ? modalStatus : undefined}
			background-style={backgroundStyle}
		>
			<div className='modal__content'>{extractPropComponent(ContentComponent)}</div>
			{isStatusValid ? <div className='modal__footer' /> : null}
		</div>
	);
};

export default Modal;
