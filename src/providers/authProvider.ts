import { AuthProvider, HttpError } from "react-admin";
import data from "@/fakedatas/users.json";

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: ({ username, password: usePassword }: any) => {
    const user = data.users.find((u) => u.username === username);

    if (user) {
      if (user.password !== usePassword) {
        return Promise.reject(new Error("Password invalid"));
      }

      let { password, ...userToPersist } = user;
      localStorage.setItem("user", JSON.stringify(userToPersist));
      localStorage.setItem("permissions", "admin");
      return Promise.resolve();
    }

    return Promise.reject(
      new HttpError("Unauthorized validation", 401, {
        message: "Invalid username or password",
      }),
    );
  },
  logout: () => {
    localStorage.clear();
    return Promise.resolve();
  },
  checkError: () => {
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    const permissions = localStorage.getItem("permissions"); // Lấy từ localStorage
    if (permissions) {
      return Promise.resolve(permissions);
    } else {
      return Promise.resolve(null);
    }
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
