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
  TreeSelect, Divider, Row, Col, Modal, notification
} from 'antd';
import { SearchOutlined, BarsOutlined, CloseOutlined, SaveOutlined, DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';


const openNotificationGuardar = placement => {
  notification.info({
    message: `Notification `,
    description:
      'Registro ingresado correctamente.',
    placement,
  });
};
const openNotificationEditar = placement => {
  notification.info({
    message: `Notification `,
    description:
      'Registro editado correctamente.',
    placement,
  });
};
const openNotificationEliminar = placement => {
  notification.info({
    message: `Notification `,
    description:
      'Registro eliminado correctamente.',
    placement,
  });
};

class Role extends Component {
  state = {
    selectedRowKeys: [],
    data: [],
    columns: [],
    editNew: 0,//1 nuevo ,2 editar
    flagModal: false,
    flagModalEliminar: false,
    fields: {},
    errors: {},
    descriptionrole: "",
    isavailablerole: false,
    namerole: "",
    disableControl: false,
    disableNuevo: false,
    disableEditar: false,
    disableGuardar: false,
    disableEliminar: false,
    disableCancelar: false,
    flagNuevo: false,


  };
  componentDidMount() {
    this.getInformation();
  };
  handleOk = async e => {
    console.log(e);
    //insert
    if (this.handleValidationDetail()) {
      this.guardarRegistro();
      await this.getInformation();

      this.setState({
        flagModal: false,
      });
    }
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      flagModal: false,
    });
  };
  handleOkEliminar = async e => {
    this.setState({
      flagModalEliminar: false,
    });
    this.eliminarRegistro();
    await this.getInformation();
    console.log('OK');


  };
  handleCancelEliminar = e => {
    this.setState({
      flagModalEliminar: false,
    });
    console.log('cancel');
  };
  editRole = (record) => {
    this.setState({ editNew: 2 });//editar
    console.log('seleccion:', record);
    this.setState({ flagModal: true });
    this.setFields(record);
  };
  eliminarRole = (record) => {
    this.setFields(record);
    console.log('eliminar:', record);
    this.setState({ flagModalEliminar: true });

  };
  columns = [

    {
      title: 'Id',
      dataIndex: 'idrole',
      render: (text) => <a>{text}</a>,
    },
    /*{
      title: 'isavailablerole',
      dataIndex: 'isavailablerole',
      render: (text) => <a>{text}</a>,
    },*/
    {
      title: 'Nombre',
      dataIndex: 'namerole',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Descripción',
      dataIndex: 'descriptionrole',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Editar',
      dataIndex: 'idrole',
      render: (text, record) => {
        let control = ''
        return <Button type="primary" size="small" shape="circle" icon={<EditFilled
          onClick={() =>
            this.editRole(record)
          }
        />} />
      },
      //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
    },
    {
      title: 'Eliminar',
      dataIndex: 'idrole',
      render: (text, record) => {
        let control = ''
        return <Button type="primary" size="small" shape="circle" icon={<DeleteFilled
          onClick={() =>
            this.eliminarRole(record)
          }
        />} />
      },
      //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
    },
  ];
  handleValidationDetail() {
    console.log('en validacion');
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["descriptionrole"]) {
      formIsValid = false;
      errors["descriptionrole"] = "Campo obligatorio";
    }
    /*if (!fields["idrole"]) {
      formIsValid = false;
      errors["idrole"] = "Campo obligatorio";
    }
    if (!fields["isavailablerole"]) {
      formIsValid = false;
      errors["isavailablerole"] = "Campo obligatorio";
    }*/
    if (!fields["namerole"]) {
      formIsValid = false;
      errors["namerole"] = "Campo obligatorio";
    }
    this.setState({ errors: errors });

    console.log('errores', this.state.errors);
    return formIsValid;
  }
  handleChangeDinamyc(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    console.log('handleChangeDinamyc', e.target.value)
    this.setState({ fields });
  }
  handleChangeDinamycSelect(field, selectedOption) {
    let fields = this.state.fields;
    fields[field] = selectedOption;
    console.log('handleChangeDinamycSelect', selectedOption)
    this.setState({ fields });
  }
  handleChangeDinamycDate(field, date, dateString) {
    let fields = this.state.fields;
    fields[field] = date;
    console.log('handleChangeDinamycDate', date)
    this.setState({ fields });
  }
  handleChangeDinamycBool(field, stateSwitch) {
    let fields = this.state.fields;
    fields[field] = stateSwitch;
    console.log('handleChangeDinamycBool', stateSwitch)
    this.setState({ fields });
  }
  resetFields = () => {
    let fields = this.state.fields;
    fields['idrole'] = 0;
    fields['descriptionrole'] = '';
    fields['isavailablerole'] = '';
    fields['namerole'] = '';
    this.setState({ fields });
  }
  setFields = (record) => {
    let fields = this.state.fields;
    fields['idrole'] = record.idrole;
    fields['descriptionrole'] = record.descriptionrole;
    fields['namerole'] = record.namerole;
    this.setState({ fields });
  }

  getInformation = async () => {
    await axios.get('https://localhost:44315/api/Role/getRole')
      .then(response => {
        var options = response.data.map(function (row) {
          return {
            "key": row.idrole,
            "descriptionrole": row.descriptionrole,
            "idrole": row.idrole,
            "isavailablerole": row.isavailablerole,
            "namerole": row.namerole,
          }
        })
        this.setState({ data: options });
        console.log('data', options);
      }
      )
  };
  editInformation = async (descriptionrole, idrole, isavailablerole, namerole) => {
    const param = {
      "descriptionrole": descriptionrole,
      "idrole": idrole,
      "isavailablerole": isavailablerole,
      "namerole": namerole,
    }
    console.log('param', param);
    await axios.put('https://localhost:44315/api/Role/update', param)
      .then(response => {
        console.log('data', response);
      }
      )
  };
  insertInformation = async (descriptionrole, idrole, isavailablerole, namerole) => {
    const param = {
      "descriptionrole": descriptionrole,
      "idrole": idrole,
      "isavailablerole": isavailablerole,
      "namerole": namerole,
    }
    await axios.post('https://localhost:44315/api/Role/insert', param)
      .then(response => {
        this.setState({ infoContract: response.data });
        console.log('data', response);
      }
      )
  };
  clickNuevo = () => {
    this.setState({ flagModal: true });
    this.setState({ editNew: 1 });
  };
  guardarRegistro = async () => {//nuevo y editar

    if (this.state.editNew == 1) {
      await this.insertInformation(this.state.fields["descriptionrole"], this.state.fields["idrole"], true, this.state.fields["namerole"]);
      openNotificationGuardar('topRight');
      await this.getInformation();
      this.resetFields();

    }
    else if (this.state.editNew == 2) {
      await this.editInformation(this.state.fields["descriptionrole"], this.state.fields["idrole"], true, this.state.fields["namerole"]);
      openNotificationEditar('topRight');
      await this.getInformation();
      this.resetFields();

    }

  }
  eliminarRegistro = async () => {
    this.editInformation(this.state.fields["descriptionrole"], this.state.fields["idrole"], false, this.state.fields["namerole"]);
    openNotificationEliminar('topRight');
    await this.getInformation();
  }
  modalForm = () => {
    return (
      < div >
        <Modal
          title="Confirmación"
          visible={this.state.flagModalEliminar}
          onOk={this.handleOkEliminar}
          onCancel={this.handleCancelEliminar}
          okText="Confirmar"
          cancelText="Cancelar"
          icon={ExclamationCircleOutlined}

        >
          <p>Esta seguro de eliminar el registro!!</p>
        </Modal>
        < Modal title="Rol"
          visible={this.state.flagModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={
            [
              < Button
                type="primary"
                onClick={this.handleOk}
              >
                Guardar
              </ Button >,
              < Button key="submit"
                type="primary"
                onClick={this.handleCancel}>
                Cancelar
              </ Button >,
            ]}
        >
          < Form >

            <Form.Item label="Nombre">
              <Input
                ref="namerole"
                value={this.state.fields["namerole"] || ''}
                onChange={this.handleChangeDinamyc.bind(this, "namerole")} />
              < span style={{ color: "red" }}>{this.state.errors["namerole"]}</ span >
            </Form.Item>
            <Form.Item label="Descripción:">
              <Input
                ref="descriptionrole"
                value={this.state.fields["descriptionrole"] || ''}
                onChange={this.handleChangeDinamyc.bind(this, "descriptionrole")} />
              < span style={{ color: "red" }}>{this.state.errors["descriptionrole"]}</ span >
            </Form.Item>
            {/*<Form.Item label="Activo" valuePropName="checked">
              <Switch
                onChange={this.handleChangeDinamycBool.bind(this, "isavailablerole")}
                checked={this.state.fields["isavailablerole"]}
          />
            </Form.Item>*/}

          </ Form >
        </ Modal >
      </ div >
    )
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="default"
        >
          < Form.Item >
            < Button
              onClick={() => this.clickNuevo()}
            > +Nuevo </ Button >
          </ Form.Item >
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            pagination={3}
            size={5}
          />
          <Divider />
          {this.modalForm()}
        </Form>
      </ div >
    );
  }
}
export default Role;
