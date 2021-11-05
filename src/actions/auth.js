import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types'
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() )
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        
            .then( ({user}) => {
                dispatch( login(user.uid, user.displayName) )
                dispatch( finishLoading())

            })
            .catch( 
                (err)=>{
                    console.error(err)
                    dispatch( finishLoading())
                    Swal.fire('Error', err.message, 'error') 
                }
            )


    }
}

//Registro de usuario
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(  async ({user}) => {
                    await  updateProfile(user, {displayName: name})
                    dispatch( login(user.uid, user.displayName) )
                }
            )
            .catch( (err) => {
                console.error(err)
                dispatch( finishLoading())
            } )   
    }
}

//Logueo de usuario con Google
export const startGoogleLogin = () => {
    return(dispatch) => {

        dispatch( startLoading() )
        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider)
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading())
            } )
    }
}




export const startLogout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then(
                dispatch( logout() )
            )
            .catch(
                err => console.error(err)
            )
        
        dispatch( noteLogout() );
        
    }

}


export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

