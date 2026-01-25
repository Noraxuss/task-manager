export function changeColor(element, color) {
    if (element && color) {
        element.style.backgroundColor = color;
    } else {
        console.warn("Element or color not provided for color change.");
    }
}