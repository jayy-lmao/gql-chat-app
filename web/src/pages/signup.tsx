import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form, Field } from 'react-final-form'
import { useState } from 'react';
import { useRouter } from 'next/router';

const SIGNUP = gql`
mutation signup($username: String!, $password: String!){
  signup(username: $username, password: $password){
    username
  }
}
`

const SignupPage = () => {
  const [signup] = useMutation(SIGNUP);
  const [failed, setFailed] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ username, password }: { username: string, password: string }) => {
    console.log('subb')
    const something = await signup({ variables: { username, password } })
    if (something?.data?.signup) {
      router.push('/')
    }
    else { setFailed(true) }
  }

  return (
    <Form onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div>
          <label>Username</label>
          <Field name="username" component="input" placeholder="username" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="password" placeholder="username" />
        </div>
        <button type="submit" disabled={submitting}>
          Submit
          </button>
        {failed && <div>
          Signup Failed</div>}
      </form>}
    />

  )
}
export default SignupPage;