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
class Provider extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        dataTypeProvider: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        addressprovider: "",
        codeiva: "",
        codeprovider: "",
        codetypeprovider: "",
        commentprovider: "",
        ctaprovider: "",
        deadlinesprovider: 0,
        emailprovider: "",
        identificationprovider: "",
        nameprovider: "",
        telephoneoneprovider: "",
        telephonetwoprovider: "",
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

        this.getInformationTypeProvider();

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
    editProvider = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarProvider = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Código',
            dataIndex: 'codeprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tipo Proveedor',
            dataIndex: 'codetypeprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nombre',
            dataIndex: 'nameprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Identificación',
            dataIndex: 'identificationprovider',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Dirección',
            dataIndex: 'addressprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'emailprovider',
            render: (text) => <a>{text}</a>,
        },


        {
            title: 'Teléfono',
            dataIndex: 'telephoneoneprovider',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'codeiva',
            dataIndex: 'codeiva',
            render: (text) => <a>{text}</a>,
        },*/


        {
            title: 'Comentario',
            dataIndex: 'commentprovider',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'ctaprovider',
            dataIndex: 'ctaprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'currentbalance',
            dataIndex: 'currentbalance',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'deadlinesprovider',
            dataIndex: 'deadlinesprovider',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'discountprovider',
            dataIndex: 'discountprovider',
            render: (text) => <a>{text}</a>,
        },*/

        /*{
            title: 'telephonetwoprovider',
            dataIndex: 'telephonetwoprovider',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editProvider(record)
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
                        this.eliminarProvider(record)
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
        if (!fields["addressprovider"]) {
            formIsValid = false;
            errors["addressprovider"] = "Campo obligatorio";
        }
        /*if (!fields["codeiva"]) {
            formIsValid = false;
            errors["codeiva"] = "Campo obligatorio";
        }*/
        if (!fields["codeprovider"]) {
            formIsValid = false;
            errors["codeprovider"] = "Campo obligatorio";
        }
        if (!fields["codetypeprovider"]) {
            formIsValid = false;
            errors["codetypeprovider"] = "Campo obligatorio";
        }
        if (!fields["commentprovider"]) {
            formIsValid = false;
            errors["commentprovider"] = "Campo obligatorio";
        }
        /*if (!fields["ctaprovider"]) {
            formIsValid = false;
            errors["ctaprovider"] = "Campo obligatorio";
        }*/
        /*if (!fields["currentbalance"]) {
            formIsValid = false;
            errors["currentbalance"] = "Campo obligatorio";
        }
        if (!fields["deadlinesprovider"]) {
            formIsValid = false;
            errors["deadlinesprovider"] = "Campo obligatorio";
        }
        if (!fields["discountprovider"]) {
            formIsValid = false;
            errors["discountprovider"] = "Campo obligatorio";
        }*/
        if (!fields["emailprovider"]) {
            formIsValid = false;
            errors["emailprovider"] = "Campo obligatorio";
        }
        if (!fields["identificationprovider"]) {
            formIsValid = false;
            errors["identificationprovider"] = "Campo obligatorio";
        }
        if (!fields["nameprovider"]) {
            formIsValid = false;
            errors["nameprovider"] = "Campo obligatorio";
        }
        if (!fields["telephoneoneprovider"]) {
            formIsValid = false;
            errors["telephoneoneprovider"] = "Campo obligatorio";
        }
        /*if (!fields["telephonetwoprovider"]) {
            formIsValid = false;
            errors["telephonetwoprovider"] = "Campo obligatorio";
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
        fields['addressprovider'] = '';
        fields['codeiva'] = '';
        fields['codeprovider'] = '';
        fields['codetypeprovider'] = '';
        fields['commentprovider'] = '';
        fields['ctaprovider'] = '';
        fields['currentbalance'] = 0;
        fields['deadlinesprovider'] = 0;
        fields['discountprovider'] = 0;
        fields['emailprovider'] = '';
        fields['identificationprovider'] = '';
        fields['nameprovider'] = '';
        fields['telephoneoneprovider'] = '';
        fields['telephonetwoprovider'] = '';
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['addressprovider'] = record.addressprovider;
        fields['codeiva'] = record.codeiva;
        fields['codeprovider'] = record.codeprovider;
        fields['codetypeprovider'] = record.codetypeprovider;
        fields['commentprovider'] = record.commentprovider;
        fields['ctaprovider'] = record.ctaprovider;
        fields['currentbalance'] = record.currentbalance;
        fields['deadlinesprovider'] = record.deadlinesprovider;
        fields['discountprovider'] = record.discountprovider;
        fields['emailprovider'] = record.emailprovider;
        fields['identificationprovider'] = record.identificationprovider;
        fields['nameprovider'] = record.nameprovider;
        fields['telephoneoneprovider'] = record.telephoneoneprovider;
        fields['telephonetwoprovider'] = record.telephonetwoprovider;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('https://localhost:44315/api/Provider/getProvider')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.codeprovider,
                        "addressprovider": row.addressprovider,
                        "codeiva": row.codeiva,
                        "codeprovider": row.codeprovider,
                        "codetypeprovider": row.codetypeprovider,
                        "commentprovider": row.commentprovider,
                        "ctaprovider": row.ctaprovider,
                        "currentbalance": row.currentbalance,
                        "deadlinesprovider": row.deadlinesprovider,
                        "discountprovider": row.discountprovider,
                        "emailprovider": row.emailprovider,
                        "identificationprovider": row.identificationprovider,
                        "nameprovider": row.nameprovider,
                        "telephoneoneprovider": row.telephoneoneprovider,
                        "telephonetwoprovider": row.telephonetwoprovider,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    getInformationTypeProvider = async () => {
        await axios.get('https://localhost:44315/api/Typeprovider/getTypeprovider')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "value": row.codetypeprovider,
                        "codetypeprovider": row.codetypeprovider,
                        "ctatypeprovider": row.ctatypeprovider,
                        "isavailabletypeprovider": row.isavailabletypeprovider,
                        "label": row.codetypeprovider + ' - ' + row.nametypeprovider,
                    }
                })
                this.setState({ dataTypeProvider: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (addressprovider, codeiva, codeprovider, codetypeprovider, commentprovider, ctaprovider, currentbalance, deadlinesprovider, discountprovider, emailprovider, identificationprovider, nameprovider, telephoneoneprovider, telephonetwoprovider) => {
        const param = {
            "addressprovider": addressprovider,
            "codeiva": codeiva,
            "codeprovider": codeprovider,
            "codetypeprovider": codetypeprovider,
            "commentprovider": commentprovider,
            "ctaprovider": ctaprovider,
            "currentbalance": currentbalance,
            "deadlinesprovider": deadlinesprovider,
            "discountprovider": discountprovider,
            "emailprovider": emailprovider,
            "identificationprovider": identificationprovider,
            "nameprovider": nameprovider,
            "telephoneoneprovider": telephoneoneprovider,
            "telephonetwoprovider": telephonetwoprovider,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Provider/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (addressprovider, codeiva, codeprovider, codetypeprovider, commentprovider, ctaprovider, currentbalance, deadlinesprovider, discountprovider, emailprovider, identificationprovider, nameprovider, telephoneoneprovider, telephonetwoprovider) => {
        const param = {
            "addressprovider": addressprovider,
            "codeiva": codeiva,
            "codeprovider": codeprovider,
            "codetypeprovider": codetypeprovider,
            "commentprovider": commentprovider,
            "ctaprovider": ctaprovider,
            "currentbalance": currentbalance,
            "deadlinesprovider": deadlinesprovider,
            "discountprovider": discountprovider,
            "emailprovider": emailprovider,
            "identificationprovider": identificationprovider,
            "nameprovider": nameprovider,
            "telephoneoneprovider": telephoneoneprovider,
            "telephonetwoprovider": telephonetwoprovider,
        }
        await axios.post('https://localhost:44315/api/Provider/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    deleteInformation = async (code) => {
        await axios.delete('https://localhost:44315/api/Provider/delete/'+code)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["addressprovider"], "IVA12", this.state.fields["codeprovider"], this.state.fields["codetypeprovider"], this.state.fields["commentprovider"], "0", "0", "0", "0", this.state.fields["emailprovider"], this.state.fields["identificationprovider"], this.state.fields["nameprovider"], this.state.fields["telephoneoneprovider"], "0");
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["addressprovider"], "IVA12", this.state.fields["codeprovider"], this.state.fields["codetypeprovider"], this.state.fields["commentprovider"],"0","0","0", "0", this.state.fields["emailprovider"], this.state.fields["identificationprovider"], this.state.fields["nameprovider"], this.state.fields["telephoneoneprovider"], "0");
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();
        }

    }
    eliminarRegistro = async () => {
        //await this.editInformation(this.state.fields["addressprovider"], this.state.fields["codeiva"], this.state.fields["codeprovider"], this.state.fields["codetypeprovider"], this.state.fields["commentprovider"], "0", "0", "0", "0", this.state.fields["emailprovider"], this.state.fields["identificationprovider"], this.state.fields["nameprovider"], this.state.fields["telephoneoneprovider"], this.state.fields["telephonetwoprovider"]);
        await this.deleteInformation( this.state.fields["codeprovider"]);
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
                < Modal title="provider"
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
                                ref="codeprovider"
                                value={this.state.fields["codeprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "codeprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["codeprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Tipo Proveedor">
                            {/*<Input
                                ref="codetypeprovider"
                                value={this.state.fields["codetypeprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "codetypeprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["codetypeprovider"]}</ span >*/}

                            <Select
                                ref="codetypeprovider"
                                showSearch
                                style={{ width: 602 }}
                                //placeholder="Roles"
                                optionFilterProp="children"
                                options={this.state.dataTypeProvider}
                                //onChange={this.onChangeAsientoContable}
                                value={this.state.fields["codetypeprovider"] || ''}
                                onChange={this.handleChangeDinamycSelect.bind(this, "codetypeprovider")}
                            ></Select>
                            <span style={{ color: "red" }}>{this.state.errors["codetypeprovider"]}</span>
                        </Form.Item>
                        <Form.Item label="Nombre">
                            <Input
                                ref="nameprovider"
                                value={this.state.fields["nameprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "nameprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["nameprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Identificacion">
                            <Input
                                ref="identificationprovider"
                                value={this.state.fields["identificationprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "identificationprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["identificationprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Dirección">
                            <Input
                                ref="addressprovider"
                                value={this.state.fields["addressprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "addressprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["addressprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                ref="emailprovider"
                                value={this.state.fields["emailprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "emailprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["emailprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="Teléfono">
                            <Input
                                ref="telephoneoneprovider"
                                value={this.state.fields["telephoneoneprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "telephoneoneprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["telephoneoneprovider"]}</ span >
                        </Form.Item>
                        {/*<Form.Item label="Iva">
                            <Input
                                ref="codeiva"
                                value={this.state.fields["codeiva"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "codeiva")} />
                            < span style={{ color: "red" }}>{this.state.errors["codeiva"]}</ span >
                        </Form.Item>*/}


                        <Form.Item label="Comentario">
                            <Input
                                ref="commentprovider"
                                value={this.state.fields["commentprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "commentprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["commentprovider"]}</ span >
                        </Form.Item>
                        {/*<Form.Item label="ctaprovider">
                            <Input
                                ref="ctaprovider"
                                value={this.state.fields["ctaprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "ctaprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["ctaprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="currentbalance">
                            <Input
                                ref="currentbalance"
                                value={this.state.fields["currentbalance"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "currentbalance")} />
                            < span style={{ color: "red" }}>{this.state.errors["currentbalance"]}</ span >
                        </Form.Item>
                        <Form.Item label="deadlinesprovider">
                            <Input
                                ref="deadlinesprovider"
                                value={this.state.fields["deadlinesprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "deadlinesprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["deadlinesprovider"]}</ span >
                        </Form.Item>
                        <Form.Item label="discountprovider">
                            <Input
                                ref="discountprovider"
                                value={this.state.fields["discountprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "discountprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["discountprovider"]}</ span >
                    </Form.Item>*/}




                        {/*<Form.Item label="telephonetwoprovider">
                            <Input
                                ref="telephonetwoprovider"
                                value={this.state.fields["telephonetwoprovider"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "telephonetwoprovider")} />
                            < span style={{ color: "red" }}>{this.state.errors["telephonetwoprovider"]}</ span >
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
export default Provider;
