'use client';
import { useState, useContext, useEffect } from "react";
import { UPDATE_POST } from "@/graphql/mutations";
import { signifiers } from "@/components/postList/post-list-item/signifiers";
import { useMutation } from "@apollo/client";
import { PostListContext } from "@/components/postList/PostList";

export const SignifierSwitcher = ({
    postid,
    postSignifiers
}) => {
    const [updatePost] = useMutation(UPDATE_POST);
    const [signifier, setSignifier] = useState({});
    const [toggleSignifiers, setToggleSignifiers] = useState(false);
    const { refetch } = useContext(PostListContext);

    useEffect(() => {
        const postSignifierSlug = postSignifiers.map(({ node }) => node.slug == 'uncategorized' ? 'task' : node.slug).toString();
        const postSignifierIcon = signifiers.find(signifier => signifier.slug === postSignifierSlug).icon;

        // Set post signifier.
        setSignifier({
            icon: postSignifierIcon,
            slug: postSignifierSlug
        });
    }, []);

    const handleCategorySelect = async (slug) => {
        await updatePost({
            variables: {
                input: {
                    id: postid,
                    categories: {
                        append: false,
                        nodes: [
                            { name: slug }
                        ]
                    }
                }
            }
        });
        setSignifier({
            icon: signifiers.find(signifier => signifier.slug === slug).icon,
            slug: slug
        });
        await refetch();
        setToggleSignifiers(false);
    }

    return (
        <div className="post-list__item__signifiers">
            <button onClick={() => setToggleSignifiers(!toggleSignifiers)}> {signifier.icon}</button>
            {toggleSignifiers &&
                <ul className="post-list__item__signifiers-selector">
                    {signifiers.map(signifier => {
                        return (
                            <li
                                key={signifier.slug}
                                role="button"
                                onClick={() => handleCategorySelect(signifier.slug)} >
                                {signifier.icon}
                            </li>
                        );
                    })}
                </ul>}
        </div>)
};

export default SignifierSwitcher;