import api from '../axios/axios'
import Toast from '../custom/CustomToast'

export const getAllUsers = () => {
    api.get('/users')
        .then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err?.response)
        })
}