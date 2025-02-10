import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import type { FC } from 'react';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { toastConfig } from '../../config/toast';
import { ThemeProvider } from '../../context/ThemeContext';
import { client } from '../../graphql/client';
import type { Route } from '../../types/navigation';
import { About } from '../About/About';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import SentimentAnalyzer from '../SentimentAnalyzer/SentimentAnalyzer';

const App: FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('analyzer');

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <div className="app">
          <Navigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
          <main className="app__content">
            {currentRoute === 'analyzer' ? <SentimentAnalyzer /> : <About />}
          </main>
          <Footer />
          <ToastContainer {...toastConfig} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
