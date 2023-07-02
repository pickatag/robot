'use strict';

/**
 * This is the main file for a simulation of a robot.
 * The program expects three console inputs and then reports
 * the final position of the robot in the room.
 */
const userInput = require('readline-async');
const { splitToXY, checkBoundaries, setDirection, getDirection, isCommandForward, stepPosition, changeDirection } = require('./src/func');

let size = null;
let position = null;
let direction = null;

let trace = process.argv.length > 2 && process.argv[2] === '-t' ? true : false;
if (trace) {
  console.log('Trace activated');
}

// Get first user input (size of room)
userInput()
.then(input => {
  // Interpret values for size of room
  size = splitToXY(input);
  if (size === null) {
    // Values could not be handled properly, throw error
    throw new Error('Size could not be interpreted ("x y" expected)');
  }
  // Get next user input (start position and initial direction)
  return userInput();
})
.then(input => {
  // Interpret values for position in room as well as direction
  position = splitToXY(input);
  if (position === null) {
    // Value could not be handled properly, throw error
    throw new Error('Start position could not be interpreted ("x y direction" expected)');
  }

  // Is starting position within boundaries?
  if (!checkBoundaries(position, size)) {
    // No, position is outside of boundaries
    throw new Error('Starting position is out of boundaries (in-between  "0 0" and "' + size.x + ' ' + size.y + '" expected)');
  }

  // Get and interpret direction. Provide last character (input must be a string and have length to reach this code)
  direction = setDirection(input.trimEnd().split('').pop());
  if (direction === null) {
    // Value could not be handled properly, throw error
    throw new Error('Direction could not be interpreted ("x y direction" expected)');
  }
  // Get next user input (commands for robot movements)
  return userInput();
})
.then(input => {
  // Interpret string of instructions
  input.split('').forEach(command => {
    // Check if command is step forward
    if (isCommandForward(command)) {
      // Calculate new position and check boundaries
      position = stepPosition(position, direction);
      if (!checkBoundaries(position, size)) {
        // No, position is outside of boundaries
        throw new Error('Out of bounds at ' + position.x + ' ' + position.y);
      }

      if (trace) {
        console.log('Move:   ' + position.x + ' ' + position.y + ' ' + getDirection(direction));
      }
    }
    else {
      // Assume direction change via turn, set new direction
      direction = changeDirection(direction, command);
      if (direction === null) {
        // Command not correct, abort
        throw new Error('Command could not be interpreted ("F", "L" or "R" expected)');
      }

      if (trace) {
        console.log('Turn:   ' + position.x + ' ' + position.y + ' ' + getDirection(direction));
      }
    }
  });

  // Done, end by reporting position
  console.log('Report: ' + position.x + ' ' + position.y + ' ' + getDirection(direction));
})
.catch(e => {
  // Log error
  console.log('ERROR: ' + e.message);
});
