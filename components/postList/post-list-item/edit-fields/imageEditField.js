import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE, CREATE_BLANK_POST, SET_FEATURED_IMAGE } from '@/graphql/mutations';
import { formatDateToWP } from '@/lib/calendar';

export const ImageEditField = ({
  refetchPosts,
  addingImage,
  setAddingImage
}) => {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [createBlankPost] = useMutation(CREATE_BLANK_POST);
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

    const { data } = await uploadImage({
      variables: { file },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
      },
    });

    const mediaItemId = data?.uploadImage?.mediaItem?.databaseId;
    const newPostId   = addingImage;
    
    await setFeaturedImage({
      variables: {
        "postId": newPostId,
        "imageId": mediaItemId
      },
    });

    setAddingImage(false);
    setFile(null);
    setError(null);
    setLoading(false);
    refetchPosts();
  };

  if (!session) {
    return <p>Please sign in to upload images.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button type="submit" disabled={!file || loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ImageEditField;