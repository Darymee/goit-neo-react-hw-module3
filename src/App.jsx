import { useMemo, useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactForm/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { normalizeName, normalizeNumber } from './utils/contactValidation';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import styles from './App.module.css';
import { toastErrorStyles, toastSuccessStyles } from './utils/toastStyles';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const STORAGE_KEY = 'contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialState;

      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialState;
    } catch {
      return initialState;
    }
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return contacts;
    return contacts.filter(c => c.name.toLowerCase().includes(normalized));
  }, [contacts, filter]);

  const addContact = ({ name, number }) => {
    const nameTrim = name.trim();
    const numberTrim = number.trim();

    const nameN = normalizeName(nameTrim);
    const numberN = normalizeNumber(numberTrim);

    const nameExists = contacts.some(c => normalizeName(c.name) === nameN);
    if (nameExists) {
      toast.error(`Контакт з ім'ям "${nameTrim}" вже існує.`, {
        style: toastErrorStyles,
      });
      return;
    }

    const numberExists = contacts.some(
      c => normalizeNumber(c.number) === numberN
    );
    if (numberExists) {
      toast.error(
        `Номер "${numberTrim}" вже використовується іншим контактом.`,
        { style: toastErrorStyles }
      );
      return;
    }

    setContacts(prev => [
      ...prev,
      { id: nanoid(), name: nameTrim, number: numberTrim },
    ]);

    toast.success(`Контакт "${nameTrim}" успішно збережен.`, {
      style: toastSuccessStyles,
    });
  };

  const deleteContact = id =>
    setContacts(prev => prev.filter(c => c.id !== id));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Phonebook</h1>
            <p className={styles.subtitle}>
              Add, find and manage your contacts
            </p>
          </div>
        </header>

        <main className={styles.grid}>
          <section className={styles.leftCol}>
            <h2 className={styles.sectionTitle}>New contact</h2>
            <ContactForm addContact={addContact} />

            <h2 className={styles.sectionTitle}>Search</h2>
            <SearchBox value={filter} onChange={setFilter} />
          </section>

          <section className={styles.rightCol}>
            <h2 className={styles.sectionTitle}>Contacts</h2>

            {filteredContacts.length === 0 ? (
              <div className={styles.empty}>
                No contacts found. Try another name or add a new contact.
              </div>
            ) : (
              <ContactList
                contacts={filteredContacts}
                onDelete={deleteContact}
              />
            )}
          </section>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}

export default App;
