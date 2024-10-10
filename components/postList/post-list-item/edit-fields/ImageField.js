'use client';
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE, SET_FEATURED_IMAGE, CREATE_POST } from '@/graphql/mutations';
import { formatDateToWP } from '@/lib/calendar';
import { PostListContext } from '@/components/postList/PostList';

export const ImageField = () => {
  const { refetch, date } = useContext(PostListContext);
  const [file, setFile] = useState(null);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [createPost] = useMutation(CREATE_POST);
  const [setFeaturedImage] = useMutation(SET_FEATURED_IMAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    // Add blank post and get the new post id.
    const newPost = await createPost({
      variables: {
        input: {
          date: formatDateToWP(date),
          title: formatDateToWP(date),
          content: '',
          status: "PRIVATE",
          postFormats: {
            append: false,
            nodes: [
              { name: 'image' }
            ]
          }
        }
      }
    });

    const newPostId = newPost?.data?.createPost?.post?.postId;

    if (!newPostId) {
      return;
    }
    setFile(file[0]);

    // Upload the image.
    const { data } = await uploadImage({
      variables: { file },
    });

    const mediaItemId = data?.uploadImage?.mediaItem?.databaseId;

    // Set the featured image.
    await setFeaturedImage({
      variables: {
        "postId": newPostId,
        "imageId": mediaItemId
      },
    });

    // Reset the form.
    await refetch();
    setFile(null);
    setError(null);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="image-edit-form">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button type="submit" disabled={!file || loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ImageField;