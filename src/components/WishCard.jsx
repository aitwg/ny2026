import React, { useState, useEffect } from 'react';

const WishCard = ({ wish, onCopy, onShare, isFavorite, onToggleFavorite }) => {
    const [showCopyNotice, setShowCopyNotice] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (wish) {
            setAnimating(true);
            const timer = setTimeout(() => setAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [wish]);

    const handleCopy = () => {
        onCopy(wish);
        setShowCopyNotice(true);
        setTimeout(() => setShowCopyNotice(false), 2000);
    };

    return (
        <div className={`wish-card-container ${animating ? 'animating' : ''}`}>
            <div className="wish-box">
                <div className="wish-content">
                    {wish ? wish : <span className="placeholder">點擊下方按鈕生成祝福...</span>}
                </div>

                {wish && (
                    <div className="wish-actions">
                        <button
                            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(wish)}
                            title={isFavorite ? "取消收藏" : "收藏"}
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                        <button className="action-btn copy-btn" onClick={handleCopy} title="複製">
                            📋
                        </button>
                        {navigator.share && (
                            <button className="action-btn share-btn" onClick={() => onShare(wish)} title="分享">
                                📤
                            </button>
                        )}
                    </div>
                )}

                {showCopyNotice && <div className="copy-notice">已複製到剪貼簿</div>}
            </div>
        </div>
    );
};

export default WishCard;
