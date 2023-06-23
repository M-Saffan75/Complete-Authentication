import { showMessage } from "react-native-flash-message"


const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger'
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success'
    })
}

export  {
    showError,
    showSuccess
}