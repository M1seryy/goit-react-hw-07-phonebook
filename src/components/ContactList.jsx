import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  contactsSelector,
  filterSelector,
  loadingSelector,
} from 'redux/selectors';
import { getAllThunk } from 'redux/contactSlice';

const ContactList = () => {
  const filter = useSelector(filterSelector);
  const isLoading = useSelector(loadingSelector);
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const onDeleteItem = id => {
    // dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(getAllThunk());
  }, [dispatch]);

  return (
    <>
      <ul>
        {filter.length === 0
          ? isLoading === false
            ? contacts.map(item => {
                return (
                  <li key={nanoid()}>
                    {item.name}:{item.number}
                    <Button
                      onClick={() => onDeleteItem(item.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </li>
                );
              })
            : 'Loading'
          : filter.map(item => {
              return (
                <List key={nanoid()}>
                  <ListItem>
                    {item.name}:{item.number}
                    <Button
                      onClick={() => onDeleteItem(item.id)}
                      variant="contained"
                    >
                      Contained
                    </Button>
                  </ListItem>
                </List>
              );
            })}
      </ul>
    </>
  );
};

export default ContactList;
// {
//   "id": "id-1",
//   "name": "Rosie Simpson",
//   "number": "459-12-56"
//  },
//  {
//   "id": "id-2",
//   "name": "Hermione Kline",
//   "number": "443-89-12"
//  },
//  {
//   "id": "id-3",
//   "name": "Eden Clements",
//   "number": "645-17-79"
//  },
//  {
//   "id": "id-4",
//   "name": "Annie Copeland",
//   "number": "227-91-26"
//  }
