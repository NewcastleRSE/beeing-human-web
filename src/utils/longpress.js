export function longpress(node, duration) {
    let timer;

    const handleMousedown = () => {
        timer = setTimeout(() => {
            node.dispatchEvent(
                new CustomEvent('longpress')
            );
        }, duration);
    };

    const handleMouseup = () => {
        clearTimeout(timer)
    };

    node.addEventListener('mousedown', handleMousedown);
    node.addEventListener('mouseup', handleMouseup);

    return {
        destroy() {
            clearTimeout(timer);
            node.removeEventListener('mousedown', handleMousedown);
            node.removeEventListener('mouseup', handleMouseup);
        },

        update(newDuration) {
            duration = newDuration;
        }
    };

}