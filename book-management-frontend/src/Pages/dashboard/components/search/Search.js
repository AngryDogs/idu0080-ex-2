import React from 'react';

const Search = (props) => (
    <div>
        <h1>
            Books<span className="text-info">.</span>
        </h1>
        <div className="input-group">
            <span className="input-group-addon">
                <i className="icon icon-search"></i>
            </span>
            <input
            type="text"
            onChange={event => props.onSearchHandler(event.target.value)}
            className="form-control"
            aria-label="Search"
            placeholder="Search..." />
        </div>
    </div>
);

export default Search;