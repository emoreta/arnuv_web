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
class Iva extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        codeiva: "",
        isavailableiva: false,
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
    editIva = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarIva = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Código',
            dataIndex: 'codeiva',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'isavailableiva',
            dataIndex: 'isavailableiva',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Porcentaje',
            dataIndex: 'percentageiva',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editIva(record)
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
                        this.eliminarIva(record)
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
        if (!fields["codeiva"]) {
            formIsValid = false;
            errors["codeiva"] = "Campo obligatorio";
        }
        /*if (!fields["isavailableiva"]) {
            formIsValid = false;
            errors["isavailableiva"] = "Campo obligatorio";
        }*/
        if (!fields["percentageiva"]) {
            formIsValid = false;
            errors["percentageiva"] = "Campo obligatorio";
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
        fields['codeiva'] = '';
        fields['isavailableiva'] = false;
        fields['percentageiva'] = 0;
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['codeiva'] = record.codeiva;
        fields['isavailableiva'] = record.isavailableiva;
        fields['percentageiva'] = record.percentageiva;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('https://localhost:44315/api/Iva/getIva')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.codeIva,
                        "codeiva": row.codeIva,
                        "isavailableiva": row.isavailableIva,
                        "percentageiva": row.percentageIva,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (codeiva, isavailableiva, percentageiva) => {
        const param = {
            "codeiva": codeiva,
            "isavailableiva": isavailableiva,
            "percentageiva": percentageiva,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (codeiva, isavailableiva, percentageiva) => {
        const param = {
            "codeiva": codeiva,
            "isavailableiva": isavailableiva,
            "percentageiva": percentageiva,
        }
        await axios.post('https://localhost:44315/api/Iva/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["codeiva"], true, this.state.fields["percentageiva"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["codeiva"], true, this.state.fields["percentageiva"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["codeiva"], false, this.state.fields["percentageiva"]);
        openNotificationEliminar('topRight');
        await this.getInformation();
    }
    clickNuevo = () => {
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
                < Modal title="iva"
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
                                ref="codeiva"
                                value={this.state.fields["codeiva"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "codeiva")} />
                            < span style={{ color: "red" }}>{this.state.errors["codeiva"]}</ span >
                        </Form.Item>
                        {/*<Form.Item label="Activo" valuePropName="checked">
                            <Switch
                                onChange={this.handleChangeDinamycBool.bind(this, "isavailableiva")} 
                            checked={this.state.isavailableiva}
                            disabled={this.state.disableControl}
                                            />
                        </Form.Item>*/}
                        <Form.Item label="Porcentaje">
                            <Input
                                ref="percentageiva"
                                value={this.state.fields["percentageiva"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "percentageiva")} />
                            < span style={{ color: "red" }}>{this.state.errors["percentageiva"]}</ span >
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
export default Iva;
