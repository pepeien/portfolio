import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Context
import { LangContext } from '../context';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams();

    const [selectedLang, _] = React.useContext(LangContext);

    const [postData, setPostData] = React.useState<string>('');

    React.useEffect(() => {
        if (!id) {
            return;
        }

        fetch(
            `${
                process.env.REACT_APP_GITHUB_CDN ?? ''
            }/portfolio/master/.github/posts/${id.trim()}/${
                selectedLang['LANGUAGE_LOCALE_URL']
            }.md`,
        )
            .then((res) => res.text())
            .then((data) => {
                setPostData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!id) {
        return <main className='post --page --flex-column'></main>;
    }

    return (
        <main className='post --page --flex-column'>
            <section className='post__banner'>
                <div className='post__banner__wrapper'>
                    <div
                        className='post__banner__image'
                        style={{
                            backgroundImage: `url("${
                                process.env.REACT_APP_GITHUB_CDN ?? ''
                            }/portfolio/master/.github/posts/${id.trim()}/thumbnail.png")`,
                        }}
                    />
                </div>
            </section>
            <section className='post__content --flex-column'>
                <Markdown className='markdown-body --flex-column' rehypePlugins={[rehypeRaw]}>
                    {postData}
                </Markdown>
            </section>
        </main>
    );
};

export default PostPage;
