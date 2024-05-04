import {useDispatch, useSelector} from "react-redux";
import {Cell, Div, Subhead, Title} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";
import {setCurrentNewsItem} from "../store/data-process.js";

export const NewsItem = ({ item }) => {
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch()

  return (
    <Cell key={item?.id} onClick={() => {
      dispatch(setCurrentNewsItem(item));
      routeNavigator.push(`/newsDetails/${item?.id}`)}}
      >
      <Div>
        <Title>{item?.title}</Title>
        <Div>
          <Subhead weight="regular">Рейтинг: {item?.score}</Subhead>
          <Subhead weight="regular">Дата публикации: {new Date(item?.time * 1000).toLocaleString()}</Subhead>
          <Subhead weight="regular">Автор: {item?.by}</Subhead>
        </Div>
      </Div>
    </Cell>
  );
}

NewsItem.propTypes = {
  item: PropTypes.object
}
