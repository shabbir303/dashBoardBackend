import Aside from "./Aside";
import Header from "./Header";


function ParentComponent({appAsideOpen, appOpen}) {


    return (
        <div>
         <Header handleAsideOpen={appAsideOpen}/>
         <Aside asideOpen={appOpen} handleAsideOpen={appAsideOpen}/>
        </div>
    );
}

export default ParentComponent;
