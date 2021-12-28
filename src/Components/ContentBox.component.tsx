import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Contact from './Contact.component'
import { useDispatch, useSelector } from "react-redux";
import TokenService from '../services/token.service';
import { getcontacts } from "../redux/contact/contact.actions";

const ContentBox = (props: any) => {
  const dispatch = useDispatch();

  const [contacts, setContact] = useState([]);
  const token = TokenService.getUserToken();

  const contactList = useSelector(
    (state:any) => state?.contact?.list || []    
  );
  const nextPage = useSelector(
    (state:any) => state?.contact?.nextPage || ""
  );
  const filterQuery = useSelector(
    (state:any) => state?.contact?.filterQuery || ""
  );
  useEffect(() => {
    const fetchContactAPI = async () => {
      try {
        let param = {page:'', filterQuery:filterQuery};
        dispatch(getcontacts(param));
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchContactAPI();

  }, []);

  const handleKeyPress = async (event: any) => {
    try {
      console.log("event:",event.target.value);
      let searchquery = event.target.value;
      let param = {page:'',filterQuery:{...filterQuery, enable:true, searchQuery:searchquery} };
      dispatch(getcontacts(param));
    } catch (error) {
      console.log('error', error);

    }
  }

  return (
    <div>
      <div className="d-flex py-3">
        <div><strong>All Contacts ({contactList.length})</strong></div>
        <div className="text-muted small ms-auto mt-1">
          <Button className='icon-size-md primary-color'>
            <FontAwesomeIcon icon={faPlus} className='plus-icon-size-md' />
          </Button>
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <FontAwesomeIcon icon={faSearch} className='gray-color search-icon' />
        <Form.Control type="text" placeholder="Search contacts" onChange={handleKeyPress} className='input-search caption-size' />
      </div>
      <Contact contacts={contactList} />
    </div>
  )
}

export default ContentBox;