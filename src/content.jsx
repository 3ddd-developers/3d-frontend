import React from 'react';

const WrapContent = ({children}) => {
    return (
        <div id="innerContent">
            {children}
        </div>
    );
}



export default WrapContent;