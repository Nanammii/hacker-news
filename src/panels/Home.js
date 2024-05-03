import {Panel, PanelHeader, Header, Button, Group, List} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {NEWS_PER_PAGE} from "../const.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, fetchNewsDetails} from "../store/api-actions.js";
import {NewsItem} from "./news-item.js";

export const Home = ({ id, items }) => {
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch();
  const isLoadingNews = useSelector(state => state.news.isNewsLoading);
  const newsDetails = useSelector(state => state.news.newsDetails);
  console.log(newsDetails)


  const startIndex = (0 - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;
  const displayedNews = items.slice(startIndex, endIndex);

  const handleRefreshNews = () => {
    dispatch(fetchNews());
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshNews();
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, [items]);


  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <Group>
        <Button onClick={handleRefreshNews} disabled={isLoadingNews}>Обновить</Button>
      </Group>

      <Group header={<Header mode="secondary">Новости</Header>}>
        <List>
          {displayedNews.map((id) => {
            return <NewsItem key={id} id={id} />
          })}
        </List>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired
};
