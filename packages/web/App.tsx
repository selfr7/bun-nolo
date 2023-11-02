import { useAppDispatch, useAuth } from 'app/hooks';
import { authRoutes } from 'auth/client/routes';
import { getTokensFromLocalStorage } from 'auth/client/token';
import { parseToken } from 'auth/token';
import ChatPage from 'chat/ChatPage';
import { routes as createRoutes } from 'create/routes';
import i18n from 'i18n';
import Life from 'life/All';
import React, { Suspense, lazy, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Default from 'render/layout/Default';
import Full from 'render/layout/Full';
import Page from 'render/Page';
import { routes as settingRoutes } from 'setting/routes';
import { restoreSession } from 'user/userSlice';

// // import { generatorRoutes } from "./generatorRoutes";
// const ChatPage = lazy(() => import("chat/ChatPage"));
const Home = lazy(() => import('./pages/Home'));
const Welcome = lazy(() => import('./pages/Welcome'));

const routes = (currentUser) => [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>loading layout</div>}>
        <Default />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>loading honme</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'welcome',
        element: (
          <Suspense fallback={<>...</>}>
            <Welcome />
          </Suspense>
        ),
      },

      ...authRoutes,
      {
        path: 'life',
        element: <Life />,
      },
    ],
  },
  ...settingRoutes,
  ...createRoutes,
  {
    path: '/',
    element: <Full />,
    children: [
      {
        path: 'chat',
        element: (
          <Suspense>
            <ChatPage />
          </Suspense>
        ),
        children: [
          {
            path: ':chatId',
            element: (
              <Suspense>
                <ChatPage />
              </Suspense>
            ),
          },
          { path: '*', element: <ChatPage /> },
        ],
      },
    ],
  },
  {
    path: ':pageId',
    element: <Default />,
    children: [{ index: true, element: <Page /> }],
  },
];
export default function App({ hostname, lng = 'en' }) {
  // const routes = useMemo(() => generatorRoutes(hostname), [hostname]);
  // let element = useRoutes(routes);
  const auth = useAuth();
  i18n.changeLanguage(lng);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokens = getTokensFromLocalStorage();

    if (tokens) {
      const parsedUsers = tokens.map((token) => parseToken(token));
      parsedUsers.length > 0 &&
        dispatch(restoreSession({ user: parsedUsers[0], users: parsedUsers }));
    }
  }, []);

  const element = useRoutes(routes(auth.user));
  return element;
}
