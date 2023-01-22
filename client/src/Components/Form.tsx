import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import { Status, getStatusName } from '../Models/Status';
import LoginForm from './LoginForm';

const Form = (props: any) => {
    const [connection, setConnection] = useState<null | HubConnection>(null);
    const [status, setStatus] = useState<null | Status>(null);
    const [identificationState, setIdentificationState] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<number|null>(null);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("http://localhost:5020/hubs/Identification")
            .build();

        setConnection(connect);
    }, [loggedIn]);

    const sendMessage = async (u: any) => {
        setIdentificationState(true);
        if (connection) {
            connection.start()
                .then(() => {
                    connection.send('Identificate', JSON.stringify(u));
                    connection.on("statusChange", (status: Status) => setStatus(status));
                    connection.on("close", () => {
                        connection.stop();
                        setIdentificationState(false);
                    });
                })
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const register = (options: any) => {
        fetch('http://localhost:5020/api/Identification/register', options)
            .then(async res => {
                const j = await res.json();
                setUserId(j.value);
                res.ok ? setLoggedIn(true) : alert('error');
            })
            .catch(err => alert('error'))
    }

    return (
        <div>
            {!loggedIn && <LoginForm register={register}></LoginForm>}
            {loggedIn && !identificationState && <FormInput userId={userId} sendMessage={sendMessage}></FormInput>}
            {loggedIn && identificationState && <div>Статус: {getStatusName(status)}</div>}
        </div>
    );
};

export default Form;