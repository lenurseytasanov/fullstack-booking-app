import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = ({ title = { parent: "Навигация", name: "О нашей команде" } }) => {
	return (
		<>
			<div id="blurry-filter"></div>
			<header>
				<div>
					<article id="title">
						<span className="parent">{title.parent}</span>
						<br />
						<span className="name">{title.name}</span>
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
										<a
											href="https://teamproject.urfu.ru/#/bcb5c00e-babb-4e6e-a0fe-e821add8101d/about"
											target="_blank"
											rel="noopener noreferrer"
											className="nav__item-text"
										>
											О проекте
										</a>
									</li>
									<li className="nav__item">
										<Link to="/contacts">
											<span className="nav__item-text">Контакты</span>
										</Link>
									</li>
								</ul>
							</div>
							<label className="nav__btn" htmlFor="menu-cb"></label>
						</nav>
					</article>
				</div>
			</header >
		</>
	);
};

export default Header;