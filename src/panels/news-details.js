import {Div, Group, Panel, PanelHeader, Title} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "@vkontakte/vk-mini-apps-router";
import PropTypes from "prop-types";

export const NewsDetails = ({ id }) => {

  const dispatch = useDispatch();
  const {idNews} = useParams();
  console.log(idNews)
  const currentNews = useSelector(state => state.news.currentNewsItem);
  console.log(currentNews)

  return (
    <Panel id={id}>
      <PanelHeader>Новость</PanelHeader>
      <Group>
        <Div>
          hi
          <Title level="1">{currentNews.title}</Title>
        </Div>
      </Group>
    </Panel>
  );
}

NewsDetails.propTypes = {
  id: PropTypes.string.isRequired
}
