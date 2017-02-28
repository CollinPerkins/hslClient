export function appendInput(char) {
  return {
    type: 'APPEND_INPUT',
    payload: char
  };
}

export function backSpace() {
  return {
    type: 'BACK_SPACE'
  };
}

export function appendEquation(oper) {
  return {
    type: 'APPEND_EQUATION',
    payload: oper
  };
}

export function clearInput() {
  return {
    type: 'CLEAR_INPUT'
  };
}

export function clearEquation() {
  return {
    type: 'CLEAR_EQUATION'
  };
}

export function total() {
  return {
    type: 'TOTAL'
  };
}
