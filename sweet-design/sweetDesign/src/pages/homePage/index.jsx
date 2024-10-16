import React from 'react';
import './styles.css';
import Navbar from '../../components/navbar/index.jsx';
import i1 from './elegance.jpeg';
import i2 from './diversity.jpeg';
import i3 from './quality.jpeg';

import h1 from './h1.jpeg';
import h2 from './h2.jpeg';
import h3 from './h3.jpeg';
import h4 from './h4.jpeg';

import st1 from './star1.jpeg';
import st2 from './star2.jpeg';
import st3 from './star3.jpeg';
import st4 from './star4.jpeg';
import st5 from './star5.jpeg';

import f from './facebook.png';
import i from './instagram.png';
import y from './youtube.png';

const Home = () => {
    return (
        <>
            <Navbar/>

            <div className="hero-section">
                <h1 className="hero-title">Indulge in the Art of Sweetness</h1>
                <p className="hero-text">
                    Welcome to our bakery, where passion meets pastry! We create delightful treats using the finest
                    ingredients and innovative techniques, all while upholding our commitment to quality and
                    sustainability. Savor the love in every bite and celebrate the art of baking with us!
                </p>
                <div className="hero-images">
                    <div className="image-container">
                        <img src={i1} alt="Elegance"/>
                        <p className="writing">elegance</p>
                    </div>
                    <div className="image-container">
                        <img src={i2} alt="Diversity"/>
                        <p className="writing">diversity</p>
                    </div>
                    <div className="image-container">
                        <img src={i3} alt="Quality"/>
                        <p className="writing">quality</p>
                    </div>
                </div>
            </div>

            <div className="history-section">
                <h2 className="history-title">Our history</h2>
                <div className="history-content">
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h1} alt="Gabriela baking"/>
                        </div>
                        <div className="history-text">
                            <p>
                                Sweet Serenity was founded in 2000 by Gabriela Munteanu, a passionate baker with a
                                vision of creating a haven for dessert lovers in Bucharest. Inspired by her
                                grandmother's traditional recipes and her own desire to innovate, Gabriela opened the
                                bakery in a quaint neighborhood filled with charm and history.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h2} alt="Cupcakes and treats"/>
                        </div>
                        <div className="history-text">
                            <p>
                                From the very beginning, Sweet Serenity focused on creating a menu that highlighted both
                                classic Romanian pastries and modern delights. Gabriela's signature item, the "Serenity
                                Cake," a rich chocolate layer cake with raspberry filling, quickly became a beloved
                                favorite among locals. The bakery also offered a wide variety of cupcakes, cookies, and
                                seasonal treats, making it a go-to spot for birthdays and celebrations.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h3} alt="Bakery interior"/>
                        </div>
                        <div className="history-text">
                            <p>
                                As the bakery gained popularity, Gabriela's sister, Maria, joined the team, bringing her
                                expertise in design and decoration. Together, they transformed Sweet Serenity into a
                                visually stunning space filled with beautiful, whimsical decor, where customers could
                                enjoy their sweet treats in a serene atmosphere.
                            </p>
                        </div>
                    </div>
                    <div className="history-block">
                        <div className="history-image">
                            <img src={h4} alt="Bakery atmosphere"/>
                        </div>
                        <div className="history-text">
                            <p>
                                Over the years, Sweet Serenity became more than just a bakery; it evolved into a beloved
                                community hub, where friendships blossomed over shared desserts and laughter. Today, the
                                bakery continues to thrive, with Gabriela and Maria at the helm, dedicated to creating
                                sweet moments for all who visit, ensuring that every treat is a taste of serenity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="most-wanted-section">
                <h2 className="wanted-title">Our most wanted</h2>
                <div className="product-gallery">
                    <div className="product-item">
                        <img src={st1} alt="Product 1"/>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="product-item">
                        <img src={st2} alt="Product 2"/>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="product-item">
                        <img src={st3} alt="Product 3"/>
                        <div className="stars">⭐⭐⭐⭐</div>
                    </div>
                    <div className="product-item">
                        <img src={st4} alt="Product 4"/>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="product-item">
                        <img src={st5} alt="Product 5"/>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
            </div>


            <footer className="footer">
                <div className="social-icons">
                    <a href="#"><img src={f} alt="Facebook"/></a>
                    <a href="#"><img src={i} alt="Instagram"/></a>
                    <a href="#"><img src={y} alt="YouTube"/></a>
                </div>
            </footer>
        </>
    );
};

export default Home;
