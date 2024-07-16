import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import IntroPost from '../components/IntroPost';
import Blogs from '../components/Blogs';
import useGetBlogsByTags from '@/hooks/useGetBlogsByTags';
import { BlogPost } from '@/types';
import { useTags } from '@/context/tagsContext';

const Home: React.FC = () => {
    const { state } = useTags();
    const [search, setSearch] = useState('');
    const [introPostId, setIntroPostId] = useState<string | null>(null);
    const {
        BlogsByTags,
        GetBLogsByTagErrorMessage,
        getBlogsByTags,
        GetBLogsByTagLoading
    } = useGetBlogsByTags();

    useEffect(() => {
        getBlogsByTags(state.activeTag);
    }, [state.activeTag]);

    const pickBlogForIntroPost = (blogs: BlogPost[]): BlogPost | undefined => {
        const lenBlog = blogs.length;
        if (lenBlog === 0) return undefined;

        const indexPicker = Math.floor(Math.random() * lenBlog);
        return blogs[indexPicker];
    };

    const filteredBlogs = BlogsByTags.filter((blog: { title: string }) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const introPost = search
        ? filteredBlogs[0]
        : pickBlogForIntroPost(BlogsByTags);

    useEffect(() => {
        if (introPost) {
            setIntroPostId(introPost.id);
        } else {
            setIntroPostId(null);
        }
    }, []);

    const blogsToShow = filteredBlogs.filter(
        (blog: { id: string | null }) => blog.id !== introPostId
    );

    if (GetBLogsByTagLoading) {
        return <p>Loading...</p>;
    }

    if (GetBLogsByTagErrorMessage) {
        return <p>Error: {GetBLogsByTagErrorMessage}</p>;
    }

    return (
        <div>
            <SearchBar setSearch={setSearch} />
            {introPost && <IntroPost post={introPost} />}
            <Blogs posts={blogsToShow} />
        </div>
    );
};

export default Home;
