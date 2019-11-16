import './index.scss';

import * as React from 'react';
import { Col, Row,Panel,Button,Avatar } from 'tinper-bee';

import { Link } from 'react-router-dom';
import error401 from '../../images/401.png';
import error404 from '../../images/404.png';
import error500 from '../../images/500.png';

class Exception extends React.Component<any, any> {

  render() {
    const exception = [
      { errorCode: '404', errorImg: error404, errorDescription: 'Sorry, the page you visited does not exist' },
      {
        errorCode: '401',
        errorImg: error401,
        errorDescription: 'Sorry, you dont have access to this page',
      },
      { errorCode: '500', errorImg: error500, errorDescription: 'Sorry, the server is reporting an error' },
    ];

    let params = new URLSearchParams(this.props.location.search);
    const test = params.get('type');
    let error = exception.find(x => x.errorCode === test);

    if (error == null) {
      error = exception[0];
    }

    //<Avatar shape="square" className={'errorAvatar'} src={error!.errorImg} />

    return (
      <Panel>
      <Row style={{ marginTop: 50,textAlign:'center' }}>
        
      <h1 className={'errorTitle'}>{error!.errorCode}</h1>

      <h5 className={'errorDescription'}> {error!.errorDescription}</h5>

      <Button type={'primary'}>
              <Link
                to={{
                  pathname: '/',
                }}
              >
                Back to Home
              </Link>
      </Button>

      </Row>
      </Panel>
    );
  }
}

export default Exception;
