import React, { useState } from 'react';

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [groupingOpen, setGroupingOpen] = useState(false);
    const [orderingOpen, setOrderingOpen] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState('Status'); // Default grouping
    const [selectedOrdering, setSelectedOrdering] = useState('Priority'); // Default ordering

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupingClick = (groupingOption) => {
        setSelectedGrouping(groupingOption);
        setGroupingOpen(false); // Close the nested dropdown
    };

    const handleOrderingClick = (orderingOption) => {
        setSelectedOrdering(orderingOption);
        setOrderingOpen(false); // Close the nested dropdown
    };

    const toggleGroupingDropdown = () => {
        setGroupingOpen(!groupingOpen);
        setOrderingOpen(false); // Close ordering if open
    };

    const toggleOrderingDropdown = () => {
        setOrderingOpen(!orderingOpen);
        setGroupingOpen(false); // Close grouping if open
    };

    return (
        <>
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    <img src='./assets/display.svg' style={{ marginRight: '5px' }} alt="Display" />
                    {selectedGrouping} / {selectedOrdering}
                    <img src='./assets/down.svg' style={{ marginLeft: '5px' }} alt="Dropdown" />
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <li className="grouping-dropdown">
                            <span>Grouping</span>
                            <button className="dropdown-toggle" onClick={toggleGroupingDropdown}>
                                {selectedGrouping}
                                <img src='./assets/down.svg' style={{ marginLeft: '5px' }} alt="Dropdown" />
                            </button>
                            {groupingOpen && (
                                <ul className="nested-dropdown-menu">
                                    <li onClick={() => handleGroupingClick('Group by User')}>Group by User</li>
                                    <li onClick={() => handleGroupingClick('Group by Priority')}>Group by Priority</li>
                                    <li onClick={() => handleGroupingClick('Group by Status')}>Group by Status</li> {/* New grouping option */}
                                </ul>
                            )}
                        </li>
                        <li className="ordering-dropdown">
                            <span>Ordering</span>
                            <button className="dropdown-toggle" onClick={toggleOrderingDropdown}>
                                {selectedOrdering}
                                <img src='./assets/down.svg' style={{ marginLeft: '5px' }} alt="Dropdown" />
                            </button>
                            {orderingOpen && (
                                <ul className="nested-dropdown-menu">
                                    <li onClick={() => handleOrderingClick('Order Ascending')}>Order Ascending</li>
                                    <li onClick={() => handleOrderingClick('Order Descending')}>Order Descending</li>
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </div>

            <style jsx>{`
                .dropdown {
                    position: relative;
                }

                .dropdown-toggle {
                    display: flex;
                    align-items: center;
                    background-color: transparent;
                    padding: 5px 10px;
                    font-size: 12px;
                    border: 1px solid black;
                    cursor: pointer;
                    border-radius: 5px;
                    margin-left: 10px;
                }

                .dropdown-toggle:hover {
                    background-color: lightgrey;
                }

                .dropdown-menu {
                    display: block;
                    position: absolute;
                    background-color: grey;
                    min-width: 160px;
                    z-index: 1;
                    list-style-type: none;
                    padding: 0;
                    margin-top: 5px;
                    border-radius: 5px;
                }

                .dropdown-menu li {
                    padding: 12px 16px;
                    cursor: pointer;
                    background-color: white;
                    border-radius: 3px;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .dropdown-menu li:last-child {
                    border-bottom: none;
                }

                .nested-dropdown-menu {
                    position: absolute;
                    left: 100%;
                    top: 0;
                    background-color: #f9f9f9;
                    z-index: 2;
                    list-style-type: none;
                    padding: 0;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .nested-dropdown-menu li {
                    white-space: nowrap;
                    padding: 10px 16px;
                    margin: 2px 0;
                }

                .nested-dropdown-menu li:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </>
    );
}

export default DropdownMenu;