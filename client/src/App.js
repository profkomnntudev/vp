import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import  Main from '../src/components/Main/Main.js'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Vote from './components/Vote/Vote'

function App() {
  return (
    <CookiesProvider>
      <Header/>
      <BrowserRouter>
        <Routes>
            <Routes>
             <Route path="/" element={<Main/>}/>
          <Route path="/vote/" >
            <Route path=":voteId" element={<Vote />} />
          </Route>
          </Routes>          
        </Routes>
      </ BrowserRouter>
      <Footer/>
    </CookiesProvider>
  );
}

export default App;
export const domen = `https://vremyapervih.herokuapp.com`;
