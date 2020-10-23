import React from 'react';
import qs from 'qs';

const Test = () => {
    const { code } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });

    if (code) window.sessionStorage.setItem('gcode', code);

    return (
        <>
            Test
        </>
    );
};

export default Test;