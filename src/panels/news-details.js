import {Div, Group, Title} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "@vkontakte/vk-mini-apps-router";

export const NewsDetails = () => {
  const dispatch = useDispatch();
  const currentItem = useParams();
  const currentNewsItem = useSelector(state => state.news.currentNewsItem);

  return (
    <Group>
      <Div>
        <Title level="1">{currentItem.title}</Title>
      </Div>
    </Group>
  );
}
