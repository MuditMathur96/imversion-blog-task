import CreateForm from '@/components/create-form'
import Editor from '@/components/editor/editor'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import path from 'path'
import fs from 'fs';
import React from 'react'

type Props = {}

const client = new ApolloClient({
  uri:"http://localhost:8000/",
  cache:new InMemoryCache()
})


function CreatePost({}: Props) {
  return (
    
      <CreateForm />
    
  )
}

export default CreatePost