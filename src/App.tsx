import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import Filter from './Components/Filter.component'
import ContentBox from './Components/ContentBox.component'

let tags: any = [
  {
    tag: 'Include Tags',
    value: [
      {
        key: 1,
        value: 'Greetings'
      },
      {
        key: 2,
        value: 'Greetings'
      },
      {
        key: 3,
        value: 'Greetings'
      },
      {
        key: 4,
        value: 'Greetings'
      }
    ]
  },
  {
    tag: 'Exclude Tags',
    value: [
      {
        key: 1,
        value: 'Greetings'
      },
      {
        key: 2,
        value: 'Greetings'
      },
      {
        key: 3,
        value: 'Greetings'
      },
      {
        key: 4,
        value: 'Greetings'
      }
    ]
  }
]

function App() {

  const updateArray = (id: number, item: string) => {
    for(var i=0; i< tags.length; i++) {
      if(tags[i].tag === item)
      {
        tags[i].value[id].active = true;
      }
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={3} lg={3} className='p-3'>
            <div className="d-flex">
              <FontAwesomeIcon icon={faAlignRight} className='mt-1' />
              <div className="mx-3"><strong>Audience</strong></div>
              <div className="text-muted small ms-auto mt-1">100 Contacts</div>
            </div>
            <div>
              <Filter tags={tags} updateArray={updateArray}/>
            </div>
          </Col>
          <Col xs={9} lg={9}>
            <ContentBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
