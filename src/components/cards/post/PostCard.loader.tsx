import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCardLoader = () => {
    return (
        <div className='post-card' data-is-loading={true}>
            <div className='post-card__thumbnail'>
                <ContentLoader speed={3} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                    <rect rx='3' ry='3' width='100%' height='100%' />
                </ContentLoader>
            </div>
            <div className='post-card__data'>
                <h5>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </h5>
                <span>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </span>
            </div>
        </div>
    );
};

export default PostCardLoader;
