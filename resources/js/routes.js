// route manager json
const routeManager = () => {
    const list = [{
        'posts': {
            title: 'Posts',
            singular: 'post',
            plural: 'posts'
        },
        'pages': {
            title: 'Pages',
            singular: 'page',
            plural: 'pages'
        },
        'users': {
            title: 'Users',
            singular: 'user',
            plural: 'users'
        },
    }];

    return {
        list
    }
}

export default routeManager();
