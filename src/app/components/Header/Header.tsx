import { useEffect, useState } from 'react';
import './Header.css';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        // Показываем хедер сразу после загрузки страницы
        setIsVisible(true);

        const handleScroll = () => {
            const scrolled = window.scrollY;
            // Если скролл больше 70 пикселей, добавляем блюр и меняем обводку
            if (scrolled > 70) {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`Header ${isVisible ? 'show' : ''} ${isBlurred ? 'blurred' : ''}`}>
            <a href='/' className="logo">
                <img src="/ft.svg" />
            </a>

            <div className="nav">
                <a href="/AboutUs" className="nav-item">About Us</a>
                <a className="nav-item">Subscribe</a>
                <a href="/" className="nav-item">Home</a>
                <a href="/auth" className="nav-item">Login</a>
            </div>
        </header>
    );
}
