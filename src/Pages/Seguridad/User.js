import axios from 'axios';
import React, { Component } from 'react';
import {
  Table, Switch, Space,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect, Divider, Row, Col
} from 'antd';
const columns = [
  {
    title: 'birthdateuser',
    dataIndex: 'birthdateuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'createduser',
    dataIndex: 'createduser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'emailuser',
    dataIndex: 'emailuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'idrole',
    dataIndex: 'idrole',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'iduser',
    dataIndex: 'iduser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'isavailableuser',
    dataIndex: 'isavailableuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'lastnameuser',
    dataIndex: 'lastnameuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'nameuser',
    dataIndex: 'nameuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'passworduser',
    dataIndex: 'passworduser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'phoneuser',
    dataIndex: 'phoneuser',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'updateduser',
    dataIndex: 'updateduser',
    render: (text) => <a>{text}</a>,
  },
];

class User extends Component {
  state = {
    selectedRowKeys: [],
    data: [],
    columns: [],
    emailuser: "",
    isavailableuser: false,
    lastnameuser: "",
    nameuser: "",
    passworduser: "",
    phoneuser: "",
    disableControl: false,
    disableNuevo: false,
    disableEditar: false,
    disableGuardar: false,
    disableEliminar: false,
    disableCancelar: false,
    flagNuevo: false

  };
  componentDidMount() {
    this.getInformation();
    this.setState({ disableControl: true });
    this.setState({ disableNuevo: false });//puede crear registro nuevo
    this.setState({ disableEditar: true });//puede crear registro nuevo
    this.setState({ disableGuardar: true });//puede crear registro nuevo
    this.setState({ disableEliminar: true });//puede crear registro nuevo
    this.setState({ disableCancelar: true });//puede crear registro nuevo
  };
  getInformation = async () => {
    await axios.get('https://localhost:44315/api/User/getUser')
      .then(response => {
        var options = response.data.map(function (row) {
          return {
            "key": row.iduser,
            "birthdateuser": row.birthdateuser,
            "createduser": row.createduser,
            "emailuser": row.emailuser,
            "idrole": row.idrole,
            "iduser": row.iduser,
            "isavailableuser": row.isavailableuser,
            "lastnameuser": row.lastnameuser,
            "nameuser": row.nameuser,
            "passworduser": row.passworduser,
            "phoneuser": row.phoneuser,
            "updateduser": row.updateduser,
          }
        })
        this.setState({ data: options });
        console.log('data', options);
      }
      )
  };
  editInformation = async (birthdateuser, createduser, emailuser, idrole, iduser, isavailableuser, lastnameuser, nameuser, passworduser, phoneuser, updateduser) => {
    const param = {
      "birthdateuser": birthdateuser,
      "createduser": createduser,
      "emailuser": emailuser,
      "idrole": idrole,
      "iduser": iduser,
      "isavailableuser": isavailableuser,
      "lastnameuser": lastnameuser,
      "nameuser": nameuser,
      "passworduser": passworduser,
      "phoneuser": phoneuser,
      "updateduser": updateduser,
    }
    console.log('param', param);
    await axios.put('https://localhost:44315/api/Iva/update', param)
      .then(response => {
        console.log('data', response);
      }
      )
  };
  insertInformation = async (birthdateuser, createduser, emailuser, idrole, iduser, isavailableuser, lastnameuser, nameuser, passworduser, phoneuser, updateduser) => {
    const param = {
      "birthdateuser": birthdateuser,
      "createduser": createduser,
      "emailuser": emailuser,
      "idrole": idrole,
      "iduser": iduser,
      "isavailableuser": isavailableuser,
      "lastnameuser": lastnameuser,
      "nameuser": nameuser,
      "passworduser": passworduser,
      "phoneuser": phoneuser,
      "updateduser": updateduser,
    }
    await axios.post('https://localhost:44315/api/Iva/insert', param)
      .then(response => {
        this.setState({ infoContract: response.data });
        console.log('data', response);
      }
      )
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    if (selectedRowKeys.length > 1) {
      const lastSelectedRowIndex = [...selectedRowKeys].pop();
      this.setState({ selectedRowKeys: lastSelectedRowIndex });
    }
    this.setState({ selectedRowKeys });
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log('value changed: ', selectedRows);

    this.setState({ birthdateuser: selectedRows[0].birthdateuser });
    this.setState({ createduser: selectedRows[0].createduser });
    this.setState({ emailuser: selectedRows[0].emailuser });
    this.setState({ idrole: selectedRows[0].idrole });
    this.setState({ iduser: selectedRows[0].iduser });
    this.setState({ isavailableuser: selectedRows[0].isavailableuser });
    this.setState({ lastnameuser: selectedRows[0].lastnameuser });
    this.setState({ nameuser: selectedRows[0].nameuser });
    this.setState({ passworduser: selectedRows[0].passworduser });
    this.setState({ phoneuser: selectedRows[0].phoneuser });
    this.setState({ updateduser: selectedRows[0].updateduser });
    this.setState({ disableNuevo: true });
    this.setState({ disableEditar: false });
    this.setState({ disableGuardar: true });
    this.setState({ disableEliminar: true });
    this.setState({ disableCancelar: false });
    this.setState({ flagNuevo: false });
    console.log('codes', this.state.emailuser);
  };
  onChangeEmailuser = (e) => {
    this.setState({ emailuser: e.target.value })
  }
  onChangeIsavailableuser = (checked) => {
    console.log(`switch to ${checked}`);
  };
  onChangeLastnameuser = (e) => {
    this.setState({ lastnameuser: e.target.value })
  }
  onChangeNameuser = (e) => {
    this.setState({ nameuser: e.target.value })
  }
  onChangePassworduser = (e) => {
    this.setState({ passworduser: e.target.value })
  }
  onChangePhoneuser = (e) => {
    this.setState({ phoneuser: e.target.value })
  }
  clickNuevo = () => {
    this.setState({ flagNuevo: true });
    this.setState({ disableControl: false });
    this.setState({ disableNuevo: true });
    this.setState({ disableEditar: true });
    this.setState({ disableGuardar: false });
    this.setState({ disableCancelar: false });
  };
  clickEditar = () => {
    this.setState({ disableControl: false });
    this.setState({ disableEditar: true });
    this.setState({ disableGuardar: false });
    this.setState({ disableEliminar: true });
    this.setState({ disableCancelar: false });
  };
  clickGuardar = async () => {
    if (this.state.flagNuevo == false) {
      await this.editInformation(this.state.birthdateuser, this.state.createduser, this.state.emailuser, this.state.idrole, this.state.iduser, this.state.isavailableuser, this.state.lastnameuser, this.state.nameuser, this.state.passworduser, this.state.phoneuser, this.state.updateduser);
      this.getInformation();
      this.setState({ disableControl: true });
      this.setState({ disableNuevo: false });
      this.setState({ disableEditar: true });
      this.setState({ disableGuardar: true });
      this.setState({ disableEliminar: true });
      this.setState({ disableCancelar: true });
    }
    else {
      await this.insertInformation(this.state.birthdateuser, this.state.createduser, this.state.emailuser, this.state.idrole, this.state.iduser, this.state.isavailableuser, this.state.lastnameuser, this.state.nameuser, this.state.passworduser, this.state.phoneuser, this.state.updateduser);
      this.getInformation();
      this.setState({ disableControl: true });
      this.setState({ disableNuevo: false });
      this.setState({ disableGuardar: true });
      this.setState({ disableCancelar: true });
    }
  };
  clickEliminar = () => {
    this.setState({ disableControl: false });
  };
  clickCancelar = () => {
    this.setState({ disableControl: true });
    this.setState({ disableNuevo: false });
    this.setState({ disableEditar: true });
    this.setState({ disableGuardar: true });
    this.setState({ disableCancelar: true });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <h2>Usuario</h2>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="default"
        >
          <Table
            rowSelection={{
              type: 'radio',
              ...rowSelection
            }}
            type={Radio}
            columns={columns}
            dataSource={this.state.data}
            pagination={3}
            size={5}
          />
          <Divider />
          < Form.Item label="createduser">
            < DatePicker />
          </ Form.Item >
          <Form.Item label="emailuser">
            <Input
              disabled={this.state.disableControl}
              value={this.state.emailuser || ''}
              onChange={this.onChangeEmailuser} />
          </Form.Item>
          <Form.Item label="Activo" valuePropName="checked">
            <Switch
              onChange={this.onChangeIsavailableuser}
              checked={this.state.isavailableuser}
              disabled={this.state.disableControl}
            />
          </Form.Item>
          <Form.Item label="lastnameuser">
            <Input
              disabled={this.state.disableControl}
              value={this.state.lastnameuser || ''}
              onChange={this.onChangeLastnameuser} />
          </Form.Item>
          <Form.Item label="nameuser">
            <Input
              disabled={this.state.disableControl}
              value={this.state.nameuser || ''}
              onChange={this.onChangeNameuser} />
          </Form.Item>
          <Form.Item label="passworduser">
            <Input
              disabled={this.state.disableControl}
              value={this.state.passworduser || ''}
              onChange={this.onChangePassworduser} />
          </Form.Item>
          <Form.Item label="phoneuser">
            <Input
              disabled={this.state.disableControl}
              value={this.state.phoneuser || ''}
              onChange={this.onChangePhoneuser} />
          </Form.Item>
          < Form.Item label="updateduser">
            < DatePicker />
          </ Form.Item >
          <Row gutter={24}>
            <Col span={3}>
              <Form.Item >
                <Button
                  onClick={() => this.clickNuevo()}
                  disabled={this.state.disableNuevo}
                >Nuevo</Button>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item >
                <Button onClick={() => this.clickEditar()}
                  disabled={this.state.disableEditar}
                >Editar</Button>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item >
                <Button onClick={() => this.clickGuardar()}
                  disabled={this.state.disableGuardar}
                >Guardar</Button>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item >
                <Button
                  disabled={this.state.disableEliminar}
                >Eliminar</Button>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item >
                <Button onClick={() => this.clickCancelar()}
                  disabled={this.state.disableCancelar}
                >Cancelar</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default User;
