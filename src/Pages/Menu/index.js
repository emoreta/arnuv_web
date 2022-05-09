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
class Menu extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        childnodemenu: 0,
        iconmenu: "",
        idmenu: 0,
        isavailablemenu: false,
        namemenu: "",
        pagemenu: "",
        parentnodemenu: 0,
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
    editMenu = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarMenu = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Id',
            dataIndex: 'idmenu',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Padre',
            dataIndex: 'parentnodemenu',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hijo',
            dataIndex: 'childnodemenu',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Icono',
            dataIndex: 'iconmenu',
            render: (text) => <a>{text}</a>,
        },
        
        /*{
            title: 'isavailablemenu',
            dataIndex: 'isavailablemenu',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Nombre',
            dataIndex: 'namemenu',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Página',
            dataIndex: 'pagemenu',
            render: (text) => <a>{text}</a>,
        },
        
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editMenu(record)
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
                        this.eliminarMenu(record)
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
       /* if (!fields["childnodemenu"]) {
            formIsValid = false;
            errors["childnodemenu"] = "Campo obligatorio";
        }*/
        if (!fields["iconmenu"]) {
            formIsValid = false;
            errors["iconmenu"] = "Campo obligatorio";
        }
        /*if (!fields["idmenu"]) {
            formIsValid = false;
            errors["idmenu"] = "Campo obligatorio";
        }*/
        /*if (!fields["isavailablemenu"]) {
            formIsValid = false;
            errors["isavailablemenu"] = "Campo obligatorio";
        }*/
        if (!fields["namemenu"]) {

            formIsValid = false;
            errors["namemenu"] = "Campo obligatorio";
        }
        if (!fields["pagemenu"]) {
            formIsValid = false;
            errors["pagemenu"] = "Campo obligatorio";
        }
        if (!fields["parentnodemenu"]) {
            formIsValid = false;
            errors["parentnodemenu"] = "Campo obligatorio";
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
        fields['childnodemenu'] = 0;
        fields['iconmenu'] = '';
        fields['idmenu'] = 0;
        fields['isavailablemenu'] = false;
        fields['namemenu'] = '';
        fields['pagemenu'] = '';
        fields['parentnodemenu'] = 0;
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['childnodemenu'] = record.childnodemenu;
        fields['iconmenu'] = record.iconmenu;
        fields['idmenu'] = record.idmenu;
        fields['isavailablemenu'] = record.isavailablemenu;
        fields['namemenu'] = record.namemenu;
        fields['pagemenu'] = record.pagemenu;
        fields['parentnodemenu'] = record.parentnodemenu;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('https://localhost:44315/api/Menu/getMenuCompleto')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.idmenu,
                        "childnodemenu": row.childnodemenu,
                        "iconmenu": row.iconmenu,
                        "idmenu": row.idmenu,
                        "isavailablemenu": row.isavailablemenu,
                        "namemenu": row.namemenu,
                        "pagemenu": row.pagemenu,
                        "parentnodemenu": row.parentnodemenu,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (childnodemenu, iconmenu, idmenu, isavailablemenu, namemenu, pagemenu, parentnodemenu) => {
        const param = {
            "childnodemenu": childnodemenu,
            "iconmenu": iconmenu,
            "idmenu": idmenu,
            "isavailablemenu": isavailablemenu,
            "namemenu": namemenu,
            "pagemenu": pagemenu,
            "parentnodemenu": parentnodemenu,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Menu/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (childnodemenu, iconmenu, idmenu, isavailablemenu, namemenu, pagemenu, parentnodemenu) => {
        const param = {
            "childnodemenu": childnodemenu,
            "iconmenu": iconmenu,
            //"idmenu": idmenu,
            "isavailablemenu": isavailablemenu,
            "namemenu": namemenu,
            "pagemenu": pagemenu,
            "parentnodemenu": parentnodemenu,
        }
        await axios.post('https://localhost:44315/api/Menu/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["childnodemenu"], this.state.fields["iconmenu"], this.state.fields["idmenu"], true, this.state.fields["namemenu"], this.state.fields["pagemenu"], this.state.fields["parentnodemenu"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["childnodemenu"], this.state.fields["iconmenu"], this.state.fields["idmenu"], true, this.state.fields["namemenu"], this.state.fields["pagemenu"], this.state.fields["parentnodemenu"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();
        }
    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["childnodemenu"], this.state.fields["iconmenu"], this.state.fields["idmenu"], false, this.state.fields["namemenu"], this.state.fields["pagemenu"], this.state.fields["parentnodemenu"]);
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
                < Modal title="Menú"
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
                    {/*<Form.Item label="idmenu">
                            <Input
                                ref="idmenu"
                                value={this.state.fields["idmenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "idmenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["idmenu"]}</ span >
                    </Form.Item>*/}
                    <Form.Item label="Padre">
                            <Input
                                ref="parentnodemenu"
                                value={this.state.fields["parentnodemenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "parentnodemenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["parentnodemenu"]}</ span >
                        </Form.Item>
                        <Form.Item label="Hijo">
                            <Input
                                ref="childnodemenu"
                                value={this.state.fields["childnodemenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "childnodemenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["childnodemenu"]}</ span >
                        </Form.Item>
                        <Form.Item label="Icono">
                            <Input
                                ref="iconmenu"
                                value={this.state.fields["iconmenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "iconmenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["iconmenu"]}</ span >
                        </Form.Item>
                        
                        {/*<Form.Item label="Activo" valuePropName="checked">
                            <Switch
                                onChange={this.handleChangeDinamycBool.bind(this, "isavailablemenu")}
                                checked={this.state.isavailablemenu}
                                disabled={this.state.disableControl}
                            />
                    </Form.Item>*/}
                        <Form.Item label="Nombre">
                            <Input
                                ref="namemenu"
                                value={this.state.fields["namemenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "namemenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["namemenu"]}</ span >
                        </Form.Item>
                        <Form.Item label="Página">
                            <Input
                                ref="pagemenu"
                                value={this.state.fields["pagemenu"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "pagemenu")} />
                            < span style={{ color: "red" }}>{this.state.errors["pagemenu"]}</ span >
                        </Form.Item>
                        
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
export default Menu;
