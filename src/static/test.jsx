class Test extends React.Component {
  state = {
    names: null,
  }
  componentDidMount() {
    this.load()
  }
  load = () => {
    $.get('/v1/name-ideas').then(({ names }) => {
      this.setState({ names })
    })
  }
  render() {
    return <div>
      <h1>band name ideas</h1>
      <button type='button' onClick={this.load}>more ideas</button>
      <ul>
        {!this.state.names && <li>Loading...</li>}
        {this.state.names && this.state.names.map((name => {
          return <li key={name}>{name}</li>
        }))}
      </ul>
    </div>
  }
}

ReactDOM.render(
  <Test/>,
  document.getElementById('root')
)
