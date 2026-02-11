import useForm from "./useForm"
import useRequest from "./useRequest"

function useRegister() {
    const { loading, error, response, sendRequest } = useRequest()

    const form_initial_state = {
        username: '',
        password: '',
        email: ''
    }
    async function enviarRegistro(form_state) {
        await sendRequest(
            () => {
                return register(form_state.username, form_state.password, form_state.email)
            }
        )
    }

    console.log({
        loading,
        response,
        error
    })

    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm
    } = useForm(
        {
            initial_form_fields: form_initial_state,
            onSubmit: enviarRegistro
        }
    )

    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        response,
        error
    }
}

export default useRegister