import {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, SplitLayout, SplitCol, ScreenSpinner} from '@vkontakte/vkui';
import {useActiveVkuiLocation, usePopout} from '@vkontakte/vk-mini-apps-router';

import {Persik, Home} from './panels';
import {DEFAULT_VIEW_PANELS} from './routes';
import {useSelector} from "react-redux";

export const App = () => {
  const {panel: activePanel = DEFAULT_VIEW_PANELS.HOME} = useActiveVkuiLocation();
  // const [fetchedUser, setUser] = useState();
  // const [popout, setPopout] = useState(<ScreenSpinner size="large"/>);
  const routerPopout = usePopout();
  const news = useSelector(state => state.news.news)
  console.log(news)
  //
  // useEffect(() => {
  //   async function fetchData() {
  //     // const user = await bridge.send('VKWebAppGetUserInfo');
  //     // setUser(user);
  //     setPopout(null);
  //   }
  //
  //   fetchData();
  // }, []);

  return (
    <SplitLayout popout={routerPopout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" items={news} />
          <Persik id="persik"/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
