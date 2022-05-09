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
import moment from 'moment';
import 'moment/locale/zh-cn';
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
class User extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        dataRole: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        emailuser: "",
        idrole: 0,
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
        this.getInformationRole();

        let fields = this.state.fields;
        var today = new Date();
        fields['birthdateuser'] = this.toIsoString(today);

        this.setState({ fields });

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
    editUser = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarUser = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Id',
            dataIndex: 'iduser',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'Role',
            dataIndex: 'idrole',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Role',
            dataIndex: 'namerole',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nombres',
            dataIndex: 'nameuser',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Apellidos',
            dataIndex: 'lastnameuser',
            render: (text) => <a>{text}</a>,
        },
        
        
        /*{
            title: 'createduser',
            dataIndex: 'createduser',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Email',
            dataIndex: 'emailuser',
            render: (text) => <a>{text}</a>,
        },
        
        /*{
            title: 'isavailableuser',
            dataIndex: 'isavailableuser',
            render: (text) => <a>{text}</a>,
        },*/
        
        
        {
            title: 'Contraseña',
            dataIndex: 'passworduser',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nacimiento',
            dataIndex: 'birthdateuser',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Teléfono',
            dataIndex: 'phoneuser',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'updateduser',
            dataIndex: 'updateduser',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editUser(record)
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
                        this.eliminarUser(record)
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
        if (!fields["birthdateuser"]) {
            formIsValid = false;
            errors["birthdateuser"] = "Campo obligatorio";
        }
        /*if (!fields["createduser"]) {
            formIsValid = false;
            errors["createduser"] = "Campo obligatorio";
        }*/
        if (!fields["emailuser"]) {
            formIsValid = false;
            errors["emailuser"] = "Campo obligatorio";
        }
        if (!fields["idrole"]) {
            formIsValid = false;
            errors["idrole"] = "Campo obligatorio";
        }
        /*if (!fields["iduser"]) {
            formIsValid = false;
            errors["iduser"] = "Campo obligatorio";
        }*/
        /*if (!fields["isavailableuser"]) {
            formIsValid = false;
            errors["isavailableuser"] = "Campo obligatorio";
        }*/
        if (!fields["lastnameuser"]) {
            formIsValid = false;
            errors["lastnameuser"] = "Campo obligatorio";
        }
        if (!fields["nameuser"]) {
            formIsValid = false;
            errors["nameuser"] = "Campo obligatorio";
        }
        if (!fields["passworduser"]) {
            formIsValid = false;
            errors["passworduser"] = "Campo obligatorio";
        }
        if (!fields["phoneuser"]) {
            formIsValid = false;
            errors["phoneuser"] = "Campo obligatorio";
        }
        /*if (!fields["updateduser"]) {
            formIsValid = false;
            errors["updateduser"] = "Campo obligatorio";
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
        var today = new Date();
        fields['birthdateuser'] =this.toIsoString(today);
        fields['createduser'] = '';
        fields['emailuser'] = '';
        fields['idrole'] = 0;
        fields['iduser'] = 0;
        fields['isavailableuser'] = false;
        fields['lastnameuser'] = '';
        fields['nameuser'] = '';
        fields['passworduser'] = '';
        fields['phoneuser'] = '';
        fields['updateduser'] = '';
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['birthdateuser'] = record.birthdateuser;
        fields['createduser'] = record.createduser;
        fields['emailuser'] = record.emailuser;
        fields['idrole'] = record.idrole;
        fields['iduser'] = record.iduser;
        fields['isavailableuser'] = record.isavailableuser;
        fields['lastnameuser'] = record.lastnameuser;
        fields['nameuser'] = record.nameuser;
        fields['passworduser'] = record.passworduser;
        fields['phoneuser'] = record.phoneuser;
        fields['updateduser'] = record.updateduser;
        this.setState({ fields });
    }
    toIsoString(date) {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
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
    editInformation = async (birthdateuser, createduser, emailuser, idrole, iduser, isavailableuser, lastnameuser, nameuser, passworduser, phoneuser, updateduser) => {
        var today = new Date();
        const param = {
            "birthdateuser": birthdateuser,
            "createduser": this.toIsoString(today),
            "emailuser": emailuser,
            "idrole": idrole,
            "iduser": iduser,
            "isavailableuser": isavailableuser,
            "lastnameuser": lastnameuser,
            "nameuser": nameuser,
            "passworduser": passworduser,
            "phoneuser": phoneuser,
            "updateduser": this.toIsoString(today),
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/User/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (birthdateuser, createduser, emailuser, idrole, iduser, isavailableuser, lastnameuser, nameuser, passworduser, phoneuser, updateduser) => {
        var today = new Date();
        const param = {
            "birthdateuser": birthdateuser,
            "createduser": this.toIsoString(today),
            "emailuser": emailuser,
            "idrole": idrole,
            "iduser": iduser,
            "isavailableuser": isavailableuser,
            "lastnameuser": lastnameuser,
            "nameuser": nameuser,
            "passworduser": passworduser,
            "phoneuser": phoneuser,
            "updateduser": this.toIsoString(today),
        }
        await axios.post('https://localhost:44315/api/User/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["birthdateuser"], this.state.fields["createduser"], this.state.fields["emailuser"], this.state.fields["idrole"], this.state.fields["iduser"], true, this.state.fields["lastnameuser"], this.state.fields["nameuser"], this.state.fields["passworduser"], this.state.fields["phoneuser"], this.state.fields["updateduser"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["birthdateuser"], this.state.fields["createduser"], this.state.fields["emailuser"], this.state.fields["idrole"], this.state.fields["iduser"], true, this.state.fields["lastnameuser"], this.state.fields["nameuser"], this.state.fields["passworduser"], this.state.fields["phoneuser"], this.state.fields["updateduser"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }
    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["birthdateuser"], this.state.fields["createduser"], this.state.fields["emailuser"], this.state.fields["idrole"], this.state.fields["iduser"], false, this.state.fields["lastnameuser"], this.state.fields["nameuser"], this.state.fields["passworduser"], this.state.fields["phoneuser"], this.state.fields["updateduser"]);
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
                < Modal title="Usuario"
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
                        <Form.Item label="Id">
                            <Input
                                ref="iduser"
                                value={this.state.fields["iduser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "iduser")} />
                            < span style={{ color: "red" }}>{this.state.errors["iduser"]}</ span >
                        </Form.Item>
                        < Form.Item label="Nacimiento">
                            < DatePicker
                                ref="birthdateuser"
                                onChange={this.handleChangeDinamycDate.bind(this, "birthdateuser")}
                                value={moment(this.state.fields["birthdateuser"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["birthdateuser"]}</ span >
                        </ Form.Item >
                        {/*< Form.Item label="createduser">
                            < DatePicker
                                ref="createduser"
                                onChange={this.handleChangeDinamycDate.bind(this, "createduser")}
                                value={moment(this.state.fields["createduser"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["createduser"]}</ span >
                    </ Form.Item >*/}
                        <Form.Item label="Email">
                            <Input
                                ref="emailuser"
                                value={this.state.fields["emailuser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "emailuser")} />
                            < span style={{ color: "red" }}>{this.state.errors["emailuser"]}</ span >
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

                        {/*<Form.Item label="Activo" valuePropName="checked">
                            <Switch
                                onChange={this.handleChangeDinamycBool.bind(this, "isavailableuser")}
                                checked={this.state.isavailableuser}
                                disabled={this.state.disableControl}
                            />
                    </Form.Item>*/}
                        <Form.Item label="Apellidos">
                            <Input
                                ref="lastnameuser"
                                value={this.state.fields["lastnameuser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "lastnameuser")} />
                            < span style={{ color: "red" }}>{this.state.errors["lastnameuser"]}</ span >
                        </Form.Item>
                        <Form.Item label="Nombres">
                            <Input
                                ref="nameuser"
                                value={this.state.fields["nameuser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "nameuser")} />
                            < span style={{ color: "red" }}>{this.state.errors["nameuser"]}</ span >
                        </Form.Item>
                        <Form.Item label="Contraseña">
                            <Input.Password
                                ref="passworduser"
                                value={this.state.fields["passworduser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "passworduser")} />
                                
                            < span style={{ color: "red" }}>{this.state.errors["passworduser"]}</ span >
                        </Form.Item>
                        <Form.Item label="Teléfono">
                            <Input
                                ref="phoneuser"
                                value={this.state.fields["phoneuser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "phoneuser")} />
                            < span style={{ color: "red" }}>{this.state.errors["phoneuser"]}</ span >
                        </Form.Item>
                        {/*< Form.Item label="updateduser">
                            < DatePicker
                                ref="updateduser"
                                onChange={this.handleChangeDinamycDate.bind(this, "updateduser")}
                                value={moment(this.state.fields["updateduser"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["updateduser"]}</ span >
                </ Form.Item >*/}
                    </ Form >
                </ Modal >
            </ div >
        )
    };
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
export default User;
