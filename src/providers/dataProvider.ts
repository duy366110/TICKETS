import fakeRestDataProvider from "ra-data-fakerest";
import data from "@/fakedatas/data.json";

export const dataProvider = fakeRestDataProvider(
  data,
  process.env.NODE_ENV !== "test",
  300,
);