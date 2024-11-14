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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "@/template/layout";
import { themes, ThemeName } from "@/template/themes/themes";
import { dataProvider } from "@/providers/dataProvider";
import { authProvider } from "@/providers/authProvider";
import { i18nProvider } from "@/providers/i18nProvider";
import comment from "@/containers/comment/index";
import { useEffect, useState } from "react";

const store = localStorageStore(undefined, "TICKETS");
const queryClient = new QueryClient();

const App = () => {
  const [permissions, setPermissions] = useState('');

  const [themeName] = useStore<ThemeName>("themeName", "soft");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  useEffect(() => {
    if (authProvider && typeof authProvider.getPermissions === 'function') {
      authProvider.getPermissions({}).then((perms) => {
        console.log("Permissions từ authProvider:", perms);
        setPermissions(perms);

      }).catch((error) => {
        console.error('Lỗi khi lấy permissions:', error);
      });
    } else {
      console.error('authProvider.getPermissions không hợp lệ');
    }
  }, []);

  const commentResource = comment(permissions);

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

        <Resource
          name="comments"
          list={commentResource.list}
          create={commentResource.create}
          edit={commentResource.edit}
        />
    </Admin>
  );
};

const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StoreContextProvider value={store}>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default AppWrapper;
