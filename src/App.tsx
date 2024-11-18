import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  localStorageStore,
  useStore,
  StoreContextProvider,
  Show,
} from "react-admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import CustomLayout from "@/template/layout/LayoutCustom";
import { themes, ThemeName } from "@/template/themes/themes";
import { dataProvider } from "@/providers/dataProvider";
import { authProvider } from "@/providers/authProvider";
import { i18nProvider } from "@/providers/i18nProvider";
import ticket from "@/containers/ticket/index";
import { useEffect, useState } from "react";

const store = localStorageStore(undefined, "TICKETS");
const queryClient = new QueryClient();

const App = () => {
  const [permissions, setPermissions] = useState("");

  const [themeName] = useStore<ThemeName>("themeName", "soft");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  useEffect(() => {
    if (authProvider && typeof authProvider.getPermissions === "function") {
      authProvider
        .getPermissions({})
        .then((perms) => {
          setPermissions(perms);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy permissions:", error);
        });
    } else {
      console.error("authProvider.getPermissions không hợp lệ");
    }
  }, []);

  const ticketResource = ticket(permissions);

  return (
    <Admin
      layout={CustomLayout}
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
        name="tickets"
        list={ticketResource.list}
        create={ticketResource.create}
        edit={ticketResource.edit}
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
