'use client';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LinkIcon from '@mui/icons-material/Link';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export const NewItemSwitcher = ({
    postFormatCallback
}) => {
    const handlePostFormat = (e, format) => {
        if ( e.key === 'Enter' || e.type === 'touchend' || e.type === 'click' ) {
            postFormatCallback(format);
        }
    }
    return (
        <div className="post-list__actions">
             <button
                className="post-list__action-button"
            >
                <TextFieldsIcon 
                    onClick={ (e)=>handlePostFormat(e, 'standard') } 
                    onKeyDown={ (e)=>handlePostFormat(e, 'standard') }
                    onTouchEnd={ (e)=>handlePostFormat(e, 'standard') }
                    className="post-list__icon"
                />
            </button>
            <button
                className="post-list__action-button"
            >
                <PhotoCameraIcon 
                    onClick={ (e)=>handlePostFormat(e, 'image') } 
                    onKeyDown={ (e)=>handlePostFormat(e, 'image') }
                    onTouchEnd={ (e)=>handlePostFormat(e, 'image') }
                    className="post-list__icon"
                />
            </button>
            <button
                className="post-list__action-button"
            >
                <LinkIcon
                    onClick={ (e)=>handlePostFormat(e, 'link') } 
                    onKeyDown={ (e)=>handlePostFormat(e, 'link') }
                    onTouchEnd={(e)=>handlePostFormat(e, 'link') }
                    className="post-list__icon"
                 />
            </button>
           
        </div>
    );
}

export default NewItemSwitcher;