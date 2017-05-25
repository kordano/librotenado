import React from "react"

const Input = ({placeholder, onChange, value}) =>
  <input value={value} 
    placeholder={placeholder}
    onChange={onChange}>
  </input>

const Button = ({onClick, children}) =>
  <button onClick={onClick}>
    {children}
  </button>

class Capture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      value: "",
      isExpense: true
    }

    this.createChangeHandler = this.createChangeHandler.bind(this)
    this.resetInput = this.resetInput.bind(this)
  }
  createChangeHandler(val) {
    return (e) => {
      let newState = {}
      newState[val] = e.target.value
      this.setState(newState)
    }
  }
  resetInput() {
    this.setState({
      description: "",
      value: "",
      isExpense: true
    })
  }
  render() {
    return (
      <div className="widget capture-widget">
        <h3>New Transaction</h3>
        <Input placeholder="Description" 
          onChange={ this.createChangeHandler("description") }
          value={this.state.description}>
        </Input>
        <Input placeholder="Value" 
          onChange={ this.createChangeHandler("value") }
          value={this.state.value}>
        </Input>
        <Button onClick={(e) => {
            this.props.addTransaction(this.state)
            this.resetInput()
          }}>
          Add
        </Button>
      </div>)
  }
}

export default Capture
