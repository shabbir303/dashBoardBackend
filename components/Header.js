import { RiBarChartHorizontalLine } from "react-icons/ri";
import { RxEnterFullScreen } from "react-icons/rx";
import { BiExitFullscreen } from "react-icons/bi";
import { useState } from "react";


export default function Header({handleAsideOpen}) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const toogleFullScreen =()=> {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen().then(()=>{
                setIsFullScreen(true);
            })
        }
        else{
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }

    return <>
        <header className="header flex flex-sb">
            <div className="logo flex gap-2">
                <h1>Admin</h1>
                <div className="headerham flex flex-center" onClick={handleAsideOpen}>
                    <RiBarChartHorizontalLine />
                </div>
            </div>
            <div className="rightnav flex gap-2"> 
                <div onClick={toogleFullScreen}>
                {isFullScreen?<BiExitFullscreen />:<RxEnterFullScreen />}
                </div>
                <div className="notification">
                <img src="/img/notification.png" alt="notification" />
            </div>
            <div className="profilenav">
                <img src="/img/user.png" alt="user" />
            </div>
            </div>
           
        </header>
    </>
}