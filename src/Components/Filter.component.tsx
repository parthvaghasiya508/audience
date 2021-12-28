import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button, Form } from 'react-bootstrap';
import { getTags } from "../redux/tag/tag.actions";
import { useDispatch, useSelector } from "react-redux";
import { getcontacts } from "../redux/contact/contact.actions";


const Filter = (props: any) => {
  const dispatch = useDispatch();
  const [includeTags, setincludeTags] = useState([]);
  const [excludeTags, setexcludeTags] = useState([]);
  const [messageSent, setmessageSent] = useState({min:'', max:''});
  const [messageReceived, setmessageReceived] = useState({min:'', max:''});

  const tagList = useSelector(
    (state: any) => state?.tag?.list || []
  );
  const nextPage = useSelector(
    (state:any) => state?.contact?.nextPage || ""
  );
  const filterQuery = useSelector(
    (state:any) => state?.contact?.filterQuery || ""
  );

  useEffect(() => {
    dispatch(getTags());
  }, [])
  
  const handleIncludeTags = (tag:any) => {
    let tagArr:any  = includeTags;
    if(tagArr.includes(tag)) {
      let newArr:any = tagArr.filter((item:any) => item !== tag);
      setincludeTags(newArr);
    }
    else {
      let newArr:any = [...tagArr, tag];
      setincludeTags(newArr);      
    }
  }

  const handleExcludeTags = (tag:any) => {
    let tagArr:any  = excludeTags;
    if(tagArr.includes(tag)) {
      let newArr:any = tagArr.filter((item:any) => item !== tag);
      setexcludeTags(newArr);
    }
    else {
      let newArr:any = [...tagArr, tag];
      setexcludeTags(newArr);      
    }
  }

  const handleMessageSent = (name:any, value:any) => {
    let setValue = {...messageSent, [name]:value};
    console.log("setValue:",setValue);    
    setmessageSent(setValue);
  }

  const handleMessageRecieved = (name:any, value:any) => {
    let setValue = {...messageReceived, [name]:value};
    console.log("setValue2:",setValue);    
    setmessageReceived(setValue);
  }

  const handleFilterContact = () => {
    let filter = {
      ...filterQuery,
      enable: true,
      searchQuery: '',
      includeTags: includeTags,
      excludeTags: excludeTags,
      messageSent: [parseInt(messageSent.min) ,parseInt(messageSent.max)],
      messageRecieved: [parseInt(messageReceived.min), parseInt(messageReceived.max)],
  }
    let param = {page:'', filterQuery:filter};
    console.log("paramL",param);    
    dispatch(getcontacts(param));
  }

  return (
    <div>
      <div className='d-flex mt-3 mb-1'>
        <h6 className='small'>
          Include Tags:
        </h6>
      </div>
      <div className='sidebar-bg'>
        {tagList.map((tag: any, index: number) =>
          <div className='d-flex justify-content-between px-3 py-2 sidebar-main' key={index} onClick={() => handleIncludeTags(tag.name)}>
            <div className='caption-size text-left sidebar-nav'>
              {tag.name}
            </div>
            {
              includeTags.find(item => item === tag.name) && (
                <div className='checkMarkCheck checkMark-primary'>
                  <FontAwesomeIcon icon={faCheck} className='checkMark' />
                </div>
              )
            }
          </div>
        )}
      </div>

      <div className='d-flex mt-3 mb-1'>
        <h6 className='small'>
          Exclude Tags:
        </h6>
      </div>
      <div className='sidebar-bg'>
        {tagList.map((tag: any, index: number) =>
          <div className='d-flex justify-content-between px-3 py-2 sidebar-main' key={index} onClick={(e) => handleExcludeTags(tag.name)}>
            <div className='caption-size text-left sidebar-nav'>
              {tag.name}
            </div>
            {
              excludeTags.find(item => item === tag.name) && (
                <div className='checkMarkCheck checkMark-primary'>
                  <FontAwesomeIcon icon={faCheck} className='checkMark' />
                </div>
              )
            }
          </div>
        )}
      </div>


      <div>
        <div className='d-flex mt-3 mb-1'>
          <h6 className='small'>
            Message Sent:
          </h6>
        </div>
        <div className='d-flex'>
          <Form.Control type="number" placeholder="Min" className='m-2' value={messageSent.min} onChange={(e) => handleMessageSent("min",e.target.value)} />
          <Form.Control type="number" placeholder="Max" className='m-2' value={messageSent.max} onChange={(e) => handleMessageSent("max",e.target.value)} />
        </div>
      </div>
      <div>
        <div className='d-flex mt-3 mb-1'>
          <h6 className='small'>
            Message Received:
          </h6>
        </div>
        <div className='d-flex'>
          <Form.Control type="number" placeholder="Min" className='m-2' value={messageReceived.min} onChange={(e) => handleMessageRecieved("min",e.target.value)} />
          <Form.Control type="number" placeholder="Max" className='m-2' value={messageReceived.max} onChange={(e) => handleMessageRecieved("max",e.target.value)} />
        </div>
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" className='primary-color' onClick={handleFilterContact}>Save Filters</Button>
      </div>
    </div>
  )
}

export default Filter;