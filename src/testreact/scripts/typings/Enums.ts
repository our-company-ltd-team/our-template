/**
 * Enum for Directions
 * @enum {number} - flag values
 */
const enum Direction {
    Center = 0,
    Top = 1,
    Bottom = 2,
    Right = 4,
    Left = 8,
    Over = 16,
    Under = 32
}

/**
 * Enum for keys keyboard charcode
 * @enum {number}
 */
const enum KeyCharcode {
    Enter = 13,
    Escape = 27,

    Space = 32,

    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40
}

/**
 * Enum for global events
 * @enum {number}
 */
const enum $Events {
    Navigate = 1,
    EnterViewPort = 2,
    ViewportChanged = 3,
    InViewport = 4,
    PopState = 5,
}