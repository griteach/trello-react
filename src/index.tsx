import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';
import App from './App';
import { darkTheme } from './theme';



const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    color:black;
    background-color: ${(props)=> props.theme.bgColor};
  }
  
`;
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <ThemeProvider theme={darkTheme}>
      
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyle />
          <App />
        </RecoilRoot>
          
        
      </QueryClientProvider>
    </ThemeProvider>
  
);

