// 必须引入antd.css，否则antd组件样式不显示
// import 'antd/dist/antd.css';
import React, { Suspense, useState } from 'react';
// 引入路由模块
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
// 引入路由文件routes.js，是为了能实现页面间无刷新跳转
import { pageRouterArr } from './routes/routes';
// 引入全局文件Global/index.js
import { getCookie } from './utils';

function App() {
  const [state] = useState({
    isLogin: !!getCookie('userInfo'),
  })

  return (
    <BrowserRouter>
      <div className="App bg-image bg-skyblue">
        <Suspense fallback={<Loading fullScreen size='large' />}>
          {/* 注册路由 */}
          <Switch>
            {/* Switch可以让注册的路由只匹配一次 */}
            {/* exact属性开启严格匹配，但尽量不用 */}
            {
              pageRouterArr.map((obj) => {
                return (
                  <Route key={obj.path} path={obj.path} component={obj.component} />
                )
              })
            }
            {/* Redirect表示重定向，当都没有匹配上的时候，根据Redirect显示对应组件 */}
            {/* 如果登录状态为已登录，则直接显示主页，否则显示登录页 */}
            <Redirect to={state.isLogin ? '/home' : '/login'} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
