const cookiesManager = () => {
    const getCookie = (name) => {
        if(name !== null) {
            return localStorage.getItem(name);
        }
    }
    const setCookie = (name,token) =>  {
        if(typeof name !== typeof undefined && name !== null && typeof token !== typeof undefined && token !== null) {
            localStorage.setItem(name,token);
        }
    }
    const removeCookie = (name) => localStorage.removeItem(name);

    return {
        removeToken,
        getCookie,
        setCookie,
    }
}

export default cookiesManager();
