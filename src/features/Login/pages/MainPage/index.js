import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd';
import loginApi from 'api/loginApi';
import { fetchNameRoles } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Login/loginSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import './main-page.scss';
import IMAGE_ACCOUNT_PAGE from 'assets/images/US-ENGLISH.png';


const { Text, Title } = Typography;

MainPage.propTypes = {};

const initialValues = {
  username: '',
  password: '',
};

function MainPage() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.global);
  const [isError, setError] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Tài khoản không được bỏ trống.'),
    password: Yup.string().required('Mật khẩu không được bỏ trống'),
  });

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      dispatch(setLoading(true));
      const response = await loginApi.login(username, password);

      localStorage.setItem('kltn-token', response.accessToken);
      dispatch(fetchNameRoles());
    } catch (error) {
      setError(true);
    }

    dispatch(setLoading(false));
  };

  return (
    <div id="account_page">
      {isLogin ? (
        <Redirect to="/admin" />
      ) : (
        <div className="account-common-page">
        <div className="account-wrapper">
          <div className="account_left">
            <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
          </div>

          <div className="account_right">
            <Title level={2} style={{ textAlign: 'center' }}>
              <Text style={{ color: '#4d93ff' }}>Đăng Nhập</Text>
            </Title>
            <Divider />
            <div className="form-account">
              <Formik
                initialValues={{ ...initialValues }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {(formikProps) => {
                  return (
                    <Form>
                      <Row gutter={[0, 8]}>
                        <Col span={24}>
                          <FastField
                            name="username"
                            component={InputField}
                            type="text"
                            title="Tài khoản"
                            placeholder="Nhập tài khoản"
                            maxLength={50}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>

                        <Col span={24}>
                          <FastField
                            name="password"
                            component={InputField}
                            type="password"
                            title="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            maxLength={200}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>
                        {isError ? (
                      <Col offset={8} span={16}>
                        <Tag
                          color="error"
                          style={{ fontWeight: 'bold' }}
                          icon={<CloseCircleOutlined />}
                        >
                          Tài khoản không hợp lệ
                        </Tag>
                      </Col>
                    ) : (
                      ''
                    )}

                        <Col span={24}>
                          <br />
                          <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
              <br/>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default MainPage;
