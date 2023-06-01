import { useState } from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput  from "../form-input/form-input.component";
import { SignInContainer, Header, ButtonsContainer } from './sign-in-form.styles.jsx';


import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        // Prevent some kind of action or behavior in the browser, such as navigating to a new page or submitting a form and refreshing the page.
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );

            resetFormFields()
        } catch(error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert('No user associated with this email!');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for email!');
                    break;
                default:
                    console.log(error);
            }
        }


    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // [name] here is a computed property, otherwise they key would be set to 'name' specifically.
        setFormFields({...formFields, [name]:value});
    };

    return (
        <SignInContainer>
            <Header>Already have an account?</Header>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                     type='email' 
                     onChange={handleChange} 
                     name='email' 
                     value={email} 
                     required />

                <FormInput
                    label='Password'
                     type='password' 
                     onChange={handleChange} 
                     name='password' 
                     value={password} 
                     required />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Sign In With Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;