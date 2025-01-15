import 'antd/dist/antd.cssDrawerList.ts';
import type { AppProps } from 'next/app';

export const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};