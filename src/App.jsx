import React, { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import { wishes } from './data/wishes'
import CategorySelector from './components/CategorySelector'
import WishCard from './components/WishCard'

function App() {
    const [wish, setWish] = useState('')
    const [category, setCategory] = useState('family')
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('cny_favorites')
        return saved ? JSON.parse(saved) : []
    })
    const [showFavorites, setShowFavorites] = useState(false)

    useEffect(() => {
        localStorage.setItem('cny_favorites', JSON.stringify(favorites))
    }, [favorites])

    const generateWish = () => {
        const categoryWishes = wishes[category]
        const randomIndex = Math.floor(Math.random() * categoryWishes.length)
        setWish(categoryWishes[randomIndex])
        setShowFavorites(false)
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    const shareWish = async (text) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '新年祝福',
                    text: text,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        }
    }

    const toggleFavorite = (text) => {
        if (favorites.includes(text)) {
            setFavorites(favorites.filter(f => f !== text))
        } else {
            setFavorites([...favorites, text])
        }
    }

    return (
        <div className="container">
            <header>
                <h1>拜年文案產生器</h1>
                <h2>快速生成創意新年祝福語</h2>
                <p>為家人、朋友、同事送上最貼心的新年祝福！</p>
            </header>

            <main>
                <CategorySelector
                    currentCategory={category}
                    onSelectCategory={(cat) => {
                        setCategory(cat)
                        setShowFavorites(false)
                    }}
                />

                <div className="controls">
                    <button className="generate-btn" onClick={generateWish}>
                        生成祝福語
                    </button>

                    {favorites.length > 0 && (
                        <button
                            className="view-favorites-btn"
                            onClick={() => setShowFavorites(!showFavorites)}
                        >
                            {showFavorites ? '返回生成' : `查看收藏 (${favorites.length})`}
                        </button>
                    )}
                </div>

                {showFavorites ? (
                    <div className="favorites-list">
                        <h3>您的收藏列表</h3>
                        {favorites.map((fav, index) => (
                            <WishCard
                                key={index}
                                wish={fav}
                                onCopy={copyToClipboard}
                                onShare={shareWish}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                    <WishCard
                        wish={wish}
                        onCopy={copyToClipboard}
                        onShare={shareWish}
                        isFavorite={favorites.includes(wish)}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
            </main>

            <footer>
                <p>點擊按鈕，取得專屬新年祝福語。</p>
            </footer>
        </div>
    )
}

export default App
