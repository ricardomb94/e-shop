import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'

const SearchBox = ( { history } ) => {
  //Here we can define our component state with a keyword we will pass to the form
  const [keyword, setKeyword] = useState( '' )

  const submitHandler = ( e ) => {
    e.preventDefault()
    if ( keyword.trim() ) {
      history.push( `/search/${keyword}` )
    } else {
      history.push( '/' )
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={( e ) => setKeyword( e.target.value )}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 rounded'
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2 btn search-btn btn rounded'
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
