import {Panel, PanelHeader, Header, Button, Group, List, Spinner} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import {useCallback, useEffect} from "react";
import {NEWS_PER_PAGE} from "../const.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchNews, fetchNewsDetails} from "../store/api-actions.js";
import {NewsItem} from "./news-item.js";

export const Home = ({id, items}) => {

  const dispatch = useDispatch();
  const isLoadingNews = useSelector(state => state.news.isNewsLoading);
  const newsDetails = useSelector(state => state.news.newsDetails);
  const isLoadingDetailsNews = useSelector(state => state.news.isDetailsLoading);

  const handleRefreshNews = useCallback(() => {
    dispatch(fetchNews());
  });

  useEffect(() => {
    if (items.length > 0 && newsDetails.length === 0) {
      items.map(id => {
        if (!newsDetails.find(item => item.id === id)) {
          dispatch(fetchNewsDetails(id));
        }
      })
    }
  }, [items, newsDetails])

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
        {isLoadingDetailsNews && newsDetails.length !== NEWS_PER_PAGE ? (
            <Spinner />
          )
          : (
            <List>
              {newsDetails &&
                newsDetails.map((item) => {
                  return <NewsItem key={item?.id} item={item}/>
                })}
            </List>
          )}
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired
};
