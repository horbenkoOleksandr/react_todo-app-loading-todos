import React from "react"

type Props = {
    filter: 'All' | 'Active' | 'Сompleted'
    setFilter: (value: 'All' | 'Active' | 'Сompleted') => void;
}

export const TodoFilter: React.FC<Props> = ({filter, setFilter}) => {
    return (
        <nav className="filter" data-cy="Filter">
            <a
                href="#/"
                className={`filter__link ${filter === 'All' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('All')}
            >
                All
            </a>

            <a
                href="#/active"
                className={`filter__link ${filter === 'Active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('Active')}
            >
                Active
            </a>

            <a
                href="#/completed"
                className={`filter__link ${filter === 'Сompleted' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('Сompleted')}
            >
                Completed
            </a>
        </nav>
    )
}