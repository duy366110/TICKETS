import polyglotI18nProvider from 'ra-i18n-polyglot';
import english from "@/i18n/en";

export const i18nProvider = polyglotI18nProvider(
    locale => {
        if (locale === 'fr') {
            return import('@/i18n/fr').then(messages => messages.default);
        } else if (locale === 'vi') {
            return import('@/i18n/vi').then(message => message.default);
        }

        // Always fallback on english
        return english;
    },
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
        { locale: 'vi', name: 'VietNam' },
    ]
);