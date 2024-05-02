import {Panel, PanelHeader, Header, Button, Group, List, ButtonGroup} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {NEWS_PER_PAGE} from "../const.js";
import {getPaginationNumbers} from "../utils/pagination-numbers.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, fetchNewsDetails} from "../store/api-actions.js";
import {NewsItem} from "./news-item.js";

export const Home = ({ id, items }) => {
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const countNews = items.length
  const numbers = getPaginationNumbers(currentPage, countNews);
  const isLoadingNews = useSelector(state => state.news.isNewsLoading);
  // const newsDetails = useSelector(state => state.news.newsDetails);


  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;
  const displayedNews = items.slice(startIndex, endIndex);

  const handleClickPage = (page) => {
    setCurrentPage(page);
  }

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
      <Group>
        <ButtonGroup align="center">
          {numbers.map((number, index) => (
            <Button
              key={index}
              onClick={() => handleClickPage(number)}
              mode={currentPage === number ? "primary" : "secondary"}
              disabled={number === null}
            >
              {number
                ? number
                : '...'
              }
            </Button>
          )) }
        </ButtonGroup>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired
};
