import React from 'react';
import Content from './content.jsx';
import './style.scss';

const App = () => {
    return (
        <>
            <header>Header</header>
            <div id="content">
                <Content />
            </div>
            <footer>Footer</footer>
        </>
    );
};


export default App;
