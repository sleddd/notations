import { UPDATE_POST } from "@/graphql/mutations";
import { signifiers } from "../signifiers";
import { useMutation } from "@apollo/client";

export const SignifiersSelect = ({
    slug,
    postId,
    icon,
    refetchPosts,
    setIsEditing,
    setActivePostId,
    setShowPostOptions
}) => {
    const [updatePost] = useMutation(UPDATE_POST);

    const handleCategorySelect = async (slug) => {
        await updatePost({
            variables: {
                input: {
                    id: postId,
                    categories: {
                        append: false,
                        nodes: [
                            { name: slug }
                        ]
                    }
                }
            }
        });
        await refetchPosts();
        setIsEditing(false);
        setActivePostId(null);
        setShowPostOptions(false);
    }

    return (<ul>
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
    </ul>)
};

export default SignifiersSelect;