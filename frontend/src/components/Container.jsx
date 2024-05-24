import React from 'react'

const Container = ({ children, className }) => {
    return (
        <div className={`container ${className ? className : ""} max-w-[1350px] p-2 mx-auto`}>
            {children}
        </div>
    )
}

export default Container
