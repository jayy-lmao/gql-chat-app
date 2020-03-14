import * as React from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { useRouter } from "next/router"

import { GET_CLAN_MESSAGES } from './get-clan-messages';
import { useState, useEffect } from 'react';
import { MESSAGE_SUBSCRIPTION } from './message-subscription';

import SendMessage from '../../components/send-message';

const ClanPage = () => {
  const router = useRouter();
  const { clanName } = router.query;
  const [newMessages, setNewMessages] = useState([]);
  const { loading, error, data } = useQuery(GET_CLAN_MESSAGES, { variables: { clanName } });
  const { data: newData, loading: subLoading, error: subError } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { clanName } })

  const currentMessages = data?.clanByName?.messages || [];
  const newMessage = newData?.newMessage;

  useEffect(() => {
    setNewMessages(newMessages.concat(newMessage || []))
  }, [newMessage])

  const messages = currentMessages.concat(newMessages)
  console.log({ messages })

  return loading ?
    <div>Loading...</div>
    : (
      <section>
        <h2>{clanName}</h2>
        <ul>
          {messages.map(message => <li key={message.id}>
            <p>{message.text}</p>
            <i>{message.author.username}</i>
          </li>)}
        </ul>
        <SendMessage clanId={data?.clanByName?.id} />
      </section>
    )
}

ClanPage.getInitialProps = async () => {
  return {};
}

export default ClanPage;