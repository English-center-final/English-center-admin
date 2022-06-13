import { Result } from 'antd';
import React from 'react';
import './style.scss';

NotFoundPage.propTypes = {};

function NotFoundPage() {
  return (
    <div id="not-found-page">
      <div className="main">
        <Result status="404" title="404" subTitle="Not found" />
      </div>
    </div>
  );
}

export default NotFoundPage;
