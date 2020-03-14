import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form, Field } from 'react-final-form'
import { useState } from 'react';
import { useRouter } from 'next/router';

const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password)
}
`

const LoginPage = () => {
  const [login] = useMutation(LOGIN);
  const [failed, setFailed] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ username, password }: { username: string, password: string }) => {
    console.log('subb')
    const something = await login({ variables: { username, password } })
    if (something?.data?.login) {
      router.push('/')
    }
    setFailed(true)
  }

  return (
    <Form onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username</label>
          <Field name="username" component="input" placeholder="username" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="password" placeholder="password" />
        </div>
        <button type="submit" disabled={submitting}>
          Submit
          </button>
        {failed && <div>
          Login Failed</div>}
      </form>}
    />

  )
}
export default LoginPage;