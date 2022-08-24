import React from 'react';

const storageManager = () => {
        const store = (item,data) => {
            if(localStorage.getItem(item) !== null) {
                localStorage.removeItem(item);
            }
            localStorage.setItem(item,data);
        }

        return {
            store
        }
}
export default storageManager();
