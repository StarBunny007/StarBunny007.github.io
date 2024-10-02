import React from 'react';
import './card.css';
const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.title}</h3>
            <p>ID: {ticket.id}</p>
            <p>User: {ticket.userId}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Tags: {ticket.tag.join(', ')}</p>
        </div>
    );
};

export default TicketCard;
