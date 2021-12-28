import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import ContactList from './ContactList.component'

const Contact = (props: any) => {

  const [allSelected, setAllSelected] = useState(false);
  const [allSelectedIds, setAllSelectedIds] = useState([]);

  const contactList = useSelector(
    (state:any) => state?.contact?.list || []    
  );


  useEffect(() => {
    console.log("contactList", contactList.length, allSelectedIds.length);
    if(allSelected) {
      let contactIds = contactList.map((item:any) => item.id);      
      setAllSelectedIds(contactIds);
    }    
  }, [contactList])

 

  const selectAll = () => {
    let changeAllSelected = !allSelected;
    if(changeAllSelected) {
      let contactIds = contactList.map((item:any) => item.id);      
      setAllSelectedIds(contactIds);
    }
    else {
      setAllSelectedIds([]);
    }
    setAllSelected(changeAllSelected);    
  }

  const handleSelectAllFlag = (flag:any) => {
    console.log("flag:",flag);    
    setAllSelected(flag);
  }

  return (
    <div>
      <div className="d-flex py-3">
        <div className={`checkMarkCheck ${allSelected ? 'selectedItem' : ''}  checkMark-secondary checkmark-lg-bg`}>
          <FontAwesomeIcon icon={faCheck} className='checkMark checkmark-lg'/>
        </div>
        <div className='d-flex mt-2 ms-3 cursor-pointer' onClick={selectAll}>
          <h6 className='small'>
            Select All
          </h6>
        </div>
        <div className="text-muted small ms-auto">
          <Button className='normal-icon-size-md primary-color'>
            Export all
          </Button>
        </div>
      </div>
      <ContactList contacts={contactList} allSelectedIds={allSelectedIds} handleSelectAllFlagFunc={handleSelectAllFlag} setAllSelectedIdsFunc={setAllSelectedIds} />
    </div>
  ) 
}

export default Contact;