import React from 'react'

function AlertMessage({classname,message,alertOff}) {
    alertOff()
    return (
        <div className={`alert ${classname}`}>
            {message}
        </div>
    )
}

export default AlertMessage

