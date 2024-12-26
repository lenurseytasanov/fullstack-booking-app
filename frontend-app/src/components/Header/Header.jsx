import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
	return (
		<>
			<div id="blurry-filter"></div>
			<header>
				<div>
					<article id="title">
						<span className="parent">Конструктор</span>
						<br />
						<span className="name">Создание анкеты</span>
					</article>
					<article id="reference">
						<nav className="nav">
							<input type="checkbox" className="nav__cb" id="menu-cb" />
							<div className="nav__content">
								<ul className="nav__items">
									<li className="nav__item">
										<Link to="/">
											<span className="nav__item-text">Главная</span>
										</Link>
									</li>
									<li className="nav__item">
										<span className="nav__item-text">О проекте</span>
									</li>
									<li className="nav__item">
										<span className="nav__item-text">Контакты</span>
									</li>
								</ul>
							</div>
							<label className="nav__btn" htmlFor="menu-cb"></label>
						</nav>
					</article>
				</div>
			</header>
		</>
	);
};

export default Header;