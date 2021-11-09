import React, { useState, useEffect } from 'react';
import LoacalStorageService from '../services/LocalStorageService';
import * as constants from '../constants/Constants';

const Header = ({ onSearchStringChange }) => {
    const [searchString, setSearchString] = useState('');
    const [condition, setCondition] = useState(constants.CONDITION_AND);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [searchResults, setSearchResults] = useState(
        LoacalStorageService.getValues()
    );

    let saveClick = () => {
        const isAdded = LoacalStorageService.addValue(searchString);
        if (isAdded) {
            setSearchResults([
                ...searchResults,
                { key: Date.now(), value: searchString },
            ]);
        }
    };

    useEffect(() => {
        const separator = condition === constants.CONDITION_AND ? '+' : '|';
        const options = selectedOptions.join(separator);

        setSearchString(options);
        onSearchStringChange(options);
    }, [selectedOptions, condition]);

    const onSelectedOptionChange = (e) => {
        let value = e.target.value;
        const checked = e.target.checked;

        const options = checked
            ? [...selectedOptions, value]
            : [...selectedOptions.filter((o) => o !== value)];
        setSelectedOptions(options);
    };

    const onStringChange = (e) => {
        setSearchString(e.target.value);
        onSearchStringChange(e.target.value);
    };

    return (
        <div className="header-container">
            <div>Image Gallery</div>
            <div>
                <input
                    type="text"
                    onChange={onStringChange}
                    placeholder="search for images..."
                    value={searchString}
                />

                <button onClick={saveClick}>Save</button>
            </div>
            <div className="option-container">
                Select saved option:
                <div className="options">
                    {searchResults.map((item) => (
                        <label key={item.key}>
                            <input
                                type="checkbox"
                                name="checkbox"
                                value={item.value}
                                onChange={onSelectedOptionChange}
                            />
                            {item.value}
                        </label>
                    ))}
                </div>
                <div>
                    <select onChange={(e) => setCondition(e.target.value)}>
                        <option value={constants.CONDITION_AND}>And</option>
                        <option value={constants.CONDITION_OR}>Or</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Header;
