import { styled, Container } from '@mui/material';
import React, { FormEventHandler, useRef, useState } from 'react';
import { PageTitle } from '../components/pageTitle';


export const getServerSideProps = async () => {
    const baseUrl = process.env.BASE_URL;

    return {
        props: {
            baseUrl
        }
    }
}

const MainContainer = styled(Container)(({ theme }) => ({
    width: '80%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

const ContactTitle = styled('h1')({
    textAlign: 'center',
});

const Form = styled('form')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '10% 0',
    [theme.breakpoints.down('md')]: {
        padding: '10%',
    },
}));

const SubmitButton = styled('button')(({ theme }) => ({
    cursor: 'pointer',
    width: '50%',
    height: '3rem',
    margin: '10% auto',
    background: 'transparent',
    boxShadow: 'none',
    border: `double 3px ${theme.palette.primary.main}`,
    color: theme.palette.text.primary
}));

const Input = styled('input')(({ theme }) => ({
    border: 'none',
    outline: 'none',
    borderBottom: `double 3px ${theme.palette.primary.main}`,
    background: theme.palette.secondary.main,
    color: theme.palette.text.primary,
}));

const TextArea = styled('textarea')(({ theme }) => ({
    border: `double 3px ${theme.palette.primary.main}`,
    background: theme.palette.secondary.main,
    outline: 'none',
    resize: 'none',
    color: theme.palette.text.primary
}));

interface IStatusProps {
    code: number;
}

interface IStatus {
    [code: number]: {
        message: string;
        color: string;
    };
}

const statuses: IStatus = {
    200: {
        message: 'Thank you for contacting me!',
        color: 'green',
    },
    400: {
        message: 'Please make sure to fill out all the fields.',
        color: 'red',
    },
    406: {
        message: 'Please make sure the email is valid.',
        color: 'red',
    },
    500: {
        message: 'Server error, please try again later. Thank you.',
        color: 'red',
    },
};

const StatusMessage = ({ code }: IStatusProps) => {
    const StatusContainer = styled(Container)({
        border: `double 4px ${statuses[code].color}`,
        widows: '80%',
        marginTop: '5%',
    });
    const StatusMessage = styled('h5')({
        color: `${statuses[code].color}`,
        textAlign: 'center',
    });

    return (
        <StatusContainer>
            <StatusMessage>{statuses[code].message}</StatusMessage>
        </StatusContainer>
    );
};


const Contact = ({ baseUrl }: { baseUrl: string }) => {
    const [errorCode, setErrorCode] = useState<number | null>();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: FormEventHandler<HTMLFormElement> | any) => {
        e.preventDefault();
        if (!(email && message && name)) {
            _showStatusMessage(400);
            return
        }
        const regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        if (!(regex.exec(email))) {
            _showStatusMessage(406);
            return
        }
        try {
            // const response = await fetch(`${BASE_URL}/api/contact`, {
            const response = await fetch(`${baseUrl}/portfolio/contact-me/`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            if (!response.ok) {
                _showStatusMessage(500);
                return;
            }
            _showStatusMessage(200);
        } catch (error) {
            console.error(error);
            _showStatusMessage(500);
        }
    };

    const _showStatusMessage = (code: number) => {
        setErrorCode(code);

        setTimeout(() => {
            setErrorCode(null);
        }, 2000);
    };

    return (
        <MainContainer>
            <PageTitle>Contact Me</PageTitle>
            <Form onSubmit={handleSubmit}>
                <Input placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' type="text" name="name" id="name-input" />
                <br />
                <br />
                <Input placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} name="email" type='email' id="email-input" autoComplete='off' />
                <br />
                <br />
                <TextArea
                    placeholder='Your Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    id="message-input"
                    contentEditable={false}
                    cols={30}
                    rows={10}
                />
                <br />
                <SubmitButton disabled={!!errorCode} type="submit">Send Message</SubmitButton>
            </Form>
            {errorCode && <StatusMessage code={errorCode} />}
        </MainContainer>
    );
};

export default Contact;
