import { createContext, useEffect } from 'react';
import { ConfigProvider, LayoutProps, theme } from 'antd';
import useLocalStorage from "@/hooks/useLocalStorage";
import zhCN from 'antd/locale/zh_CN';
import themeTokens from '../theme/themeTokens';

interface ThemeContextType {
  userTheme: string;
  changeTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  userTheme: 'light', 
  changeTheme: () => {} 
});

export const ThemeContextProvider = (props : LayoutProps) => {
  const [userTheme, setUserTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', userTheme);
  }, [userTheme])

  const changeThemeHandler = (themeName : string) => {        
    setUserTheme(themeName);
  }

  const contextValue = {
    userTheme: userTheme,
    changeTheme: changeThemeHandler
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{ 
            algorithm: userTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: { colorPrimary: "#08979c", colorInfo: "#08979c", screenXXLMin: 1920, screenXXL: 2560, },
            components: themeTokens,
            cssVar: true,
            hashed: false
        }}
        locale={zhCN}
      >
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext