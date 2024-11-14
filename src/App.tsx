import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  localStorageStore,
  useStore,
  StoreContextProvider,
} from "react-admin";
import { Layout } from "@/template/layout";
import { themes, ThemeName } from "@/template/themes/themes";
import { dataProvider } from "@/providers/dataProvider";
import { authProvider } from "@/providers/authProvider";
import { i18nProvider } from "@/providers/i18nProvider";

import comment from "@/containers/comment/index";

const store = localStorageStore(undefined, 'TICKETS');

const App = () => {

  const [themeName] = useStore<ThemeName>('themeName', 'soft');
  const lightTheme = themes.find(theme => theme.name === themeName)?.light;
  const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
    >
      <Resource
        name="posts"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource name="comments" {...comment} />
    </Admin>
  );
}

const AppWrapper = () => (
  <StoreContextProvider value={store}>
      <App />
  </StoreContextProvider>
);

export default AppWrapper;
