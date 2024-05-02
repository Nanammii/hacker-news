import {Div, Group, Title} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";

export const NewsDetails = () => {
  const dispatch = useDispatch();
  const currentNewsItem = useSelector(state => state.news.currentNewsItem);

  return (
    <Group>
      <Div>
        <Title level="1">{currentNewsItem.title}</Title>
      </Div>
    </Group>
  );
}
