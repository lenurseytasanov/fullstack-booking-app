import React from 'react';
import Header from '../Header/Header';
import './contacts.scss';

const TeamMember = ({ image, position, name, description, vkLink }) => {
	return (
	  <div className="team-member">
		 <div className="team-member__content">
			<div className="team-member__avatar" style={{ backgroundImage: `url(${image})` }} />
			<div className="team-member__info">
			  <p className="team-member__position">{position}</p>
			  <p className="team-member__name">ФИО: {name}</p>
			  <p className="team-member__description">{description}</p>
			</div>
		 </div>
		 <a 
			href={vkLink} 
			target="_blank" 
			rel="noopener noreferrer" 
			className="team-member__icon"
		 >
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.71C13.86 13.77 13.46 13.67 13.24 13.67C12.93 13.67 12.84 13.76 12.84 14.18V15.77C12.84 16.07 12.72 16.27 11.82 16.27C10.1 16.27 8.19 15.28 6.84 13.37C4.85 10.61 4.19 8.49 4.19 8.16C4.19 7.99 4.27 7.83 4.6 7.83H6.07C6.39 7.83 6.5 7.97 6.63 8.31C7.39 10.39 8.67 12.23 9.24 12.23C9.43 12.23 9.52 12.14 9.52 11.67V9.37C9.46 8.52 8.96 8.44 8.96 8.14C8.96 8.01 9.07 7.83 9.26 7.83H11.65C11.92 7.83 12.03 7.97 12.03 8.29V11.22C12.03 11.49 12.16 11.6 12.25 11.6C12.43 11.6 12.59 11.49 12.91 11.17C13.97 10.01 14.73 8.23 14.73 8.23C14.82 8.03 14.97 7.84 15.29 7.84H16.76C17.17 7.84 17.25 8.04 17.17 8.31C16.99 9.06 15.4 11.34 15.4 11.34C15.25 11.59 15.19 11.71 15.4 11.97C15.56 12.17 16.05 12.59 16.38 12.97C17.01 13.69 17.5 14.31 17.63 14.71C17.78 15.11 17.58 15.27 17.19 15.27L18.15 16.27Z"/>
			</svg>
		 </a>
	  </div>
	);
 };

const Contacts = () => {
	const teamMembers = [
		{
			image: "https://shkola4pytyax-r86.gosweb.gosuslugi.ru/netcat_files/8/168/w_200.jpg",
			position: "Аналитик",
			name: "Анастасия Филиппова",
			description: "Анализ требований проекта, предоставление исследований и решений на основе данных.",
			vkLink: "https://vk.com/qellwlq"
		},
		{
			image: "https://shkola4pytyax-r86.gosweb.gosuslugi.ru/netcat_files/8/168/w_200.jpg",
			position: "Дизайнер",
			name: "Карина Заманова",
			description: "Разработка плавного и интуитивно понятного дизайна сайта.",
			vkLink: "https://vk.com/youvsmy45"
		},
		{
			image: "https://sh71-ryazan-r62.gosweb.gosuslugi.ru/netcat_files/9/67/1649232769_58_vsegda_pomnim_com_p_pustoe_litso_foto_76.jpg",
			position: "Тимлид",
			name: "Данила Боков",
			description: "Руководство командой, управление сроками проекта и обеспечение его общего успеха.",
			vkLink: "https://vk.com/lovesickz"
		},
		{
			image: "https://sh71-ryazan-r62.gosweb.gosuslugi.ru/netcat_files/9/67/1649232769_58_vsegda_pomnim_com_p_pustoe_litso_foto_76.jpg",
			position: "Frontend-разработчик",
			name: "Дмитрий Еремеев",
			description: "Разработка интерфейса веб-приложения, обеспечивающего отзывчивый и интерактивный дизайн.",
			vkLink: "https://vk.com/fulprimitiv"
		},
		{
			image: "https://sh71-ryazan-r62.gosweb.gosuslugi.ru/netcat_files/9/67/1649232769_58_vsegda_pomnim_com_p_pustoe_litso_foto_76.jpg",
			position: "Backend-Разработчик",
			name: "Ленур Сейтасанов",
			description: "Разработка бэкенда веб-приложения, обеспечивающего надежное управление данными.",
			vkLink: "https://vk.com/id743894145"
		}
	];

	return (
		<div className="contacts">
			<Header />
			<div className="contacts__container">
				<div className="contacts__content">
					<div className="contacts__tools">
						<a
							href="https://www.figma.com/design/rLwNUsdJAyQxOFWO6j7DnZ/Project?node-id=637-201"
							target="_blank"
							rel="noopener noreferrer"
							className="tool-card"
						>
							<div className="tool-card__icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
									<path d="M184,96a40,40,0,0,0-24-72H88A40,40,0,0,0,64,96a40,40,0,0,0,1.37,65A44,44,0,1,0,136,196V160a40,40,0,1,0,48-64Zm0-32a24,24,0,0,1-24,24H136V40h24A24,24,0,0,1,184,64ZM64,64A24,24,0,0,1,88,40h32V88H88A24,24,0,0,1,64,64Zm24,88a24,24,0,0,1,0-48h32v48H88Zm32,44a28,28,0,1,1-28-28h28Zm40-44a24,24,0,1,1,24-24A24,24,0,0,1,160,152Z" />
								</svg>
							</div>
							<h2>Figma</h2>
						</a>
						<a
							href="https://github.com/lenurseytasanov/fullstack-booking-app"
							target="_blank"
							rel="noopener noreferrer"
							className="tool-card"
						>
							<div className="tool-card__icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
									<path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
								</svg>
							</div>
							<h2>Github</h2>
						</a>
					</div>


					<h2 className="contacts__title">Команда</h2>

					<div className="team-list">
						{teamMembers.map((member, index) => (
							<TeamMember
								key={index}
								image={member.image}
								position={member.position}
								name={member.name}
								description={member.description}
								vkLink={member.vkLink}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
