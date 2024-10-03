import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { gql, useMutation } from '@apollo/client';
import { CREATE_MEDIA_ITEM, UPDATE_POST } from '@/graphql/mutations';

const ImageUploadComponent = ({ postId }) => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [createMediaItem] = useMutation(CREATE_MEDIA_ITEM);
  const [updatePost] = useMutation(UPDATE_POST);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const { data: mediaData } = await createMediaItem({
        variables: { file, title: file.name }
      });

      const mediaItemId = mediaData.createMediaItem.mediaItem.id;

      await updatePost({
        variables: { id, featuredImageId }
      });

      setFile(null);
      alert('Image uploaded and set as featured image successfully!');
    } catch (err) {
      setError('Error uploading image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <p>Please sign in to upload images.</p>;
  }
};