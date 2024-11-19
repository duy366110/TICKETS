import { LoadingIndicator, LocalesMenuButton } from 'react-admin';
import { ThemeSwapper } from '@/template/themes/ThemeSwapper';

export const AppBarToolbar = () => (
    <>
        <LocalesMenuButton />
        <ThemeSwapper />
        <LoadingIndicator />
    </>
);
