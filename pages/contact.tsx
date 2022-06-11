import { styled, Container } from '@mui/material';
import React, { FormEventHandler, useRef, useState } from 'react';


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

const Padding = () => (<><br /><br /></>);

const Contact = ({ baseUrl }: { baseUrl: string }) => {
    const formRef = useRef(null);
    const currentStatusCode = useRef(0);
    const [showStatusMessage, setShowStatusMessage] = useState(false);
    const handleSubmit = async (e: FormEventHandler<HTMLFormElement> | any) => {
        e.preventDefault();
        if (formRef.current) {
            const fd = new FormData(formRef.current);
            const name = fd.get('name');
            const email = fd.get('email');
            const message = fd.get('message');
            if (email && message && name) {
                try {
                    // const response = await fetch(`${BASE_URL}/api/contact`, {
                    const response = await fetch(`${baseUrl}/portfolio/contact-me/`, {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ name, email, message }),
                    });
                    _showStatusMessage(200);
                } catch (error) {
                    console.error(error);
                }
            } else {
                _showStatusMessage(400);
            }
        }
    };

    const _showStatusMessage = (code: number) => {
        currentStatusCode.current = code;
        setShowStatusMessage(true);
        setTimeout(() => {
            setShowStatusMessage(false);
        }, 6000);
    };

    return (
        <MainContainer>
            <ContactTitle>Contact Me</ContactTitle>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <label htmlFor="name-input">Your Name</label>
                <Input autoComplete='off' type="text" name="name" id="name-input" />
                <Padding />
                <label htmlFor="email-input">Your Email</label>
                <Input name="email" id="email-input" autoComplete='off' />
                <Padding />
                <label htmlFor="message-input">Your Message</label>
                <TextArea
                    name="message"
                    id="message-input"
                    contentEditable={false}
                    cols={30}
                    rows={10}
                />
                <br />
                <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
            {showStatusMessage && <StatusMessage code={currentStatusCode.current} />}
        </MainContainer>
    );
};

export default Contact;
