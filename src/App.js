
import {View, SplitLayout, SplitCol} from '@vkontakte/vkui';
import {useActiveVkuiLocation, usePopout} from '@vkontakte/vk-mini-apps-router';

import { Home} from './panels';
import {DEFAULT_VIEW_PANELS} from './routes';
import {useSelector} from "react-redux";
import {NewsDetails} from "./panels/news-details.js";

export const App = () => {
  const {panel: activePanel = DEFAULT_VIEW_PANELS.HOME} = useActiveVkuiLocation();
  const routerPopout = usePopout();
  const news = useSelector(state => state.news.news)

  return (
    <SplitLayout popout={routerPopout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" items={news} />
          <NewsDetails />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
