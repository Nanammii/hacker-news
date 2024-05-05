import {Cell, Div, Subhead, Title} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";

export const NewsItem = ({ item }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Cell key={item?.id} onClick={() => routeNavigator.push(`/newsDetails/${item?.id}`)}
      >
        <Title>{item?.title}</Title>
        <Div style={{ display: 'flex', gap: '15px' }}>
          <Subhead weight="regular">Рейтинг: {item?.score}</Subhead>
          <Subhead weight="regular">Дата публикации: {new Date(item?.time * 1000).toLocaleString()}</Subhead>
          <Subhead weight="regular">Автор: {item?.by}</Subhead>
        </Div>
    </Cell>
  );
}

NewsItem.propTypes = {
  item: PropTypes.object
}
