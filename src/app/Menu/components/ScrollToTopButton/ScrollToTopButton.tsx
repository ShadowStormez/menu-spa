import { useEffect, useState } from 'react';
import { ScrollToTopButtonStyle } from './ScrollToTopButton.style';
import { ArrowTop } from '@/app/assets/icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ScrollToTopButtonStyle>
        <button
            onClick={scrollToTop}
            className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            <ArrowTop width={25} height={25} stroke=" var(--secondary-color)"/>
        </button>
        </ScrollToTopButtonStyle>
    );
};

export default ScrollToTopButton;
