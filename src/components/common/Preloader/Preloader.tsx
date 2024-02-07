
import React from "react";
import preloaderUrl from '../../../assets/images/Spinner-3.gif'

export const Preloader = () => {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <img alt={'spinner'} style={{width: '300px', height: '300px'}} src={preloaderUrl}/>
        </div>
    )
}