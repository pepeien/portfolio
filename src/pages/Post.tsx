import React from 'react';
import Markdown from 'react-markdown';

const PostPage = () => {
    const [postData, setPostData] = React.useState<string>('');

    React.useEffect(() => {
        fetch('../en-us.md')
            .then((res) => res.text())
            .then((data) => {
                setPostData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='markdown-body'>
            <Markdown remarkPlugins={[remarkGfm]}>{postData}</Markdown>
        </div>
    );
};

export default PostPage;
