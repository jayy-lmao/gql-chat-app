import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form, Field } from 'react-final-form'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormState } from 'react-final-form-hooks';


const SEND_MESSAGE = gql`
mutation message($text: String!, $clanId: Int!){
  message(text: $text, clanId: $clanId){
    text
    author{
      username
    }
    clan{
      name
    }
  }
}
`

const SendMessage = ({ clanId }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  // const [failed, setFailed] = useState(false);
  // const [textValue, setTextValue] = useState('');

  const onSubmit = async ({ text }: { text: string }) => {
    const something = await sendMessage({ variables: { text, clanId } })
    console.log({ something })
  }
  console.log({ clanId })
  // const onChange = async (e) => {
  //   setTextValue(textValue.concat(e.target.value));
  // }
  // console.log({ textValue })

  return (
    <Form onSubmit={onSubmit}
      render={({ handleSubmit, submitting, form }) => <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
        <div>
          <Field name="text" component="textarea" placeholder="..." />
        </div>
        <button type="submit" disabled={submitting}>
          Send
          </button>
        {/* {failed && <div>
          Send</div>} */}
      </form>}
    />

  )
}
export default SendMessage;