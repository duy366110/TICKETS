import {
    SearchInput,
    NullableBooleanInput,
    DateInput,
} from "react-admin";

export const FilterComment = [
    <SearchInput source="id" alwaysOn/>,
    <DateInput source="last_seen_gte"/>,
    <NullableBooleanInput source="postId"/>,
    <SearchInput source="content"/>,
];