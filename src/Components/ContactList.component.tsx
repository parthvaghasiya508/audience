import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button, Form } from 'react-bootstrap';
import { getMorecontacts } from "../redux/contact/contact.actions";
import { useDispatch, useSelector } from "react-redux";


const ContactList = (props: any) => {
  const hiddenLoadMoreBtnRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  
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
    onScroll();
  }, [])


  const handleSingleItemSelect = (contactId:any) => {
    let getContactArr = props.allSelectedIds;    
    let newArr = [];
    // UnSelect
    if(getContactArr.includes(contactId)) {
      console.log("included",getContactArr.find((item:any) => item === contactId));
      
      newArr = getContactArr.filter((item:any) => item !== contactId);
      props.setAllSelectedIdsFunc(newArr);
    }
    else {
      console.log("not included");
      newArr = [...getContactArr, contactId];
      props.setAllSelectedIdsFunc(newArr);
    }

    console.log("contactList.length:",contactList.length,"newArr.length:",newArr.length);
    
    if(contactList.length === newArr.length) {
      props.handleSelectAllFlagFunc(true)
    }
    else{
      props.handleSelectAllFlagFunc(false)
    }
  }
  

  const onScroll = () => {
    console.log('onScroll:');
    var eleContent = document.querySelector("div.content-body");
    if(eleContent) {
      eleContent.addEventListener('scroll', (event:any) => {
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        // console.log(`scrollTop:${scrollTop} |clientHeight:${clientHeight} | scrollHeight:${scrollHeight} | scrollTop + clientHeight:${scrollTop + clientHeight}`);
        
        if (parseInt(scrollTop + clientHeight) === scrollHeight) {
           // load more data
          console.log('Reached bottom');
          hiddenLoadMoreBtnRef?.current?.click();
        }
      });
    } 
  }

  const loadMore = () => {
    if(nextPage !== "") {
      dispatch(getMorecontacts({page:nextPage,filterQuery}));
    }
  }

  return (
    <div className='content-body'>
       <button ref={hiddenLoadMoreBtnRef} onClick={loadMore} style={{ display: "none" }} />
      {props.contacts.length > 0 && props.contacts.map((contact: any, index: number) => 
      <div className={`d-flex py-2 cursor-pointer`} key={index} onClick={()=> handleSingleItemSelect(contact.id)}>
        <div className={`${(props.allSelectedIds.includes(contact.id)) ? 'selectedItem' : ''} checkMarkCheck checkMark-secondary checkmark-lg-bg`}>
          <FontAwesomeIcon icon={faCheck} className='checkMark checkmark-lg'/>
        </div>
        <div className='d-flex ms-3 mt--10'>
          {
            contact.img && contact.img.url ? (
              <img src={contact.img.url} alt="" className='avatar' />
            ) :
            (<img src="https://i1.wp.com/roohentertainment.com/wp-content/uploads/2018/06/user-avatar-1.png?ssl=1" alt="" className='avatar' />)
          }
        </div>
        <div className='ms-2'>
          <p className='small mb-0'><strong>{contact.name}</strong></p>
          <p className='mb-0 small-sx'>{contact.phoneNumber}</p>
        </div>
        <div className="text-muted small ms-auto mt-1">
          {contact.tags.length > 0 && 
          contact.tags.map((tag:any,tindex:any) => (
            <Badge pill className='badge-primary' key={tindex}>
            <span className='mx-1'>{tag.name}</span> <FontAwesomeIcon icon={faTimes} className='plus-icon-size-sx' />
            </Badge>
          ))}
          <Button className='icon-size-sx primary-color ms-2'>
            <FontAwesomeIcon icon={faPlus} className='plus-icon-size-sx' />
          </Button>
        </div>
      </div>
      )}
    </div>
  ) 
}

export default ContactList;