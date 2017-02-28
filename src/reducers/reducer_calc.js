export default function(state = {
  equation: "",
  input: "",
  clearInput: false,
  total: "",
  isFinished: false
}, action) {
  switch(action.type) {
  case 'APPEND_INPUT':
    if(state.clearInput){
      return Object.assign({}, state, {
        input: action.payload,
        clearInput: false
      })
    } else {
      return Object.assign({}, state, {
        input: state.input + action.payload,
        clearInput: false
      })
    }
  case 'APPEND_EQUATION':
    if(state.total === "") {
      return Object.assign({}, state, {
        equation: state.equation + state.input + action.payload,
        total: parseInt(state.input),
        clearInput: true,
        currentOper: action.payload
      })
    } else {
      switch (state.currentOper) {
        case '*':
          return Object.assign({}, state, {
            equation: state.equation + state.input + action.payload,
            total: state.total * parseInt(state.input),
            clearInput: true,
            currentOper: action.payload
          })
        case '-':
          return Object.assign({}, state, {
            equation: state.equation + state.input + action.payload,
            total: state.total - parseInt(state.input),
            clearInput: true,
            currentOper: action.payload
          })
        case '+':
          return Object.assign({}, state, {
            equation: state.equation + state.input + action.payload,
            total: state.total + parseInt(state.input),
            clearInput: true,
            currentOper: action.payload
          })
        case '/':
          return Object.assign({}, state, {
            equation: state.equation + state.input + action.payload,
            total: state.total / parseInt(state.input),
            clearInput: true,
            currentOper: action.payload
          })
      }
    }
  case 'CLEAR_INPUT':
    return Object.assign({}, state, {
      input: ""
    })
  case 'CLEAR_EQUATION':
    return Object.assign({}, state, {
      equation: "",
      input: "",
      total: ""
    })
  case 'BACK_SPACE':
    return Object.assign({}, state, {
      input: state.input.slice(0, -1)
    })
  case 'TOTAL':
    switch (state.currentOper) {
      case '*':
        return Object.assign({}, state, {
          equation: state.equation + state.input,
          input: state.total * parseInt(state.input),
          total: state.total * parseInt(state.input),
          currentOper: ""
        })
      case '-':
        return Object.assign({}, state, {
          equation: state.equation + state.input,
          input: state.total - parseInt(state.input),
          total: state.total - parseInt(state.input),
          currentOper: ""
        })
      case '+':
        return Object.assign({}, state, {
          equation: state.equation + state.input,
          input: state.total + parseInt(state.input),
          total: state.total + parseInt(state.input),
          currentOper: ""
        })
      case '/':
        return Object.assign({}, state, {
          equation: state.equation + state.input,
          input: state.total / parseInt(state.input),
          total: state.total / parseInt(state.input),
          currentOper: ""
        })
    }
  default:
    return state
  }
}
