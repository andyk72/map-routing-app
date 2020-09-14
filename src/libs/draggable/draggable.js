/**
 * draggable module
 * 
 *  Enables dragging onto draggedElement through user interaction with draggerElement
 * 
 * @returns {Object}
 *  .draggedElement {HTMLElement}
 *  .draggerElement {HTMLElement}
 *  .isDraggin {Boolean}
 *  .x {Function}
 *  .y {Function}
 */
export default (draggedElement, draggerElement) => {
        
    const draggedElementContainer = draggedElement.parentElement;
    draggedElementContainer.addEventListener("touchstart", dragStart, false);
    draggedElementContainer.addEventListener("touchend", dragEnd, false);
    draggedElementContainer.addEventListener("mousedown", dragStart, false);
    draggedElementContainer.addEventListener("mouseup", dragEnd, false);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let initialX;
    let initialY;

    function dragStart(evt) {

        let position = (evt.type === 'touchstart')
            ? getTouchPosition(evt)
            : getMousePosition(evt);

        initialX = position.x;
        initialY = position.y;

        if (evt.target === draggerElement) {
            isDragging = true;
            draggedElementContainer.addEventListener("touchmove", drag, false);
            draggedElementContainer.addEventListener("mousemove", drag, false);
        }

    }

    function dragEnd(evt) {
        isDragging = false;
        offsetX = parseInt(getComputedStyle(draggedElement).left);
        offsetY = parseInt(getComputedStyle(draggedElement).top);
        draggedElementContainer.removeEventListener("touchmove", drag, false);
        draggedElementContainer.removeEventListener("mousemove", drag, false);
    }

    function drag(evt) {

        if (isDragging) {
        
            evt.preventDefault();

            let position = (evt.type === 'touchmove')
                ? getTouchPosition(evt)
                : getMousePosition(evt);
            
            const clientX = position.x;
            const clientY = position.y;
            const moveX = clientX - initialX + offsetX;
            const moveY = clientY - initialY + offsetY;

            moveElement(moveX, moveY, draggedElement);

        }

    }

    function moveElement(moveX, moveY, element) {
        element.style.left = moveX + 'px';
        element.style.top = moveY + 'px';
    }

    function getTouchPosition(evt) {
        return {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY
        };
    }

    function getMousePosition(evt) {
        return {
            x: evt.clientX,
            y: evt.clientY
        };
    }

    function getCurrentX() {
        return parseInt(draggedElement.style.left);
    }

    function getCurrentY() {
        return parseInt(draggedElement.style.top);
    }

    function getCurrentPosition () {
        return {
            x: getCurrentX(),
            y: getCurrentY()
        }
    }

    return {
        draggedElement,
        draggerElement,
        isDragging,
        getCurrentPosition
    }

}