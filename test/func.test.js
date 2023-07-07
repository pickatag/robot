'use strict';
/**
 * This file contains test functions unit test of robot functions
 */
const func = require('../src/func');

// ------------------------------------------------------------------------------------------------
// Test cases for splitToXY
// Normal test cases
test('splitToXY - Normal split', () => {
  expect(func.splitToXY('1 1')).toStrictEqual({x: 1, y: 1});
});

test('splitToXY - Normal split 0 values', () => {
  expect(func.splitToXY('0 0')).toStrictEqual({x: 0, y: 0});
});

test('splitToXY - Handle more values', () => {
  expect(func.splitToXY('1 1 N')).toStrictEqual({x: 1, y: 1});
});

test('splitToXY - Handle float value', () => {
  expect(func.splitToXY('1.2 1')).toStrictEqual({x: 1, y: 1});
});

test('splitToXY - Handle more spaces', () => {
  expect(func.splitToXY('  1   1  ')).toStrictEqual({x: 1, y: 1});
});

// Handle error test cases
test('splitToXY - Handle null', () => {
  expect(func.splitToXY(null)).toBeNull();
});

test('splitToXY - Handle non string', () => {
  expect(func.splitToXY(1)).toBeNull();
});

test('splitToXY - Handle empty string', () => {
  expect(func.splitToXY('')).toBeNull();
});

test('splitToXY - Handle space string', () => {
  expect(func.splitToXY(' ')).toBeNull();
});

test('splitToXY - Handle to few parameters', () => {
  expect(func.splitToXY('1')).toBeNull();
});

test('splitToXY - Handle first parameter wrong', () => {
  expect(func.splitToXY('a 1')).toBeNull();
});

test('splitToXY - Handle second parameter wrong', () => {
  expect(func.splitToXY('1 a')).toBeNull();
});

test('splitToXY - Handle negative parameter', () => {
  expect(func.splitToXY('1 -1')).toBeNull();
});

// ------------------------------------------------------------------------------------------------
// Test cases for checkBoundaries
// Handle true test cases
test('checkBoundaries - Check value within', () => {
  expect(func.checkBoundaries({x: 1, y: 1}, {x: 3, y: 3})).toBeTruthy();
});

test('checkBoundaries - Check min border values', () => {
  expect(func.checkBoundaries({x: 0, y: 0}, {x: 2, y: 2})).toBeTruthy();
});

test('checkBoundaries - Check max border value', () => {
  expect(func.checkBoundaries({x: 2, y: 2}, {x: 3, y: 3})).toBeTruthy();
});

// Handle false test cases
test('checkBoundaries - Check below min', () => {
  expect(func.checkBoundaries({x: -1, y: 1}, {x: 2, y: 2})).toBeFalsy();
});

test('checkBoundaries - Check border value', () => {
  expect(func.checkBoundaries({x: 2, y: 2}, {x: 2, y: 2})).toBeFalsy();
});

test('checkBoundaries - Check X above max', () => {
  expect(func.checkBoundaries({x: 3, y: 1}, {x: 2, y: 2})).toBeFalsy();
});

test('checkBoundaries - Check Y above max', () => {
  expect(func.checkBoundaries({x: 1, y: 3}, {x: 2, y: 2})).toBeFalsy();
});

// ------------------------------------------------------------------------------------------------
// Test cases for setDirection
// Normal test cases
test('setDirection - Set north', () => {
  expect(func.setDirection('N')).toBe(func.NORTH);
});

test('setDirection - Set south', () => {
  expect(func.setDirection('S')).toBe(func.SOUTH);
});

test('setDirection - Set east', () => {
  expect(func.setDirection('E')).toBe(func.EAST);
});

test('setDirection - Set west', () => {
  expect(func.setDirection('W')).toBe(func.WEST);
});

test('setDirection - Set north (lower case)', () => {
  expect(func.setDirection('n')).toBe(func.NORTH);
});

// Handle error test cases
test('setDirection - Handle null', () => {
  expect(func.setDirection(null)).toBeNull();
});

test('setDirection - Handle none string', () => {
  expect(func.setDirection(12)).toBeNull();
});

test('setDirection - Handle empty string', () => {
  expect(func.setDirection('')).toBeNull();
});

test('setDirection - Handle wrong value', () => {
  expect(func.setDirection('M')).toBeNull();
});

test('setDirection - Handle more values', () => {
  expect(func.setDirection('N E')).toBeNull();
});

// ------------------------------------------------------------------------------------------------
// Test cases for getDirection
// Normal test cases
test('getDirection - Get north', () => {
  expect(func.getDirection(func.NORTH)).toBe('N');
});

test('getDirection - Set south', () => {
  expect(func.getDirection(func.SOUTH)).toBe('S');
});

test('getDirection - Set east', () => {
  expect(func.getDirection(func.EAST)).toBe('E');
});

