import axios from "axios"

export const api = () => {
    const post = (url) => {
        axios.post(url)
    }

    return {
        post
    }
}