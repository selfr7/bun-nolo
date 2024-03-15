import authReducer from "auth/authSlice";
import messageSlice from "chat/messages/messageSlice";
import dbReducer from "database/dbSlice";
import lifeReducer from "life/lifeSlice";
import pageReducer from "render/page/pageSlice";

import { api } from "./api";
import themeSliceReducer from "./theme/themeSlice";

export const reducer = {
  life: lifeReducer,
  message: messageSlice,
  auth: authReducer,
  page: pageReducer,
  db: dbReducer,
  theme: themeSliceReducer,
  [api.reducerPath]: api.reducer,
};
