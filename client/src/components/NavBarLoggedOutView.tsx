import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps{
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void
}
const NavBarLoggedOutView=({onSignUpClicked,onLoginClicked}:NavBarLoggedOutViewProps)=>{
    return(
        <>
            <Button onClick={onSignUpClicked}>Signup</Button>
            <Button onClick={onLoginClicked}>Login</Button>
        </>
    );
}

export default NavBarLoggedOutView;