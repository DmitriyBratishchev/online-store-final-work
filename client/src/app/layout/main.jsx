import React from 'react';
import { Link } from 'react-router-dom';

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
            <h4>Frontend developer</h4>
            <p>
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
              Данный проект был создан для закрепления навыков, полученных при обучении.
            </p>
            <p className='paragraph'>
              Он разрабатывался с &ldquo;нуля&rdquo;: от создания локально пустой папки под проект до деплоя на удалённом сервере.
            </p>
            <p className='paragraph'>
              Для себя поставил первоочередную задачу так: &ldquo;Минимум оформления, акцент на работу с данными&rdquo;. Адаптив не делал совсем.
            </p>
            <p className="paragraph">
              Реализовано:
            </p>
          </div>
          <ul className='ms-5 mb-4'>
            <li>Взаимодействие frontend и backend с ипользованием библиотеки axios (методы get, post, put, puth, delete). А так же использование <code>axios.interceptors</code> для работы с токенами и логирования запросов frontend и ответов backend).</li>
            <li>Авторизация по accesstoken и refreshtoken. Ограничения на данном этапе касаются только запросов получения и изменения данных пользователя.</li>
            <li>Валидация на стороне клиента и сервера (на сервере только формы регистрации и входа)</li>
            <li>Хранение, редактирование и использование данных при помощи Redux (reduxjs/toolkit). <code>useDispatch(), useSelector()</code>.</li>
            <li>Отображение данных на frontend (карточки, изображения, корзина, избранное, пользователь ...)</li>
            <li>Сортировка реализована внутри компонента (состояние хранится в state). Перед отрисовкой список сортируется &ldquo;на лету&rdquo;.</li>
            <li>Пагинация. В следующих версиях дам пользователю возможность изменять количество товаров на странице.</li>
            <li>Состояние фильтров хранится в Redux (планирую фильтрацию перенести на сервер).</li>
            <li>drag-n-drop на странице администратора в поле для фотографий товара, изображения сохранят порядок в слайдере.</li>
            <li>Можно добавлять товары в корзину и избранное незарегестрированным пользователям, при регистрации всё сохраняется у нового пользователя, при входе &ndash; данные суммируются.</li>
            <li>Сайт заполняется через <Link to={ '/admin/catalog' }>админку</Link>, необходимо нажимать &ldquo;Сохранить&rdquo; для корректной работы.</li>
          </ul>
          <p className="paragraph">
            Планируется:
          </p>
          <ul className='ms-5 mb-4'>
            <li>Реализовать карточку конкретного товара, с рейтингом (1 пользователь &ndash; 1 оценка), с коментариями, возможно ещё с какой-то дополнительной информацией.</li>
            <li>Стилизация и адаптив. Варианты карточек (вертикальные, горизонтальные), стандартные элементы, анимации, паралакс ....</li>
            <li>Изменения по обратной связи (учту пожелания пользователей).</li>
          </ul>
          <div className="fs-5">
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
