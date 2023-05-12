export function load({ cookies }) {
    const view = cookies.get('view');
    
    cookies.set('view', 'literature', {path: '/'})

    return {
        view
    };
}