/* En estos archivos buscamos centralizar la configuracion y la llamada a servicios externos de nuestro font end. Un ejemplo de esto puede ser:
- API INTERNA
- API EXTERNA
- Libreria que necesite una configuracion */

import { useNavigate, useSearchParams } from "react-router"
import { ServerError } from "../utils/errorUtils"

/* Fetch es una funcion que nos permite hacer peticiones http a un servidor. (Basicamente nos permite traer datos de otro lugar)
Se lo usa, entre otras cosas, para comunicarnos con API (servidores HTTP) (tambien para traer archivos por ejemplo)

express es un framework para crear http.

En criollo es la forma de interactuar con el BACKEND y lo podriamos comparar con hacer una solicitud http desde postman (no usan la misma tecnologia, pero es analogo a probarlo directamente en la web,osea permite interactuar con el servidor)

Fetch recibe 2 parametros:
- url de consulta : direccion de nuestro servidor backend (actualmente es localhost: 8080 >> conviene guardarla en una constante)
- objeto de configuracion 
*/

const URL_API = import.meta.env.VITE_API_URL // esta es la manera de llamar a la variable de entorno (por buenas practicas luego se debe ignorar el .env en el .gitignore)/*'http://localhost:8080'*/

export async function login(email, password) {

    const response_http = await fetch(
        URL_API + '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    password: password,
                    email: email
                }
            )
        }
    )
    const response = await response_http.json() // Funcion asincronica por eso el await
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}

export async function register(username, password, email) { // funcion asincronica porque va a estar llamando a la funcion fetch, asincronica que devuelve una promesa
    const response_http = await fetch(
        //Primer parametro: URL de consulta

        URL_API + '/api/auth/register', //(le concatenamos el "end- point ")

        //Segundo parametro: datos para hacer el registro

        {
            method: 'POST',
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json' //Configuramos que vamos a enviar json en la peticion, para que el middleware sepa detectar que es un json y sepa hacer las transformaciones correspondientes
            },
            body: JSON.stringify( // El objeto que vamos a eviar y tiene que tener el mismo formato que postman.
                // Transforma un object a json en formato STRING 
                {
                    username: username,
                    password: password,
                    email: email
                }
            )
        }
    )

    // Tranformar la respuesta HTTP para obtener los datos que nos envio por body el servidor. Como el servidor envia JSON debemos tomar la respuesta como json (.json())

    const response = await response_http.json() // Funcion asincronica por eso el await
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}

/*
Response body example:(esto es copia de cuando en postman por ejemplo se crea un nuevo registro)

{
    "message": "Usuario creado exitosamente",
    "status": 201,
    "ok": true,
    "data": null
}
*/

//export async function validateAuth_token() {
/*IDEA CLAVE:
Login → manda email + password (POST, body)
Validate token → manda solo token (GET, headers) 
*/

/*     const response_http = await fetch(
        URL_API + '/api/auth/validate-token',
        {
            method: 'GET',
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer $(auth_token)'
            }
        }
    )
    const response = await response_http.json()  */// Funcion asincronica por eso el await
/*     if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
} */

export function verifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [message, setMessage] = useState("Verificando tu cuenta...");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setMessage("Token de verificación ausente.");
                return;
            }

            try {
                const response_http = await fetch(
                    import.meta.env.VITE_API_URL + `/api/auth/verify-email?verification_email_token=${token}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-api-key': import.meta.env.VITE_API_KEY
                        }
                    }
                );

                const response = await response_http.json();

                if (!response.ok) {
                    throw new ServerError(response.message, response.status);
                }

                setMessage("✅ Tu email fue verificado correctamente.");
                // Opcional: redirigir al login después de 3s
                setTimeout(() => navigate("/login"), 3000);

            } catch (error) {
                console.error(error);
                setMessage(error.message || "Error verificando tu usuario.");
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div >
            <h2>{message}</h2>
        </div>
    );
}