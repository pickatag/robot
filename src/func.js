'use strict';
/**
 * This file contains functions for performing the robot test
 */

// For directions, use constant values
// Note! Do not change these values without refactoring code below
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
const DIRECTIONS = ['N', 'E', 'S', 'W'];  // Note! Must correspond to values above

/**
 * @function splitToXY
 * 
 * Function that splits a string into a pair of coordinates
 * The divider accepted is space.
 * 
 * @param {string} str - The string to split from
 * @return {number, number} A const with the X and the Y coordinates. If error occurs, returned as null.
 */
function splitToXY(str) {
  let ret = null;

  // Check type of input and protect for null values
  if (typeof str === 'string') {
    // Split into array of strings and filter any zero strings (access spaces provided)
    const cords = str.split(' ').filter(e => e.length > 0);

    // Only handle array if 2 or more values, otherwise considered an error
    if (cords.length > 1) {
      let x = parseInt(cords[0]);
      let y = parseInt(cords[1]);

      if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0) {
        // Two positive integer values found, set as return values
        ret = {x, y};
      }
    }
  }

  return ret;
}

/**
 * @function checkBoundaries
 * 
 * Function that checks if a pair of coordinates are within boundaries.
 * Space is limited between coordinates 0,0 and size given as parameter
 * 
 * @param {number, number} position - The position to check
 * @param {number, number} size - The maximum size of the space
 * @return {boolean} True if within boundaries, False otherwise
 */
function checkBoundaries(position, size) {
  // Check values (assume x and y values)
  return (position && size && position.x >= 0 && position.y >= 0 && position.x < size.x && position.y < size.y) ? true : false;
}

/**
 * @function isCommandForward
 * 
 * Function that checks if a command is of type forward ("F")
 * 
 * @param {string} command - The command given
 * @return {boolean} True if the command is a forward ("F") command
 */
function isCommandForward(command) {
  // Check command for "F"
  return (typeof command === 'string') && command.trim().toUpperCase() === 'F' ? true : false;
}

/**
 * @function setDirection
 * 
 * Function that checks a direction value depending on direction given and returns a direction value.
 * 
 * Possible directions and the corresponding value are:
 *  Direction     Value
 *  --------------------
 *   N ("north")    0
 *   E ("east")     1
 *   S ("south")    2
 *   W ("west")     3
 * 
 * @param {string} str - The direction set
 * @return {number} A number with the formatted direction value. If error occurs, returned as null.
 */
function setDirection(str) {
  // Check type of input and protect for null values
  if (typeof str === 'string') {
    // Remove any spaces and handle lower/upper case as same, and search for direction
    const direction = DIRECTIONS.indexOf(str.trim().toUpperCase());

    // If found, return
    if (direction >= 0) {
      return direction;
    }
  }

  // Value not correct given, return null
  return null;
}

/**
 * @function getDirection
 * 
 * Function that gets a direction character based on a direction number
 * 
 * @param {number} direction - The direction set
 * @return {string} The corresponding direction value
 */
function getDirection(direction) {
  // Check type of input and protect for null values
  if (Number.isInteger(direction) && direction < DIRECTIONS.length) {
    // Return the corresponding direction
    return DIRECTIONS[direction];
  }

  // Value not correct given, return null
  return null;
}

/**
 * @function changeDirection
 * 
 * Function that changes a direction depending on navigation command given.
 * 
 * Possible directions are:
 *  Direction
 *  ----------------------
 *   0 ("north")
 *   1 ("east")
 *   2 ("south")
 *   3 ("west")
 * 
 * Possible navigation commands are:
 *  Command
 *  -------------
 *   L ("left")
 *   R ("right")
 * 
 * @param {number} direction - The original direction 
 * @param {string} command - The navigation command
 * @return {number} The new calculated direction
 */
function changeDirection(direction, command) {
  // Check type of input and protect for null values
  if (Number.isInteger(direction) && direction >= 0 && direction < DIRECTIONS.length && typeof command === 'string') {
    // Decode command. Remove any spaces and handle lower/upper case as same
    switch(command.trim().toUpperCase()) {
      case 'L': // Left
        return direction > NORTH ? direction - 1 : WEST;
      case 'R': // Right
        return direction < WEST ? direction + 1 : NORTH;
      default:
        // Value not correct given, return null
        return null;

    }
  }

  // Value not correct given, return null
  return null;
}

/**
 * @function stepPosition
 * 
 * Function that steps a position of x and y coordinates depending on a direction.
 * 
 * @param {number, number} position - The position to step from
 * @param {number} direction - The direction to step in
 * @return {number, number} The new position. If not possible to calculate, null is returned.
 */
function stepPosition(position, direction) {
  // Get the delta values to step with depending on direction
  let delta = getDeltaXY(direction);
  if (delta === null) {
    // Delta values not set, return null to indicate error
    return null;
  }
  else {
    // Calculate new position
    return {
      x: position.x + delta.x,
      y: position.y + delta.y
    };
  }
}

/**
 * @function getDeltaXY
 * 
 * Function that get a pair of delta values depending on direction given.
 * The delta values may be used to calculate new coordinates.
 * 
 * Possible directions and the corresponding delta values are:
 *  Direction      x    y
 *  ----------------------
 *   0 ("north")    0  -1
 *   1 ("east")     1   0
 *   2 ("south")    0   1
 *   3 ("west")    -1   0
 * 
 * @param {number} direction - The direction set
 * @return {number, number} A const with the x and the y values. If error occurs, returned as null.
 */
function getDeltaXY(direction) {
  // Check type of input and protect for null values
  switch(direction) {
    case NORTH: // North
      return {x: 0, y: -1};
    case EAST: // East
      return {x: 1, y: 0};
    case SOUTH: // South
      return {x: 0, y: 1};
    case WEST: // West
      return {x: -1, y: 0};
    default:
      // Value not correct given, return null
      return null;
  }
}

module.exports = {
  NORTH,
  EAST,
  SOUTH,
  WEST,
  splitToXY,
  checkBoundaries,
  isCommandForward,
  setDirection,
  getDirection,
  changeDirection,
  stepPosition,
  getDeltaXY
}
