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
class Typeprovider extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        codetypeprovider: "",
        ctatypeprovider: "",
        isavailabletypeprovider: false,
        nametypeprovider: "",
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
    editTypeprovider = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarTypeprovider = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Código',
            dataIndex: 'codetypeprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Cuenta',
            dataIndex: 'ctatypeprovider',
            render: (text) => <a>{text}</a>,
        },
       /* {
            title: 'isavailabletypeprovider',
            dataIndex: 'isavailabletypeprovider',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Nombre',
            dataIndex: 'nametypeprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editTypeprovider(record)
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
                        this.eliminarTypeprovider(record)
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
        if (!fields["codetypeprovider"]) {
            formIsValid = false;
            errors["codetypeprovider"] = "Campo obligatorio";
        }
        /*if (!fields["ctatypeprovider"]) {
            formIsValid = false;
            errors["ctatypeprovider"] = "Campo obligatorio";
        }*/
        /*if (!fields["isavailabletypeprovider"]) {
            formIsValid = false;
            errors["isavailabletypeprovider"] = "Campo obligatorio";
        }*/
        if (!fields["nametypeprovider"]) {
            formIsValid = false;
            errors["nametypeprovider"] = "Campo obligatorio";
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
        fields['codetypeprovider'] = '';
        fields['ctatypeprovider'] = '';
        fields['isavailabletypeprovider'] = false;
        fields['nametypeprovider'] = '';
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['codetypeprovider'] = record.codetypeprovider;
        fields['ctatypeprovider'] = record.ctatypeprovider;
        fields['isavailabletypeprovider'] = record.isavailabletypeprovider;
        fields['nametypeprovider'] = record.nametypeprovider;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('https://localhost:44315/api/Typeprovider/getTypeprovider')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.codetypeprovider,
                        "codetypeprovider": row.codetypeprovider,
                        "ctatypeprovider": row.ctatypeprovider,
                        "isavailabletypeprovider": row.isavailabletypeprovider,
                        "nametypeprovider": row.nametypeprovider,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (codetypeprovider, ctatypeprovider, isavailabletypeprovider, nametypeprovider) => {
        const param = {
            "codetypeprovider": codetypeprovider,
            "ctatypeprovider": ctatypeprovider,
            "isavailabletypeprovider": isavailabletypeprovider,
            "nametypeprovider": nametypeprovider,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Typeprovider/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (codetypeprovider, ctatypeprovider, isavailabletypeprovider, nametypeprovider) => {
        const param = {
            "codetypeprovider": codetypeprovider,
            "ctatypeprovider": ctatypeprovider,
            "isavailabletypeprovider": isavailabletypeprovider,
            "nametypeprovider": nametypeprovider,
        }
        await axios.post('https://localhost:44315/api/Typeprovider/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["codetypeprovider"], this.state.fields["ctatypeprovider"], true, this.state.fields["nametypeprovider"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["codetypeprovider"], this.state.fields["ctatypeprovider"], this.state.fields["isavailabletypeprovider"], this.state.fields["nametypeprovider"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["codetypeprovider"], this.state.fields["ctatypeprovider"], false, this.state.fields["nametypeprovider"]);
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
                < Modal title="typeprovider"
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
                        <Form.Item label="Código">
                            <Input
                                ref="codetypeprovider"
                                value={this.state.fields["codetypeprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "codetypeprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["codetypeprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Cuenta">
                            <Input
                                ref="ctatypeprovider"
                                value={this.state.fields["ctatypeprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "ctatypeprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["ctatypeprovider"]}</ span >
                        </Form.Item>
                        {/*<Form.Item label="Activo" valuePropName="checked">
                            <Switch
                                onChange={this.handleChangeDinamycBool.bind(this, "isavailabletypeprovider")} 
                            checked={this.state.isavailabletypeprovider}
                            disabled={this.state.disableControl}
                                            />
                        </Form.Item>*/}
                        <Form.Item label="Nombre">
                            <Input
                                ref="nametypeprovider"
                                value={this.state.fields["nametypeprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "nametypeprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["nametypeprovider"]}</ span >
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
export default Typeprovider;
