import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSongsList from '../queries/fetchSongsList'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{query:fetchSongsList}]
      })
      .then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to='/'>
          <i className='material-icons'>home</i>
        </Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='title'>Song title:</label>
          <input
            name='title'
            id='title'
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