test('getDirection - Set west', () => {
  expect(func.getDirection(func.WEST)).toBe('W');
});

// Handle error test cases
test('getDirection - Handle null', () => {
  expect(func.getDirection(null)).toBeNull();
});

test('getDirection - Handle string', () => {
  expect(func.getDirection('1')).toBeNull();
});

test('getDirection - Handle wrong value', () => {
  expect(func.getDirection(4)).toBeNull();
});

// ------------------------------------------------------------------------------------------------
// Test cases for changeDirection
// Normal test cases
test('changeDirection - Starting north, turn 360 degrees right', () => {
  expect(func.changeDirection(func.NORTH, 'R')).toBe(func.EAST);
  expect(func.changeDirection(func.EAST, 'R')).toBe(func.SOUTH);
  expect(func.changeDirection(func.SOUTH, ' R ')).toBe(func.WEST);  // Test extra space as well
  expect(func.changeDirection(func.WEST, 'r')).toBe(func.NORTH);  // Test small caps as well
});

test('changeDirection - Starting north, turn 360 degrees left', () => {
  expect(func.changeDirection(func.NORTH, 'L')).toBe(func.WEST);
  expect(func.changeDirection(func.WEST, 'L')).toBe(func.SOUTH);
  expect(func.changeDirection(func.SOUTH, ' L ')).toBe(func.EAST);  // Test extra space as well
  expect(func.changeDirection(func.EAST, 'l')).toBe(func.NORTH);  // Test small caps as well
});

// Handle error test cases
test('changeDirection - Handle null values', () => {
  expect(func.changeDirection(null, 'R')).toBeNull();
  expect(func.changeDirection(func.NORTH, null)).toBeNull();
});

test('changeDirection - Handle out of bounds', () => {
  expect(func.changeDirection(-1, 'R')).toBeNull();
  expect(func.changeDirection(4, null)).toBeNull();
});

test('changeDirection - Handle wrong command', () => {
  expect(func.changeDirection(func.NORTH, 1)).toBeNull();
  expect(func.changeDirection(func.NORTH, 'F')).toBeNull();
});

// ------------------------------------------------------------------------------------------------
// Test cases for isCommandForward
// Handle true test cases
test('isCommandForward - Forward command', () => {
  expect(func.isCommandForward('F')).toBeTruthy();
});

test('isCommandForward - Forward command (lower case)', () => {
  expect(func.isCommandForward('f')).toBeTruthy();
});

// Handle error false cases
test('isCommandForward - Handle null', () => {
  expect(func.isCommandForward(null)).toBeFalsy();
});

test('isCommandForward - Handle none string', () => {
  expect(func.isCommandForward(12)).toBeFalsy();
});

test('isCommandForward - Handle empty string', () => {
  expect(func.isCommandForward('')).toBeFalsy();
});

test('isCommandForward - Handle wrong value', () => {
  expect(func.isCommandForward('M')).toBeFalsy();
});

// ------------------------------------------------------------------------------------------------
// Test cases for stepPosition
// Normal test cases
test('stepPosition - Go around', () => {
  let position = {x: 1, y: 1};

  expect(func.stepPosition(position, func.NORTH)).toStrictEqual({x: 1, y: 0}); // North
  expect(func.stepPosition(position, func.EAST)).toStrictEqual({x: 2, y: 1}); // East
  expect(func.stepPosition(position, func.SOUTH)).toStrictEqual({x: 1, y: 2}); // South
  expect(func.stepPosition(position, func.WEST)).toStrictEqual({x: 0, y: 1}); // West
});

// Handle error false cases
test('stepPosition - Wrong direction', () => {
  expect(func.stepPosition({x: 1, y: 1}, 5)).toBeNull();
});

// ------------------------------------------------------------------------------------------------
// Test cases for getDeltaXY
// Normal test cases
test('getDeltaXY - Get for north', () => {
  expect(func.getDeltaXY(func.NORTH)).toStrictEqual({x: 0, y: -1});
});

test('getDeltaXY - Get for south', () => {
  expect(func.getDeltaXY(func.SOUTH)).toStrictEqual({x: 0, y: 1});
});

test('getDeltaXY - Get for east', () => {
  expect(func.getDeltaXY(func.EAST)).toStrictEqual({x: 1, y: 0});
});

test('getDeltaXY - Get for west', () => {
  expect(func.getDeltaXY(func.WEST)).toStrictEqual({x: -1, y: 0});
});

// Handle error test cases
test('getDeltaXY - Handle null', () => {
  expect(func.getDeltaXY(null)).toBeNull();
});

test('getDeltaXY - Handle none number', () => {
  expect(func.getDeltaXY('1')).toBeNull();
});

test('getDeltaXY - Handle wrong value', () => {
  expect(func.getDeltaXY(4)).toBeNull();
});
