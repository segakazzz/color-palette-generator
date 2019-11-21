class ColorPallet extends React.Component {
  state = {
    color: this.getRandomColor(),
    isLocked : false
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.isUpdateRequired !== this.props.isUpdateRequired 
                  || this.state.isLocked !== nextState.isLocked
  }

  componentDidUpdate(){
    if (this.props.isUpdateRequired && !this.state.isLocked){
      this.changeColor()
    }
  }

  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  changeColor () {
    this.setState({color: this.getRandomColor()})
    this.props.handleComplete()
  }

  toggleLock(e) {
    this.setState({
        isLocked: !this.state.isLocked
    })
    e.stopPropagation()
  }

  render () {
    return (
      <div
        style={{
          width: 200,
          height: 200,
          border: '1px solid black',
          backgroundColor: this.state.color
        }} onClick={this.changeColor.bind(this)}
      >
        <p>{this.state.color}</p>
    <button onClick={this.toggleLock.bind(this)}>
        {this.state.isLocked ? 'UnLock' : 'Lock'}</button>
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isUpdateRequired: false
    }
    this.handleRandomColors = this.handleRandomColors.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }

  handleRandomColors(){
    this.setState({
      isUpdateRequired: true
    })
  }

  handleComplete(){
    console.log(this.state)
    if(this.state.isUpdateRequired){
      this.setState({
        isUpdateRequired: false
      })
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.handleRandomColors}>Randamize Colors</button>
        <div style={{ display: 'flex' }}>
          <ColorPallet {...this.state} handleComplete={this.handleComplete}/>
          <ColorPallet {...this.state} handleComplete={this.handleComplete}/>
          <ColorPallet {...this.state} handleComplete={this.handleComplete}/>
          <ColorPallet {...this.state} handleComplete={this.handleComplete}/>
          <ColorPallet {...this.state} handleComplete={this.handleComplete}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
