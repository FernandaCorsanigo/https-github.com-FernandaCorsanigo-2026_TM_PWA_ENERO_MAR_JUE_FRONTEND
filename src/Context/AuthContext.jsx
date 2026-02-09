import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export const AUTH_TOKEN_KEY= "auth_token"

function decodeAuthToken(auth_token){
    return jwtDecode(auth_token)
}
function AuthContextProvider ({children}){ // creamos un par de estados:
    const auth_token = localStorage.getItem(AUTH_TOKEN_KEY)
    const [isLogged, setIsLogged] = useState(Boolean(auth_token)) // si esta logeado o no
    const [session, setSession] = useState(auth_token ? decodeAuthToken(auth_token) : null) //datos de usuario que van a venir del token
    
    /* 
    Normalmento los back-ends suelen tener un end-point 
    GET /api/auth/validate-token (Authorization: Bearer auth_token) Te responde si el token es valido o no.
    Este useEffect seria valido si en el futuro tenemos el GET /api/auth/validate-token
    */

    /* useEffect(() => {
        () => {
            const auth_token = localStorage.getItem(AUTH_TOKEN_KEY)
            if (auth_token) {
                setIsLogged(true)
                const session_decoded = jwtDecode(auth_token)
                setSession(session_decoded)
            }
        }
    }) */
    function saveSession (auth_token){
        localStorage.setItem(AUTH_TOKEN_KEY, auth_token) //se guarda el token en el localStorage
        setIsLogged(true) 
        const session_decoded= jwtDecode(auth_token)  //npm install jwt-decode     si copio el auth_token y voy a jwt.io va a decodificar el token, dando los datos del usuario
        setSession(session_decoded)
    }

        const providerValues = {
            saveSession,
            session,
            isLogged
        }

    return(
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider