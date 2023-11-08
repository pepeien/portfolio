import React from 'react';

// Type
import { Post } from '../../../utils/interfaces';

// Context
import { LangContext } from '../../../context';

// Components
import PostCardLoader from './PostCard.loader';

export interface PostCardProps extends Post {
    isLoading?: boolean;
}

const PostCard = ({ id, title, description, isLoading }: PostCardProps) => {
    const [selectedLang, _] = React.useContext(LangContext);

    if (isLoading) {
        return <PostCardLoader />;
    }

    return (
        <div className='post-card' data-is-loading={isLoading}>
            <div className='post-card__thumbnail'>
                <img
                    src={`${
                        process.env.REACT_APP_GITHUB_CDN ?? ''
                    }/portfolio/master/.github/posts/${id}/thumbnail.png?raw=true`}
                />
            </div>
            <div className='post-card__data'>
                <div className='post-card__data__info'>
                    <h5>{title[selectedLang['LANGUAGE_LOCALE_URL']]}</h5>
                    <span>{description[selectedLang['LANGUAGE_LOCALE_URL']]}</span>
                </div>
                <div className='post-card__data__arrow'>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M4 12H20M20 12L16 8M20 12L16 16'
                            strokeWidth='1'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
