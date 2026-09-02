import './ImageView.scss';
import { Images } from '../data/Images.js';

function FantasyImage({ admin }) {
    if (!Images[Number(admin.imageViewId)].path) {
        return <div className="fantasy-image-placeholder">Изображение не выбрано</div>;
    }

    return (
        <div className="image-view-page">
            <div className="fantasy-image-wrapper">
                
                <img
                    src={Images[Number(admin.imageViewId)].path}
                    alt={Images[Number(admin.imageViewId)].name}
                    className="fantasy-image"
                />
                <h3>{Images[Number(admin.imageViewId)].name}</h3>
            </div>

        </div>
    );
}

export default FantasyImage