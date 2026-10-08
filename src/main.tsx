import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const palette = getComputedStyle(document.documentElement);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: palette.getPropertyValue('--color-brand').trim(),
                        borderRadius: 8,
                    },
                    components: {
                        Button: {
                            primaryColor: palette.getPropertyValue('--color-on-brand').trim(),
                        },
                    },
                    algorithm: window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
                }}
            >
                <App />
            </ConfigProvider>
        </Provider>
    </StrictMode>,
);
