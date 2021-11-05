import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { login } from '../../actions/auth'
import { startLoadingNotes } from '../../actions/notes'
import { JournalScreen } from '../journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {
    
    const dispatch = useDispatch()


    //state helper para saber si estamos cargando el usuario ( leyendo el usuario de la base de datos)
    const [checking, setChecking] = useState(true)

    //state para saber si el usuario está logueado y redirigirlo en caso de que no lo esté
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    

    //disparamos el efecto una sola vez.
    useEffect(() => {
        const auth = getAuth()
        //observa si esta logueado o no - funcion de firebase
        onAuthStateChanged( auth, (user) =>{ //la funcion se volvio asicrona cuando recuperamos las notes de la base de datos

            if(user?.uid){

                //si el usuario está logueado en firebase, entonces actualizamos el store con
                dispatch( login(user.uid, user.displayName))
                setIsLoggedIn(true)

                //actualizamos el store con las notas del usuario buscando en la base de datos
                dispatch( startLoadingNotes( user.uid ))

            } else{
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
        
    }, [dispatch, setChecking, setIsLoggedIn])


    //pantalla condicional mientras estamos cargando o leyendo de la base de datos.
    if(checking) {
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>

            <Switch>

                <PublicRoute 
                    path="/auth"
                    isAuthenticated={isLoggedIn}
                    component={AuthRouter}
                />

                <PrivateRoute 
                    path="/"
                    isAuthenticated={isLoggedIn}
                    component={JournalScreen}
                />

            </Switch>

        </Router>
    )
}
