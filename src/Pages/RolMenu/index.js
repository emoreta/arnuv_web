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
    message: `Notification `,
    description:
      'Registro ingresado correctamente.',
    placement,
  });
};
const openNotificationEditar = placement => {
  notification.info({
    message: `Notification `,
    description:
      'Registro editado correctamente.',
    placement,
  });
};
const openNotificationEliminar = placement => {
  notification.info({
    message: `Notification `,
    description:
      'Registro eliminado correctamente.',
    placement,
  });
};
class Rolemenu extends Component {
  state = {
    selectedRowKeys: [],
    data: [],
    dataRole: [],
    dataMenu: [],
    columns: [],
    editNew: 0,//1 nuevo ,2 editar
    flagModal: false,
    flagModalEliminar: false,
    fields: {},
    errors: {},
    idmenu: 0,
    idrole: 0,
    idrolemenu: 0,
    isavailablerolemenu: false,
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

    this.getInformationRole();
    this.getInformationMenu();
  };
  handleOk = async e => {
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
    console.log(e);
    this.setState({
      flagModalEliminar: false,
    });
    this.eliminarRegistro();
    await this.getInformation();
  };
  handleCancelEliminar = e => {
    console.log(e);
    this.setState({
      flagModalEliminar: false,
    });
  };
  editRolemenu = (record) => {
    console.log('seleccion:', record);
    this.setState({ flagModal: true });
    this.setState({ editNew: 2 });//editar
    this.setFields(record);
  };
  eliminarRolemenu = (record) => {
    this.setFields(record);
    console.log('eliminar:', record);
    this.setState({ flagModalEliminar: true });

  };
  columns = [
    {
      title: 'Id',
      dataIndex: 'idrolemenu',
      render: (text) => <a>{text}</a>,
    },
    /*{
      title: 'idmenu',
      dataIndex: 'idmenu',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'idrole',
      dataIndex: 'idrole',
      render: (text) => <a>{text}</a>,
    },*/
    {
      title: 'namemenu',
      dataIndex: 'namemenu',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'namerole',
      dataIndex: 'namerole',
      render: (text) => <a>{text}</a>,
    },
    
    /*{
      title: 'isavailablerolemenu',
      dataIndex: 'isavailablerolemenu',
      render: (text) => <a>{text}</a>,
    },*/
    {
      title: 'Editar',
      dataIndex: 'iduser',
      render: (text, record) => {
        let control = ''
        return <Button type="primary" size="small" shape="circle" icon={<EditFilled
          onClick={() =>
            this.editRolemenu(record)
          }
        />} />
      },
      //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
    },
    {
      title: 'Eliminar',
      dataIndex: 'iduser',
      render: (text, record) => {
        let control = ''
        return <Button type="primary" size="small" shape="circle" icon={<DeleteFilled
          onClick={() =>
            this.eliminarRolemenu(record)
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
    if (!fields["idmenu"]) {
      formIsValid = false;
      errors["idmenu"] = "Campo obligatorio";
    }
    if (!fields["idrole"]) {
      formIsValid = false;
      errors["idrole"] = "Campo obligatorio";
    }
    /*if (!fields["idrolemenu"]) {
      formIsValid = false;
      errors["idrolemenu"] = "Campo obligatorio";
    }
    if (!fields["isavailablerolemenu"]) {
      formIsValid = false;
      errors["isavailablerolemenu"] = "Campo obligatorio";
    }*/
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
    fields['idmenu'] = 0;
    fields['idrole'] = 0;
    fields['idrolemenu'] = 0;
    fields['isavailablerolemenu'] = false;
    this.setState({ fields });
  }
  setFields = (record) => {
    let fields = this.state.fields;
    fields['idmenu'] = record.idmenu;
    fields['idrole'] = record.idrole;
    fields['idrolemenu'] = record.idrolemenu;
    fields['isavailablerolemenu'] = record.isavailablerolemenu;
    this.setState({ fields });
  }
  getInformation = async () => {
    await axios.get('https://localhost:44315/api/Rolemenu/getRolemenu')
      .then(response => {
        var options = response.data.map(function (row) {
          return {
            "key": row.idrolemenu,
            "idmenu": row.idmenu,
            "idrole": row.idrole,
            "idrolemenu": row.idrolemenu,
            "isavailablerolemenu": row.isavailablerolemenu,
            "namemenu":row.namemenu,
            "namerole":row.namerole

          }
        })
        this.setState({ data: options });
        console.log('data', options);
      }
      )
  };
  getInformationRole = async () => {
    await axios.get('https://localhost:44315/api/Role/getRole')
      .then(response => {
        var options = response.data.map(function (row) {
          return {
            "value": row.idrole,
            "descriptionrole": row.descriptionrole,
            "idrole": row.idrole,
            "isavailablerole": row.isavailablerole,
            "label": row.namerole,
          }
        })
        this.setState({ dataRole: options });
        console.log('data', options);
      }
      )
  };
  getInformationMenu = async () => {
    await axios.get('https://localhost:44315/api/Menu/getMenuCompleto')
        .then(response => {
            var options = response.data.map(function (row) {
                return {
                    "value": row.idmenu,
                    "childnodemenu": row.childnodemenu,
                    "iconmenu": row.iconmenu,
                    "idmenu": row.idmenu,
                    "isavailablemenu": row.isavailablemenu,
                    "label": 'NOMBRE:['+row.namemenu+']PAGINA:['+row.pagemenu+']',
                    "pagemenu": row.pagemenu,
                    "parentnodemenu": row.parentnodemenu,
                }
            })
            this.setState({ dataMenu: options });
            console.log('data', options);
        }
        )
};
  editInformation = async (idmenu, idrole, idrolemenu, isavailablerolemenu) => {
    const param = {
      "idmenu": idmenu,
      "idrole": idrole,
      "idrolemenu": idrolemenu,
      "isavailablerolemenu": isavailablerolemenu,
    }
    console.log('param', param);
    await axios.put('https://localhost:44315/api/Rolemenu/update', param)
      .then(response => {
        console.log('data', response);
      }
      )
  };
  insertInformation = async (idmenu, idrole, idrolemenu, isavailablerolemenu) => {
    const param = {
      "idmenu": idmenu,
      "idrole": idrole,
      "idrolemenu": idrolemenu,
      "isavailablerolemenu": isavailablerolemenu,
    }
    await axios.post('https://localhost:44315/api/Rolemenu/insert', param)
      .then(response => {
        this.setState({ infoContract: response.data });
        console.log('data', response);
      }
      )
  };
  guardarRegistro = async () => {//nuevo y editar

    if (this.state.editNew == 1) {
      await this.insertInformation(this.state.fields["idmenu"], this.state.fields["idrole"], this.state.fields["idrolemenu"], true);
      openNotificationGuardar('topRight');
      await this.getInformation();
      this.resetFields();

    }
    else if (this.state.editNew == 2) {
      await this.editInformation(this.state.fields["idmenu"], this.state.fields["idrole"], this.state.fields["idrolemenu"], true);
      openNotificationEditar('topRight');
      await this.getInformation();
      this.resetFields();

    }

  }
  eliminarRegistro = async () => {
    await this.editInformation(this.state.fields["idmenu"], this.state.fields["idrole"], this.state.fields["idrolemenu"], false);
    openNotificationEliminar('topRight');
    await this.getInformation();
  }
  clickNuevo = () => {
    this.resetFields();
    this.setState({ flagModal: true });
    this.setState({ editNew: 1 });
  };
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
        < Modal title="rolemenu"
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
            <Form.Item label="Menu">
              {/*<Input
                ref="idmenu"
                value={this.state.fields["idmenu"] || ''}
                onChange={this.handleChangeDinamyc.bind(this, "idmenu")} />
              < span style={{ color: "red" }}>{this.state.errors["idmenu"]}</ span >*/}
              <Select
                                    ref="idmenu"
                                    showSearch
                                    style={{ width: 602 }}
                                    placeholder="Menus"
                                    optionFilterProp="children"
                                    options={this.state.dataMenu}
                                    //onChange={this.onChangeAsientoContable}
                                    value={this.state.fields["idmenu"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "idmenu")}
                                ></Select>
                                <span style={{ color: "red" }}>{this.state.errors["idmenu"]}</span>
            </Form.Item>
            <Form.Item label="Role">
              {/*<Input
                ref="idrole"
                value={this.state.fields["idrole"] || ''}
                onChange={this.handleChangeDinamyc.bind(this, "idrole")} />
              < span style={{ color: "red" }}>{this.state.errors["idrole"]}</ span >*/}
              <Select
                                    ref="idrole"
                                    showSearch
                                    style={{ width: 602 }}
                                    placeholder="Roles"
                                    optionFilterProp="children"
                                    options={this.state.dataRole}
                                    //onChange={this.onChangeAsientoContable}
                                    value={this.state.fields["idrole"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "idrole")}
                                ></Select>
                                <span style={{ color: "red" }}>{this.state.errors["idrole"]}</span>
            </Form.Item>
            {/*<Form.Item label="idrolemenu">
              <Input
                ref="idrolemenu"
                value={this.state.fields["idrolemenu"] || ''}
                onChange={this.handleChangeDinamyc.bind(this, "idrolemenu")} />
              < span style={{ color: "red" }}>{this.state.errors["idrolemenu"]}</ span >
            </Form.Item>*/}
            {/*<Form.Item label="Activo" valuePropName="checked">
              <Switch
                onChange={this.handleChangeDinamycBool.bind(this, "isavailablerolemenu")}
                checked={this.state.isavailablerolemenu}
                disabled={this.state.disableControl}
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
export default Rolemenu;
