'use client';
import { useState, useEffect, useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation } from '@apollo/client';
import { UPDATE_POST_META } from '@/graphql/mutations';
import { useSession } from 'next-auth/react';

export const Reactions = ({ post }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [updatePostMeta] = useMutation(UPDATE_POST_META);
    const { data: session } = useSession();

    useEffect(() => {
        const postReactions = post?.meta?.find(reaction => reaction.key === 'notations_reactions')?.value?.split(',') || [];
        setReactions(postReactions);
        if (session?.user?.name && postReactions.includes(session?.user?.name)) {
            setIsFavorited(true);
        }
    }, [post]);

    const handleFavorite = async () => {
        if (!isFavorited) {
            const already_exists = reactions.includes(session?.user?.name);
            if (!already_exists) {
                const updatedReactions = [...reactions, session?.user?.name];
                setReactions(updatedReactions);
                await updatePostMeta({
                    variables: {
                        input: {
                            postId: post.postId,
                            metaKey: 'notations_reactions',
                            metaValue: updatedReactions.join(',')
                        }
                    }
                });
            }
            setIsFavorited(true);
        }
        if (isFavorited) {
            if (reactions.includes(session?.user?.name)) {
                const updatedReactions = reactions.filter(reaction => reaction !== session?.user?.name);
                setReactions(updatedReactions);
                await updatePostMeta({
                    variables: {
                        input: {
                            postId: post.postId,
                            metaKey: 'notations_reactions',
                            metaValue: updatedReactions.join(',')
                        }
                    }
                });
            }
            setIsFavorited(false);
        }
    }

    return (
        <div className="post-list__item--reactions">
            {isFavorited &&
                <FavoriteIcon
                    role="button"
                    onClick={(e) => handleFavorite(e)}
                    className="post-list__item--reactions__icon"
                />}
            {!isFavorited &&
                <FavoriteBorderIcon
                    role="button"
                    onClick={(e) => handleFavorite(e)}
                    className="post-list__item--reactions__icon"
                />}

        </div>
    );
}

export default Reactions;   