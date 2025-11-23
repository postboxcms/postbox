const useStorage = () => {
    const getItem = (name) => {
        if(name !== null) {
            return localStorage.getItem(name);
        }
    }
    const setItem = (name,token) =>  {
        if(typeof name !== typeof undefined && name !== null && typeof token !== typeof undefined && token !== null) {
            localStorage.setItem(name,token);
        }
    }
    const removeCookie = (name) => localStorage.removeItem(name);

    return {
        getItem,
        setItem,
    }
}

export default useStorage();
