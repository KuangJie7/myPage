import React from 'react';
import ReactDom from 'react-dom';
import Game from './components/Game.jsx';
import Diary from './components/Diary';

ReactDom.render(
    <Diary />,
    document.getElementById('content')
);
