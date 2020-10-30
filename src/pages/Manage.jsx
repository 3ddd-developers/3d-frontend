import React, { useState, useEffect } from 'react';

const Manage = props => {
    useEffect(() => {
        console.log(props.match.params.id);

    }, []);

    return (
        <>
            Manage
        </>
    );
};

export default Manage;