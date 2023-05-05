import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { LoginCredentials } from "../network/notes_api";
import { Alert, Button, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"
import { useState } from "react";
import { UnAuthorizedError } from "../errors/http_errors";


interface LoginModalProps{
    onDismiss:()=>void,
    onLoginSuccessful:(user:User)=> void,
}

const LoginModal=({onDismiss,onLoginSuccessful}:LoginModalProps)=>{
    const [errorText, setErrorText]=useState<string | null>(null);
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<LoginCredentials>();
    async function onSubmit(credentials:NotesApi.LoginCredentials) {
        try {
            const user=await NotesApi.login(credentials);
            onLoginSuccessful(user)
        } catch (error) {
            if (error instanceof UnAuthorizedError) {
                setErrorText(error.message);
            }
            else{
                alert(error);
            }
            console.error(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{required:"Required"}}
                    error={errors.username}
                    />
                    <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{required:"Required"}}
                    error={errors.password}
                    />
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Login
                    </Button>
                </form>
            </Modal.Body>

        </Modal>
    );
}

export default LoginModal