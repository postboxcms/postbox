const jwtManager = () => {
    let accessToken = null;

    const getToken = (name) => {
        if(name !== null) {
            return localStorage.getItem(name);
        }
    }
    const setToken = (name,token) =>  {
        if(typeof name !== typeof undefined && name !== null && typeof token !== typeof undefined && token !== null) {
            localStorage.setItem(name,token);
        }
    }
    const removeToken = (name) => localStorage.removeItem(name);

    // const getAccessToken = () => accessToken;
    // const setAccessToken = (token) => accessToken = token;
    // const removeAccessToken = (hash) => localStorage.removeItem('postbox_access_');

    return {
        removeToken,
        getToken,
        setToken,
        // removeAccessToken,
        // getAccessToken,
        // setAccessToken
    }
}

export default jwtManager();
