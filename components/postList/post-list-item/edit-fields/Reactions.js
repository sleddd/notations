import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation } from '@apollo/client';
import { UPDATE_POST_META } from '@/graphql/mutations';

// Favorites is post meta notations_favorites [{ value: 1, name: 'user.name' }]

export const Reactions = ({ }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
        if ( isFavorited ) {
            // Addfavorite.
        }
        if ( !isFavorited ) {
            // Remove favorite.
        }
        // Update post meta.
        // TODO: Setup GQL to handle post meta in queries and mutations.
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