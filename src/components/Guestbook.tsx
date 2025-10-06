'use client';

import { useState, useEffect } from 'react';

export default function Guestbook() {
    const [messages, setMessages] = useState<GuestbookMessage[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
    };

    interface GuestbookMessage {
        id: string | number;
        name: string;
        message: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });
        setName('');
        setMessage('');
        fetchMessages();
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Guestbook</h1>
            <p>Leave a message for me!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br />
                <label htmlFor="message">Message:</label><br />
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea><br /><br />
                <input type="submit" value="Submit" />
            </form>

            <div id="guestbook-messages">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <p><strong>{msg.name}</strong></p>
                        <p>{msg.message}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}
