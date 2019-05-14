import React from 'react';

function MarkBar({mark}){
    return (
        <div className="mark"> {`Rating : ${mark}`}</div>
    );
}
export default MarkBar;