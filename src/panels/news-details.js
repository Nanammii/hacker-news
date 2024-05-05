import {
  Button, Caption, Cell,
  Div,
  FormItem,
  Group,
  Link, List,
  Panel,
  PanelHeader,
  PanelHeaderBack, Paragraph,
  Subhead,
  Textarea,
  Title
} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";

import PropTypes from "prop-types";
import {useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {useEffect} from "react";
import {fetchNewsDetails} from "../store/api-actions.js";

export const NewsDetails = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch();

  const idNews = useParams();
  const currentNews = useSelector(state => state.news.newsDetails)[0];
  console.log(idNews, currentNews)
  const comments = useSelector(state => state.news.comments.filter(item => item.type === 'comment'))
  console.log(comments)

  useEffect(() => {
    if (idNews && !currentNews) {
      dispatch(fetchNewsDetails(idNews.id));
    }
  }, [idNews, currentNews])

  useEffect(() => {
    if (currentNews?.kids && currentNews?.kids.length !== 0) {
      currentNews?.kids.map(idKids => {
        dispatch(fetchNewsDetails(idKids))
      })
    }
  }, [currentNews])

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.push('/')} />}>
        {currentNews?.title}
      </PanelHeader>
      <Group>
        <Div>
          <Link href={currentNews?.url}>
            <Title level="1">{currentNews?.title}</Title>
          </Link>
          <Div style={{ display: 'flex', gap: '15px' }}>
            <Subhead weight="regular">Дата публикации: {new Date(currentNews?.time * 1000).toLocaleString()}</Subhead>
            <Subhead weight="regular">Автор: {currentNews?.by}</Subhead>
            {currentNews?.kids?.length === 0 ? (
              ""
              )
              : (
                <Subhead weight="regular">Комментарии: {currentNews?.kids?.length}</Subhead>
              )
            }
          </Div>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormItem htmlFor="about" top="Написать комментарий">
              <Textarea id="about" />
            </FormItem>
            <FormItem>
              <Button type="submit" size="l" stretched>
                Отправить
              </Button>
            </FormItem>
          </form>
        </Div>
        <Div>
          {comments.length === 0 ? (
              ""
            )
            : (
              <List>
                {comments &&
                  comments.map((item) => {
                    return (
                      <Cell key={item.id}>
                        <Div style={{ display: 'flex', gap: '15px', paddingLeft: '0' }}>
                          <Caption weight="regular">Автор: {item?.by}</Caption>
                          <Caption weight="regular">Дата публикации: {new Date(item?.time * 1000).toLocaleString()}</Caption>
                        </Div>
                        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{item.text}</Paragraph>
                      </Cell>
                    )
                  })}
              </List>
            )}
        </Div>
      </Group>
    </Panel>
  );
}

NewsDetails.propTypes = {
  id: PropTypes.string.isRequired
}
