'use client';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST, DELETE_COLLECTION, ADD_COLLECTION, UPDATE_POST } from '@/graphql/mutations';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { PostListContext } from '@/components/postList/PostList';

export const ItemEditActions = ({
    postid,
    postCollections,
    setIsEditing
}) => {
    const { collections, refetch } = useContext(PostListContext);
    const [showCollections, setShowCollections] = useState(false);
    const [newCollection, setNewCollection] = useState('');
    const [toggleEditActions, setToggleEditActions] = useState(false);
    const [deletePost] = useMutation(DELETE_POST);
    const [deleteCollection] = useMutation(DELETE_COLLECTION);
    const [addCollection] = useMutation(ADD_COLLECTION);
    const [updatePost] = useMutation(UPDATE_POST);
    const postCollectionSlugs = postCollections?.map(({ slug }) => slug);

    const handleEdit = () => {
        setIsEditing('editing');
        setToggleEditActions(false);
    }

    const handleDelete = async () => {
        await deletePost({
            variables: {
                input: {
                    id: postid
                }
            }
        });
        await refetch();
        setToggleEditActions(false);
    }

    const addToCollection = async (collectionSlug) => {
        const collection = collectionSlug?.length ? collectionSlug : 'bookmarks';

        await updatePost({
            variables: {
                input: {
                    id: postid,
                    collections: {
                        nodes: [
                            { slug: collection }
                        ],
                        append: true,
                    }
                }
            }
        });
        await refetch();
        setShowCollections(false);
        setToggleEditActions(false);
    }

    const removeFromCollection = async (collectionSlug) => {        
        const newPostCollectionSlugs = postCollectionSlugs.includes(collectionSlug) ? postCollectionSlugs.filter(slug => slug !== collectionSlug) : [...postCollectionSlugs, collectionSlug];

        await updatePost({
            variables: {
                input: {
                    id: postid,
                    collections: {
                        nodes: newPostCollectionSlugs.map(slug => ({ slug: slug })),
                        append: false
                    }
                }
            }
        });
        await refetch();
        setShowCollections(false);
        setToggleEditActions(false);
    }

    const addNewCollection = async (e) => {
        e.preventDefault();
        // Remove all tags from newCollection.
        const name = newCollection.replace(/<[^>]*>?/gm, '').replace(/[^a-zA-Z0-9-]/g, '');
        // Prep slug.
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        await addCollection({
            variables: {
                input: {
                    name: name,
                    slug: slug
                }
            }
        });
        await refetch();
        await addToCollection(slug);
        setShowCollections(false);
        setToggleEditActions(false);
    }

    const blankEventHandler = () => {
        setToggleEditActions(false);
    }

    return (
        <>
            <button
                className="post-list__item__actions-button"
                onClick={() => setToggleEditActions(!toggleEditActions)}
            >...</button>
            {toggleEditActions &&
                <ul className="post-list__item__actions">
                    <li className="bookmark">
                        <span
                            className="bookmark__label"
                            onClick={() => setShowCollections(!showCollections)}>
                            { postCollectionSlugs?.length ? <BookmarkIcon />  :  <BookmarkBorderIcon /> } 
                            Add to Collection
                        </span>
                        {showCollections &&
                            <>
                                <ul key={`collections-${postid}`} role="menu" className="collections">
                                    {collections?.map(({ collectionid, name, slug }) => (
                                        <li
                                            role="button"
                                            key={collectionid}
                                            onClick={() => addToCollection(slug)}
                                        >
                                            {name}
                                            {postCollectionSlugs.includes(slug) &&
                                                <span
                                                    className="collections--remove"
                                                    onClick={() => removeFromCollection(slug)}
                                                >
                                                x</span>
                                            }
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={(e) => addNewCollection(e)}>
                                    <input
                                        type="text"
                                        placeholder="Add to New Collection"
                                        value={newCollection}
                                        onChange={(e) => setNewCollection(e.target.value)}
                                    />
                                </form>
                            </>}
                    </li>
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                    <li className="migrating">Make Migrate</li>
                    <li onClick={blankEventHandler}>Make Public</li>
                    <li onClick={blankEventHandler}>Share Public Link</li>
                </ul>
            }
        </>
    );
}

export default ItemEditActions;
