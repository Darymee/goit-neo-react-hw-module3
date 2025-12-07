import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="search" className={styles.label}>
        Find contacts by name
      </label>

      <input
        id="search"
        name="search"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Type a name..."
        className={styles.input}
        autoComplete="off"
      />

      <div className={styles.hint}>Search is case-insensitive</div>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
