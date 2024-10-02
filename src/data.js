import React, { useState, useEffect } from 'react';
import './card.css';

// Priority and status icons (mocked paths)
const priorityLabels = {
    0: 'No Priority',
    1: 'Urgent',
    2: 'High',
    3: 'Medium',
    4: 'Low',
};

const statusIcons = {
    'todo': './assets/To-do.svg',
    'in progress': './assets/in-progress.svg',
    'backlog': './assets/Backlog.svg',
    'done': './assets/Done.svg',
};

const TicketCard = ({ ticket }) => {
    const { id, userId, status, title, tag } = ticket;
    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <span className="ticket-id">ID: {id}</span>
                <span className="ticket-user">User: {userId}</span>
            </div>
            <div className="ticket-title">
                <img src={statusIcons[status.toLowerCase()]} alt={status} className="status-icon" />
                {title}
            </div>
            <div className="ticket-tags">
                {tag.map((tagItem, index) => (
                    <span key={index} className="ticket-tag">{tagItem}</span>
                ))}
            </div>
        </div>
    );
};

const GroupedTicketsByPriority = ({ tickets }) => {
    const groupedByPriority = tickets.reduce((groups, ticket) => {
        groups[ticket.priority] = groups[ticket.priority] || [];
        groups[ticket.priority].push(ticket);
        return groups;
    }, {});

    return (
        <>
            {Object.entries(groupedByPriority).map(([priority, tickets]) => (
                <div key={priority} className="priority-column">
                    <h2>Priority: {priorityLabels[priority]} ({tickets.length})</h2>
                    {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                </div>
            ))}
        </>
    );
};

const GroupedTicketsByUser = ({ tickets }) => {
    const groupedByUser = tickets.reduce((groups, ticket) => {
        groups[ticket.userId] = groups[ticket.userId] || [];
        groups[ticket.userId].push(ticket);
        return groups;
    }, {});

    return (
        <>
            {Object.entries(groupedByUser).map(([userId, tickets]) => (
                <div key={userId} className="priority-column">
                    <h2>User ID: {userId} ({tickets.length})</h2>
                    {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                </div>
            ))}
        </>
    );
};

const GroupedTicketsByStatus = ({ tickets }) => {
    const groupedByStatus = tickets.reduce((groups, ticket) => {
        groups[ticket.status] = groups[ticket.status] || [];
        groups[ticket.status].push(ticket);
        return groups;
    }, {});

    return (
        <>
            {Object.entries(groupedByStatus).map(([status, tickets]) => (
                <div key={status} className="priority-column">
                    <h2>Status: {status} ({tickets.length})</h2>
                    {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                </div>
            ))}
        </>
    );
};

const DropdownMenu = ({ groupBy, setGroupBy }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupingClick = (option) => {
        setGroupBy(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                Group By: {groupBy}
                <img src='./assets/down.svg' style={{ marginLeft: '5px' }} alt="Dropdown" />
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li onClick={() => handleGroupingClick('priority')}>Priority</li>
                    <li onClick={() => handleGroupingClick('userId')}>User ID</li>
                    <li onClick={() => handleGroupingClick('status')}>Status</li>
                </ul>
            )}
        </div>
    );
};

const DataFetchingComponent = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupBy, setGroupBy] = useState('status'); // Default grouping set to 'status'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                const result = await response.json();
                setTickets(result.tickets);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="ticket-container">
            <DropdownMenu groupBy={groupBy} setGroupBy={setGroupBy} />
            <div className="priority-columns">
                {groupBy === 'priority' && <GroupedTicketsByPriority tickets={tickets} />}
                {groupBy === 'userId' && <GroupedTicketsByUser tickets={tickets} />}
                {groupBy === 'status' && <GroupedTicketsByStatus tickets={tickets} />}
            </div>
        </div>
    );
};

export default DataFetchingComponent;