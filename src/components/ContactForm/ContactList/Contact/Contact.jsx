import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';
import { FaPhoneAlt } from 'react-icons/fa';

const Contact = ({ contact, onDelete }) => {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <p className={styles.name}>{contact.name}</p>
          <span className={styles.badge}>Contact</span>
        </div>
        <div className={styles.numberRow}>
          <FaPhoneAlt color="rgba(234, 240, 255, 0.65)" />
          <p className={styles.number}>{contact.number}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => onDelete(contact.id)}
          className={styles.deleteBtn}
          aria-label={`Delete ${contact.name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
