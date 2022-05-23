import React from 'react';

const contacts = [
  {
    href: 'https://telegram.im/@DmitriyBratishchev',
    icon: 'telegram',
    text: '@DmitriyBratishchev'
  },
  {
    href: 'mailto:dmitriy-1008@yandex.ru',
    icon: 'envelope-open',
    text: 'dmitriy-1008@yandex.ru'
  },
  {
    href: 'tel:+79300112670',
    icon: 'telephone',
    text: '+7 (930) 011-26-70'
  },
  {
    href: 'https://github.com/DmitriyBratishchev?tab=repositories',
    icon: 'github',
    text: 'https://github.com/DmitriyBratishchev'
  }
];
const Main = () => {
  return (
    <div className='container w-100' style={ { background: '#eeeeee' } }>
      {/* <h2>Main</h2> */ }
      <div className='mx-auto py-4'>
        {/* <p>
          Тут будет общая информация ..... (м.б резюме, ссылки на проекты и др. личная информация)
        </p> */}
        <div className="d-flex">
          <div className="col-3 text-center">
            <img src="/image/myfoto.jpg" width={ '200' } alt="Фото" />
          </div>
          <div className='ms-4'>
            <h1>Frontend developer</h1>
            <h2>ReactJS(junior+/middle)</h2>
            <h2 className="text-uppercase ls-2">Дмитрий Братищев</h2>
            <p className="fs-4">
              <a href="https://yandex.ru/maps/-/CCUJIUE7SD" rel="noreferrer" target="_blank">
                <i className="bi bi-geo-alt-fill me-3"></i>
                Россия, г. Воронеж
              </a>
              <span className='ms-3 fs-5'>(не готов к переезду)</span>
            </p>
          </div>
        </div>
        <div className="d-flex border-bottom border-secondary border-2 pb-2">
          <ul className='list-group list-group-flush'>
            { contacts.map(contact => {
              const { href, icon, text } = contact;
              return (
                <li key={ href } className='list-group-item bg-transparent'>
                  <a href={ href } rel="noreferrer" target="_blank">
                    <i className={ 'bi fs-4 me-4 bi-' + icon }></i>
                    <span>{ text }</span>
                  </a>
                </li>
              );
            }) }
          </ul>
          <div className="ms-4">
            <h3 className="text-secondary fst-italic my-2 ms-2">Опыт работы</h3>
            <p>
              <h4>Frontend developer</h4>
              Digital agency aim | декабрь 2020 — настоящее время
            </p>
            <ul>
              <li>Разработка web-сайтов с использованием библиотеки ReactJS</li>
              <li>Добавление функционала и изменение существующих сайтов;</li>
              <li>Командная работа с дизайнерами, backend разработчиками, руководителями проектов (Jira, Figma, GitLab);</li>
            </ul>
          </div>
        </div>
        <section>
          <h2 className="text-center fs-1 fst-italic text-uppercase text-secondary mt-3">О проекте</h2>
          <div className="fs-5">
            <p className='paragraph'>
              Данный проект был создан для закрепления навыков, полученных при обучении. Он разрабатывался с &ldquo;нуля&rdquo;: от создания пустой папки под проект до деплоя на удалённом сервере.
            </p>
            <h3 className="paragraph fw-bold">
              Frontend
            </h3>
            <ul className='ms-5'>
              <li>
                React:
                <ul>
                  <li>Функциональные компоненты</li>
                  <li>PropTypes</li>
                  <li>Хуки</li>
                  <li>router-dom (v5.3.0)</li>
                  <li>Redux (reduxjs/toolkit)</li>
                  <li>Модули CSS</li>
                </ul>
              </li>
              <li>axios</li>
              <li>swiper (слайдер для фото товаров)</li>
              <li>rc-slider (диапазон цен товаров. Выбрал из-за широких возможностей стилизации и работы с данными)</li>
              <li>bootstrap v5, bootstrap-icons (первоначальная стилизация)</li>
              <li>eslint (настроил под себя)</li>
            </ul>
            <h3 className="paragraph fw-bold">
              Backend
            </h3>
            <ul className='ms-5'>
              <li>NodeJS</li>
              <li>Express</li>
              <li>jsonwebtoken (работа с токенами)</li>
              <li>mongoose (работа с MongoDB)</li>
            </ul>

          </div>
        </section>

      </div >
    </div >
  );
};

export default Main;
