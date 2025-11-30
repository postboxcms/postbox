export const usePersistentStorage = () => {
    const getPersistentItem = (name) => {
        if(name !== null) {
            return localStorage.getItem(name);
        }
    }
    const setPersistentItem = (name,token) =>  {
        if(typeof name !== typeof undefined && name !== null && typeof token !== typeof undefined && token !== null) {
            localStorage.setItem(name,token);
        }
    }
    const deletePersistentItem = (name) => localStorage.removeItem(name);

    return {
        getPersistentItem,
        setPersistentItem,
        deletePersistentItem
    }
}