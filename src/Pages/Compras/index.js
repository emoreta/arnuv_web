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
    TreeSelect, Divider, Row, Col, Modal
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import classes from '../CuentasContables/index.css';
import "../Compras/index.css";

import Highlighter from 'react-highlight-words';
import { SearchOutlined, BarsOutlined, CloseOutlined, SaveOutlined,DeleteFilled } from '@ant-design/icons';

const { Option } = Select;
const { TreeNode } = TreeSelect;
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class Purchases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            dataDetail: [],
            dataTypePayments: null,
            dataProviders: [],
            dataCuentasContables: null,
            columns: [],
            codeprovider: "",
            detailinvoicepurchases: "",
            detailseatpurchases: "",
            idtypepayments: "",
            isavailablepurchase: false,
            numberautorizationinvoicepurchases: "",
            numberinvoicepurchases: "",
            disableControl: false,
            disableNuevo: false,
            disableEditar: false,
            disableGuardar: false,
            disableEliminar: false,
            disableCancelar: false,
            flagNuevo: false,
            selectedOptionTypePayment: null,
            value: null,
            flatNuevoDocumento: false,
            flatShowModalEliminarFactura: false,
            flatShowModalEliminarFacturaDetalle: false,
            idFacturaEliminar: 0,
            flatShowModalGuardarFactura: false,
            fields: {},
            errors: {},
            flatControl: 'ninguno',
            dataIva:[],
            valueIva:''


        };
    }


    columnsDetail = [
        {
            title: 'Eliminar',
            dataIndex: 'iddetailpurchases',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<CloseOutlined
                    onClick={() =>
                        this.eliminarFacturaCompraDetalle(record)
                    }
                />} />
            },
            //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
        },
        {
            title: 'Key',
            dataIndex: 'key',
            //render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'datecreatedpurchases',
            dataIndex: 'datecreatedpurchases',
            render: (text) => <a>{text}</a>,
    
        },*/
        {
            title: 'Descripción',
            dataIndex: 'descriptiondetailpuchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Id Account Plan',
            dataIndex: 'idaccountplan',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Id',
            dataIndex: 'iddetailpurchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Id Compra',
            dataIndex: 'idpurchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Iva',
            dataIndex: 'ivadetailpurchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantitydetailpurchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Costo Unitario',
            dataIndex: 'valueunitarydetailpurchases',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Total',
            dataIndex: 'valuetotaldetailpurchases',
            //render: (text) => <a>{text}</a>,
        },
        
    ];

    arrayDetail = [];
    componentDidMount() {

        let fields = this.state.fields;
        var today = new Date();
        fields['datedocumentpurchases'] = this.toIsoString(today);

        this.setState({ fields });

        this.getInformation();
        this.setState({ disableControl: true });
        this.setState({ disableNuevo: false });//puede crear registro nuevo
        this.setState({ disableEditar: true });//puede crear registro nuevo
        this.setState({ disableGuardar: true });//puede crear registro nuevo
        this.setState({ disableEliminar: true });//puede crear registro nuevo
        this.setState({ disableCancelar: true });//puede crear registro nuevo

        this.getInformationTypePayments();
        this.getInformationProvider();
        this.getInformationCuentasContables();
        this.getInformationIva();
    };
    resetFields=()=>{

        /*this.setState({fields:null})//
        let fields = this.state.fields;
        var today = new Date();
        fields['datedocumentpurchases'] = this.toIsoString(today);
        this.setState({ fields });*/

        let fields = this.state.fields;
        var today = new Date();
        //cabecera factura
        fields['datedocumentpurchases']=this.toIsoString(today);
        fields['codeprovider']='';
        fields['detailinvoicepurchases']='';
        fields['detailseatpurchases']='';
        fields['idpurchases']=0;
        fields['idtypepayments']=0;
        fields['isavailablepurchase']=true;
        fields['ivainvoicepurchases']='';
        fields['numberautorizationinvoicepurchases']='';
        fields['numberinvoicepurchases']='';
        fields['subtotalinvoicepurchases']='';
        fields['totalpurchases']='';
        //detalle Factura
        fields['descriptiondetailpuchases']='';
        fields['idaccountplan']=0;
        fields['iddetailpurchases']=0;
        fields['idpurchases']=0;
        fields['isavailable']=true;
        fields['quantitydetailpurchases']=0;
        fields['valuetotaldetailpurchases']=0;
        fields['valueunitarydetailpurchases']=0;
        fields['ivadetailpurchases']=0;
        
        this.setState({dataDetail:[]});//reset tabla detalle


        this.setState({ fields });

    }
    resetDetailFields=()=>{


        let fields = this.state.fields;
        var today = new Date();

       
        //detalle Factura
        fields['descriptiondetailpuchases']='';
        fields['idaccountplan']=0;
        fields['iddetailpurchases']=0;
        fields['idpurchases']=0;
        fields['isavailable']=true;
        fields['quantitydetailpurchases']=0;
        fields['valuetotaldetailpurchases']=0;
        fields['valueunitarydetailpurchases']=0;
        fields['ivadetailpurchases']=0;
        
        //this.setState({dataDetail:[]});//reset tabla detalle


        this.setState({ fields });

    }
    contactSubmit =async (e)=>  {
        //e.preventDefault();

        if (this.handleValidation()) {
            //alert("Form submitted");
            if (this.state.flatControl === 'nuevo') {
                this.onClickGuardarFactura();
            }
            else if (this.state.flatControl === 'editar') {
                await this.editInformation(this.state.fields["codeprovider"], this.state.fields["datecreatedpurchases"], this.state.fields["datedocumentpurchases"], this.state.fields["detailinvoicepurchases"], this.state.fields["detailseatpurchases"], this.state.fields["idpurchases"], this.state.fields["idtypepayments"], this.state.fields["isavailablepurchase"], this.state.fields["ivainvoicepurchases"], this.state.fields["numberautorizationinvoicepurchases"], this.state.fields["numberinvoicepurchases"], this.state.fields["subtotalinvoicepurchases"], this.state.fields["totalpurchases"]);

                await this.getInformation();
                this.resetFields();
            }
            else {
                alert('Error:', 'flatControl:' + this.state.flatControl);
            }



        } else {
            //alert("Form has errors.");
        }
    }
    buscarDetail = (key) => {
        let indice = -1;


        var filteredObj = this.state.dataDetail.find(function (item, i) {
            console.log("detail.id:", item.key);
            //console.log("detail.id:",persona.id);
            if (item.key == key) {
                indice = i;
                //return indice;
            }
        });
        return indice;
    }
    eliminarDetailFactura = async (detail) => {
        if (this.state.flatControl === 'nuevo') {
            let posicion = this.buscarDetail(detail);
            console.log('posicion', posicion);

            var array = [...this.state.dataDetail]; // make a separate copy of the array
            //var index = array.indexOf(posicion)
            if (posicion !== -1) {
                array.splice(posicion, 1);
                this.setState({ dataDetail: array });
                console.log('array:', array)
            }
        }
        else if (this.state.flatControl === 'editar') {
            console.log('id purchase:', this.state.fields["idpurchases"]);
            await this.updateDeleteDetail(this.state.detailEliminar);
            await this.getInformationDetailById(this.state.fields["idpurchases"]);
        }

        /*if (posicion != -1) {
            detail.splice(posicion, 1);
        }*/
    }
    /*removePeople(valueIndex) {
        var array = [...this.state.dataDetail]; // make a separate copy of the array
        var index = array.indexOf(valueIndex)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ dataDetail: array });
        }
    }*/

    contactSubmitDetail() {
        //e.preventDefault();

        if (this.handleValidationDetail()) {
            //alert("Form submitted");
            this.informationDetail();

            //this.resetDetailFields();

        } else {
            //alert("Form has errors.");
        }
    }
    handleValidationDetail() {
        console.log('en validacion');
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //idaccountplan
        if (!fields["idaccountplan"]) {
            formIsValid = false;
            errors["idaccountplan"] = "Campo obligatorio";
        }
        //descriptiondetailpuchases
        if (!fields["descriptiondetailpuchases"]) {
            formIsValid = false;
            errors["descriptiondetailpuchases"] = "Campo obligatorio";
        }

        //quantitydetailpurchases
        if (!fields["quantitydetailpurchases"]) {
            formIsValid = false;
            errors["quantitydetailpurchases"] = "Campo obligatorio";
        }
        //valueunitarydetailpurchases
        if (!fields["valueunitarydetailpurchases"]) {
            formIsValid = false;
            errors["valueunitarydetailpurchases"] = "Campo obligatorio";
        }
        //valuetotaldetailpurchases
        if (!fields["valuetotaldetailpurchases"]) {
            formIsValid = false;
            errors["valuetotaldetailpurchases"] = "Campo obligatorio";
        }
        if (!fields["ivadetailpurchases"]) {
            formIsValid = false;
            errors["ivadetailpurchases"] = "Campo obligatorio";
        }

        this.setState({ errors: errors });

        console.log('errores', this.state.errors);
        return formIsValid;
    }
    handleValidation() {
        console.log('en validacion');
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["numberautorizationinvoicepurchases"]) {
            formIsValid = false;
            errors["numberautorizationinvoicepurchases"] = "Campo obligatorio";
        }

        /*if (typeof fields["numberautorizationinvoicepurchases"] !== "undefined") {
            if (!fields["numberautorizationinvoicepurchases"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["numberautorizationinvoicepurchases"] = "Solo números";
            }
        }*/
        //factura
        if (!fields["numberinvoicepurchases"]) {
            formIsValid = false;
            errors["numberinvoicepurchases"] = "Campo obligatorio";
        }

        /*if (typeof fields["numberinvoicepurchases"] !== "undefined") {
            if (!fields["numberinvoicepurchases"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["numberinvoicepurchases"] = "Solo números";
            }
        }*/

        //combo
        if (!fields["idtypepayments"]) {
            formIsValid = false;
            errors["idtypepayments"] = "Campo obligatorio";
        }

        //combo
        if (!fields["codeprovider"]) {
            formIsValid = false;
            errors["codeprovider"] = "Campo obligatorio";
        }

        //date
        if (!fields["datedocumentpurchases"]) {
            formIsValid = false;
            errors["datedocumentpurchases"] = "Campo obligatorio";
        }



        //Email
        /*if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }*/

        this.setState({ errors: errors });

        console.log('errores', this.state.errors);
        return formIsValid;
    }
    handleChangeDinamyc(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        console.log('handleChangeDinamyc', e.target.value)

        if(field==='valueunitarydetailpurchases')
        {
            console.log('ingresando valor unitario')
            var totalDetail=(this.state.fields["valueunitarydetailpurchases"]*this.state.fields["quantitydetailpurchases"]);
            fields['valuetotaldetailpurchases'] = totalDetail;
            this.setState({ fields });
        }
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


    handleOkEliminarFactura = e => {
        console.log(e);
        this.onClickDeletePurchase();
        this.setState({
            flatShowModalEliminarFactura: false,
        });
    };
    handleCancelEliminarFactura = e => {
        console.log(e);
        this.setState({
            flatShowModalEliminarFactura: false,
        });
    };
    handleOkEliminarFacturaDetalle = e => {
        //console.log(e);
        this.eliminarDetailFactura(this.state.detailEliminar);

        this.setState({
            flatShowModalEliminarFacturaDetalle: false,
        });
    };
    handleCancelEliminarFacturaDetalle = e => {
        console.log(e);
        this.setState({
            flatShowModalEliminarFacturaDetalle: false,
        });
    };
    handleOkGuardarFactura = e => {
        //this.onClickGuardarFactura();
        this.clickInsertarDocumento();
        console.log(e);
        this.setState({
            flatShowModalGuardarFactura: false,
        });
    };
    handleCancelGuardarFactura = e => {
        console.log(e);
        this.setState({
            flatShowModalGuardarFactura: false,
        });
    };
    onClickGuardarFactura = () => {
        this.setState({ flatShowModalGuardarFactura: true });

    }

    eliminarFacturaCompra = (text) => {
        console.log('eliminar factura', text);
        this.setState({ idFacturaEliminar: text });
        this.setState({ flatShowModalEliminarFactura: true });
        console.log(this.state.flatShowModalEliminarFactura);


    }
    eliminarFacturaCompraDetalle = (text) => {

        console.log('eliminar factura detalle', text.key);
        this.setState({ detailEliminar: text.key });

        this.setState({ flatShowModalEliminarFacturaDetalle: true });
        console.log(this.state.flatShowModalEliminarFacturaDetalle);
    }
    /*CODIGO FILTROS EN TABLES */
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filtro
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    /*FIN CODIGO FILTROS EN TABLAS  */
    handleChange = (selectedOption) => {
        //console.log(`selected ${selectedOption}`);
        this.setState({ selectedOption });
        this.setState({ idtypepayments: selectedOption })
        console.log(`Option selected:`, selectedOption);
    }
    getInformationTypePayments = async () => {
        await axios.get('https://localhost:44315/api/Typepayments/getTypepayments')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "value": row.idtypepayments,
                        "label": row.descriptiontypepayments,
                        //"idtypepayments": row.idtypepayments,
                        //"isavailabletypepayments": row.isavailabletypepayments,
                    }
                })
                this.setState({ dataTypePayments: options });
                console.log('data pay', this.state.dataTypePayments);
            }
            )
    };
    getInformationProvider = async () => {
        await axios.get('https://localhost:44315/api/Provider/getProvider')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "value": row.codeprovider,
                        //"addressprovider": row.addressprovider,
                        //"codeiva": row.codeiva,
                        //"codeprovider": row.codeprovider,
                        //"codetypeprovider": row.codetypeprovider,
                        //"commentprovider": row.commentprovider,
                        //"ctaprovider": row.ctaprovider,
                        //"currentbalance": row.currentbalance,
                        //"deadlinesprovider": row.deadlinesprovider,
                        //"discountprovider": row.discountprovider,
                        //"emailprovider": row.emailprovider,
                        //"identificationprovider": row.identificationprovider,
                        "label": row.nameprovider,
                        //"telephoneoneprovider": row.telephoneoneprovider,
                        //"telephonetwoprovider": row.telephonetwoprovider,
                    }
                })
                this.setState({ dataProviders: options });
                console.log('dataProviders', options);
            }
            )
    };
    getInformationDetail = async () => {
        await axios.get('https://localhost:44315/api/Detailpurchases/getDetailpurchases')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.iddetailpurchases,
                        "datecreatedpurchases": row.datecreatedpurchases,
                        "dateupdateddetailpurchases": row.dateupdateddetailpurchases,
                        "descriptiondetailpuchases": row.descriptiondetailpuchases,
                        "idaccountplan": row.idaccountplan,
                        "iddetailpurchases": row.iddetailpurchases,
                        "idpurchases": row.idpurchases,
                        "isavailable": row.isavailable,
                        "quantitydetailpurchases": row.quantitydetailpurchases,
                        "valuetotaldetailpurchases": row.valuetotaldetailpurchases,
                        "valueunitarydetailpurchases": row.valueunitarydetailpurchases,
                        "ivadetailpurchases":row.ivadetailpurchases
                    }
                })
                this.setState({ data: options });
                console.log('data detail', options);
            }
            )
    };
    informationDetail = async () => {
        let detailArray = [...this.state.dataDetail];
        let countArray = detailArray.length;

        //this.state.dataDetail=[];
        /*const tmpInformation = {
            "datecreatedpurchases": this.state.datecreatedpurchases,
            "dateupdateddetailpurchases": this.state.dateupdateddetailpurchases,
            "descriptiondetailpuchases": this.state.descriptiondetailpuchases,
            "idaccountplan": this.state.idaccountplan,
            "iddetailpurchases": this.state.iddetailpurchases,
            "idpurchases": 0,
            "isavailable": this.state.isavailable,
            "quantitydetailpurchases": this.state.quantitydetailpurchases,
            "valuetotaldetailpurchases": this.state.valuetotaldetailpurchases,
            "valueunitarydetailpurchases": this.state.valueunitarydetailpurchases
        }*/
        //this.arrayDetail.push(tmpInformation);
        //this.state.dataDetail.add
        //console.log(this.arrayDetail);
        //this.updateArrayState(this.arrayDetail);
        //let floors = [...this.state.dataDetail];

        if (this.state.flatControl === 'editar') {
            detailArray.push({
                "key": countArray + 1,
                "datecreatedpurchases": this.state.fields["datecreatedpurchases"],
                "dateupdateddetailpurchases": this.state.fields["dateupdateddetailpurchases"],
                "descriptiondetailpuchases": this.state.fields["descriptiondetailpuchases"],
                "idaccountplan": this.state.fields["idaccountplan"],
                "iddetailpurchases": this.state.fields["iddetailpurchases"],
                "idpurchases": 0,
                "isavailable": this.state.fields["isavailable"],
                "quantitydetailpurchases": this.state.fields["quantitydetailpurchases"],
                "valuetotaldetailpurchases": this.state.fields["valuetotaldetailpurchases"],
                "valueunitarydetailpurchases": this.state.fields["valueunitarydetailpurchases"],
                "ivadetailpurchases":this.state.fields["ivadetailpurchases"]
            });
            await this.insertInformationDetail(this.state.fields["datecreatedpurchases"], this.state.fields["dateupdateddetailpurchases"], this.state.fields["descriptiondetailpuchases"], this.state.fields["idaccountplan"], this.state.fields["iddetailpurchases"], this.state.fields["idpurchases"], true, this.state.fields["quantitydetailpurchases"], this.state.fields["valuetotaldetailpurchases"], this.state.fields["valueunitarydetailpurchases"],this.state.fields["ivadetailpurchases"])
            await this.getInformationDetailById(this.state.fields["idpurchases"]);
        }
        else if (this.state.flatControl === 'nuevo') {
            detailArray.push({
                "key": countArray + 1,
                "datecreatedpurchases": this.state.fields["datecreatedpurchases"],
                "dateupdateddetailpurchases": this.state.fields["dateupdateddetailpurchases"],
                "descriptiondetailpuchases": this.state.fields["descriptiondetailpuchases"],
                "idaccountplan": this.state.fields["idaccountplan"],
                "iddetailpurchases": this.state.fields["iddetailpurchases"],
                "idpurchases": 0,
                "isavailable": this.state.fields["isavailable"],
                "quantitydetailpurchases": this.state.fields["quantitydetailpurchases"],
                "valuetotaldetailpurchases": this.state.fields["valuetotaldetailpurchases"],
                "valueunitarydetailpurchases": this.state.fields["valueunitarydetailpurchases"],
                "ivadetailpurchases": this.state.fields["ivadetailpurchases"]
            });
            console.log('array:', detailArray);
            var i;
            var row = detailArray;
            
            var total=0;
            for (i = 0; i < row.length; i++) {
                var totalparcial=0;
                var iva=0;
                //loopData += `<li>${data[i].name}</li>`
                console.log(row[i].valuetotaldetailpurchases);
                //console.log(row[i].valueunitarydetailpurchases);
                totalparcial=row[i].valuetotaldetailpurchases;
                total=total+totalparcial;
                console.log('total:',total);
                let fields=this.state.fields;
                fields['subtotalinvoicepurchases'] = total;
                iva=total*0.12 //cambiar para obtener el iva de la tabla
                fields['ivainvoicepurchases']=iva;
                fields['totalpurchases']=total+iva;
                this.setState({fields});
            }

            this.setState({ dataDetail: detailArray });

           
        }




        /*this.setState(previousState => ({
            dataDetail: [...previousState.dataDetail, {
                "datecreatedpurchases": this.state.datecreatedpurchases,
                "dateupdateddetailpurchases": this.state.dateupdateddetailpurchases,
                "descriptiondetailpuchases": this.state.descriptiondetailpuchases,
                "idaccountplan": this.state.idaccountplan,
                "iddetailpurchases": this.state.iddetailpurchases,
                "idpurchases": 0,
                "isavailable": this.state.isavailable,
                "quantitydetailpurchases": this.state.quantitydetailpurchases,
                "valuetotaldetailpurchases": this.state.valuetotaldetailpurchases,
                "valueunitarydetailpurchases": this.state.valueunitarydetailpurchases}
            ]
        }));*/
        console.log(this.state.dataDetail);

         this.resetDetailFields();


    }

    getInformationIva = async () => {
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
                
                this.setState({ dataIva: options[0] });
               
                    this.setState({valueIva:this.state.dataIva.percentageiva});
                
                console.log('dataIva', options);
            }
            )
    };


    getInformationDetailById = async (id) => {
        await axios.get('https://localhost:44315/api/Detailpurchases/getbyIdPurchase/' + id)
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.iddetailpurchases,
                        "datecreatedpurchases": row.datecreatedpurchases,
                        "dateupdateddetailpurchases": row.dateupdateddetailpurchases,
                        "descriptiondetailpuchases": row.descriptiondetailpuchases,
                        "idaccountplan": row.idaccountplan,
                        "iddetailpurchases": row.iddetailpurchases,
                        "idpurchases": row.idpurchases,
                        "isavailable": row.isavailable,
                        "quantitydetailpurchases": row.quantitydetailpurchases,
                        "valuetotaldetailpurchases": row.valuetotaldetailpurchases,
                        "valueunitarydetailpurchases": row.valueunitarydetailpurchases,
                        "ivadetailpurchases": row.ivadetailpurchases,
                    }
                })
                this.setState({ dataDetail: options });
                console.log('data detail', options);
            }
            )
    };
    insertInformationDetail = async (datecreatedpurchases, dateupdateddetailpurchases, descriptiondetailpuchases, idaccountplan, iddetailpurchases, idpurchases, isavailable, quantitydetailpurchases, valuetotaldetailpurchases, valueunitarydetailpurchases,ivadetailpurchases) => {
        var today = new Date();
        const param = {
            "datecreatedpurchases": this.toIsoString(today),
            "dateupdateddetailpurchases": this.toIsoString(today),
            "descriptiondetailpuchases": descriptiondetailpuchases,
            "idaccountplan": idaccountplan,
            "idpurchases": idpurchases,
            "isavailable": isavailable,
            "quantitydetailpurchases": quantitydetailpurchases,
            "valuetotaldetailpurchases": valuetotaldetailpurchases,
            "valueunitarydetailpurchases": valueunitarydetailpurchases,
            "ivadetailpurchases": ivadetailpurchases,
        }
        await axios.post('https://localhost:44315/api/Detailpurchases/insert', param)
            .then(response => {
                this.setState({ infoContractDetail: response.data });
                console.log('data', response);
            }
            )
    };

    getInformation = async () => {
        await axios.get('https://localhost:44315/api/Purchases/getPurchases/')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.idpurchases,
                        "codeprovider": row.codeprovider,
                        "datecreatedpurchases": row.datecreatedpurchases,
                        "datedocumentpurchases": row.datedocumentpurchases,
                        "detailinvoicepurchases": row.detailinvoicepurchases,
                        "detailseatpurchases": row.detailseatpurchases,
                        "idpurchases": row.idpurchases,
                        "idtypepayments": row.idtypepayments,
                        "isavailablepurchase": row.isavailablepurchase,
                        "ivainvoicepurchases": row.ivainvoicepurchases,
                        "numberautorizationinvoicepurchases": row.numberautorizationinvoicepurchases,
                        "numberinvoicepurchases": row.numberinvoicepurchases,
                        "subtotalinvoicepurchases": row.subtotalinvoicepurchases,
                        "totalpurchases": row.totalpurchases

                    }
                })
                this.setState({ data: options });
                console.log('data', this.state.data);
            }
            )
    };
    getInformationCuentasContables = async () => {
        await axios.get('https://localhost:44315/api/Accountplan/getAccountplan')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        /*"key": row.idaccountplan,
                        "balanceaccountplan": row.balanceaccountplan,
                        "codeaccountplan": row.codeaccountplan,
                        "detailaccountplan": row.detailaccountplan,
                        "idaccountplan": row.idaccountplan,
                        "idchildrenaccountplan": row.idchildrenaccountplan,
                        "idparentaccountplan": row.idparentaccountplan,
                        "levelaccountplan": row.levelaccountplan,*/
                        "value": row.idaccountplan,
                        "label": row.codeaccountplan + ' - ' + row.detailaccountplan + ' - Nivel:' + row.levelaccountplan + ' - ' + row.balanceaccountplan
                    }
                })
                this.setState({ dataCuentasContables: options });
                console.log('dataCuentasContables', this.state.dataCuentasContables);
            }
            )
    };
    editInformation = async (codeprovider, datecreatedpurchases, datedocumentpurchases, detailinvoicepurchases, detailseatpurchases, idpurchases, idtypepayments, isavailablepurchase, ivainvoicepurchases, numberautorizationinvoicepurchases, numberinvoicepurchases, subtotalinvoicepurchases, totalpurchases) => {
        const param = {
            "codeprovider": codeprovider,
            "datecreatedpurchases": datecreatedpurchases,
            "datedocumentpurchases": datedocumentpurchases,
            "detailinvoicepurchases": detailinvoicepurchases,
            "detailseatpurchases": detailseatpurchases,
            "idpurchases": idpurchases,
            "idtypepayments": idtypepayments,
            "isavailablepurchase": isavailablepurchase,
            "ivainvoicepurchases": ivainvoicepurchases,
            "numberautorizationinvoicepurchases": numberautorizationinvoicepurchases,
            "numberinvoicepurchases": numberinvoicepurchases,
            "subtotalinvoicepurchases": subtotalinvoicepurchases,
            "totalpurchases": totalpurchases,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Purchases/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    editDetailInformation = async (datecreatedpurchases, dateupdateddetailpurchases, descriptiondetailpuchases, idaccountplan, iddetailpurchases, idpurchases, isavailable, quantitydetailpurchases, valuetotaldetailpurchases, valueunitarydetailpurchases,ivadetailpurchases) => {
        const param = {
            "datecreatedpurchases": datecreatedpurchases,
            "dateupdateddetailpurchases": dateupdateddetailpurchases,
            "descriptiondetailpuchases": descriptiondetailpuchases,
            "idaccountplan": idaccountplan,
            "iddetailpurchases": iddetailpurchases,
            "idpurchases": idpurchases,
            "isavailable": isavailable,
            "quantitydetailpurchases": quantitydetailpurchases,
            "valuetotaldetailpurchases": valuetotaldetailpurchases,
            "valueunitarydetailpurchases": valueunitarydetailpurchases,
            "ivadetailpurchases": ivadetailpurchases,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    updateDeletePurchase = async (codeprovider, datecreatedpurchases, datedocumentpurchases, detailinvoicepurchases, detailseatpurchases, idpurchases, idtypepayments, isavailablepurchase, ivainvoicepurchases, numberautorizationinvoicepurchases, numberinvoicepurchases, subtotalinvoicepurchases, totalpurchases) => {
        const param = {
            "codeprovider": codeprovider,
            "datecreatedpurchases": datecreatedpurchases,
            "datedocumentpurchases": datedocumentpurchases,
            "detailinvoicepurchases": detailinvoicepurchases,
            "detailseatpurchases": detailseatpurchases,
            "idpurchases": idpurchases,
            "idtypepayments": idtypepayments,
            "isavailablepurchase": false,//para cambiar de estado
            "ivainvoicepurchases": ivainvoicepurchases,
            "numberautorizationinvoicepurchases": numberautorizationinvoicepurchases,
            "numberinvoicepurchases": numberinvoicepurchases,
            "subtotalinvoicepurchases": subtotalinvoicepurchases,
            "totalpurchases": totalpurchases,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Purchases/updateDeletePurchase', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    updateDeleteDetail = async (iddetailpurchases) => {
        console.log('updateDeleteDetail');
        const param = {
            "datecreatedpurchases": "2022-01-16",
            "descriptiondetailpuchases": "0",
            "idaccountplan": 0,
            "iddetailpurchases": iddetailpurchases,
            "idpurchases": 0,
            "quantitydetailpurchases": 0,
            "valuetotaldetailpurchases": 0,
            "valueunitarydetailpurchases": 0,
            "isavailable": false,
            "dateupdateddetailpurchases": "2022-01-16"
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Detailpurchases/updateDeleteDetail', param)
            .then(response => {
                console.log('data', response);
                let fields = this.state.fields;
                fields['idpurchases']=response.data.idpurchases;
                this.setState({ fields });  
            }
            )
    };
    onClickDeletePurchase = async () => {
        await this.updateDeletePurchase(this.state.codeprovider, this.state.datecreatedpurchases, this.state.datedocumentpurchases, this.state.detailinvoicepurchases, this.state.detailseatpurchases, this.state.idFacturaEliminar, this.state.idtypepayments, this.state.isavailablepurchase, this.state.ivainvoicepurchases, this.state.numberautorizationinvoicepurchases, this.state.numberinvoicepurchases, this.state.subtotalinvoicepurchases, this.state.totalpurchases);
        await this.getInformation();
    };

    insertInformation = async (codeprovider, datecreatedpurchases, datedocumentpurchases, detailinvoicepurchases, detailseatpurchases, idpurchases, idtypepayments, isavailablepurchase, ivainvoicepurchases, numberautorizationinvoicepurchases, numberinvoicepurchases, subtotalinvoicepurchases, totalpurchases) => {
        var today = new Date();
        const param = {
            "codeprovider": codeprovider,
            "datecreatedpurchases": this.toIsoString(today),
            "datedocumentpurchases": datedocumentpurchases,
            "detailinvoicepurchases": detailinvoicepurchases,
            "detailseatpurchases": detailseatpurchases,
            //"idpurchases": idpurchases,
            "idtypepayments": idtypepayments,
            "isavailablepurchase": isavailablepurchase,
            "ivainvoicepurchases": ivainvoicepurchases,
            "numberautorizationinvoicepurchases": numberautorizationinvoicepurchases,
            "numberinvoicepurchases": numberinvoicepurchases,
            "subtotalinvoicepurchases": subtotalinvoicepurchases,
            "totalpurchases": totalpurchases,
        }
        await axios.post('https://localhost:44315/api/Purchases/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    clickInsertarDocumento = async () => {
        await this.insertInformation(this.state.fields["codeprovider"], this.state.fields["datecreatedpurchases"], this.state.fields["datedocumentpurchases"], this.state.fields["detailinvoicepurchases"], this.state.fields["detailseatpurchases"], this.state.fields["idpurchases"], this.state.fields["idtypepayments"], true, this.state.fields["ivainvoicepurchases"], this.state.fields["numberautorizationinvoicepurchases"], this.state.fields["numberinvoicepurchases"], this.state.fields["subtotalinvoicepurchases"], this.state.fields["totalpurchases"]);
        //await this.insertInformationDetail(this.state.datecreatedpurchases, this.state.dateupdateddetailpurchases, this.state.descriptiondetailpuchases, this.state.idaccountplan, this.state.iddetailpurchases, this.state.infoContract.idpurchases, this.state.isavailable, this.state.quantitydetailpurchases, this.state.valuetotaldetailpurchases, this.state.valueunitarydetailpurchases);
        console.log('detail', this.state.dataDetail);
        var i;
        var row = this.state.dataDetail;
        for (i = 0; i < row.length; i++) {
            //loopData += `<li>${data[i].name}</li>`
            console.log(row[i].key);
            await this.insertInformationDetail(row[i].datecreatedpurchases, row[i].dateupdateddetailpurchases, row[i].descriptiondetailpuchases, 
                row[i].idaccountplan, row[i].iddetailpurchases, this.state.infoContract.idpurchases, true, row[i].quantitydetailpurchases, 
                row[i].valuetotaldetailpurchases, row[i].valueunitarydetailpurchases,row[i].ivadetailpurchases);
        }
        var detailsNuevo = this.state.dataDetail.map(function (row) {
            //this.insertInformationDetail(row.datecreatedpurchases, row.dateupdateddetailpurchases, row.descriptiondetailpuchases, row.idaccountplan, row.iddetailpurchases, 1, true, row.quantitydetailpurchases, row.valuetotaldetailpurchases, row.valueunitarydetailpurchases);
            //this.getInformation();
            // this.insertarDetail(row);
        });
        await this.getInformation();
        this.resetFields();
    };
    insertarDetail = (row) => {
        console.log(row.key)

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ flatControl: 'editar' });
        this.setState({ flatNuevoDocumento: true });
        if (selectedRowKeys.length > 1) {
            const lastSelectedRowIndex = [...selectedRowKeys].pop();
            this.setState({ selectedRowKeys: lastSelectedRowIndex });
        }

        let fields = this.state.fields;
        fields['numberautorizationinvoicepurchases'] = selectedRows[0].numberautorizationinvoicepurchases;
        fields['numberinvoicepurchases'] = selectedRows[0].numberinvoicepurchases;
        fields['codeprovider'] = selectedRows[0].codeprovider;
        console.log('fecha document', selectedRows[0].datedocumentpurchases)

        fields['datecreatedpurchases'] = selectedRows[0].datecreatedpurchases;
        fields['datedocumentpurchases'] = selectedRows[0].datedocumentpurchases;
        fields['detailinvoicepurchases'] = selectedRows[0].detailinvoicepurchases;
        fields['detailseatpurchases'] = selectedRows[0].detailseatpurchases;
        fields['idpurchases'] = selectedRows[0].idpurchases;
        fields['idtypepayments'] = selectedRows[0].idtypepayments;
        fields['isavailablepurchase'] = selectedRows[0].isavailablepurchase;
        fields['ivainvoicepurchases'] = selectedRows[0].ivainvoicepurchases;
        fields['subtotalinvoicepurchases'] = selectedRows[0].subtotalinvoicepurchases;
        fields['totalpurchases'] = selectedRows[0].subtotalinvoicepurchases;


        this.setState({ fields });

        this.setState({ selectedRowKeys });
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('value changed: ', selectedRows);
        /*this.setState({ codeprovider: selectedRows[0].codeprovider });
        this.setState({ datecreatedpurchases: selectedRows[0].datecreatedpurchases });
        this.setState({ datedocumentpurchases: selectedRows[0].datedocumentpurchases });
        this.setState({ detailinvoicepurchases: selectedRows[0].detailinvoicepurchases });
        this.setState({ detailseatpurchases: selectedRows[0].detailseatpurchases });
        this.setState({ idpurchases: selectedRows[0].idpurchases });
        this.setState({ idtypepayments: selectedRows[0].idtypepayments });
        this.setState({ isavailablepurchase: selectedRows[0].isavailablepurchase });
        this.setState({ ivainvoicepurchases: selectedRows[0].ivainvoicepurchases });
        this.setState({ numberautorizationinvoicepurchases: selectedRows[0].numberautorizationinvoicepurchases });
        this.setState({ numberinvoicepurchases: selectedRows[0].numberinvoicepurchases });
        this.setState({ subtotalinvoicepurchases: selectedRows[0].subtotalinvoicepurchases });
        this.setState({ totalpurchases: selectedRows[0].totalpurchases });*/
        this.setState({ disableNuevo: true });
        this.setState({ disableEditar: false });
        this.setState({ disableGuardar: true });
        this.setState({ disableEliminar: true });
        this.setState({ disableCancelar: false });
        this.setState({ flagNuevo: false });
        console.log('vfecha', this.state.datedocumentpurchases);

        this.getInformationDetailById(selectedRows[0].idpurchases);
    };
    onChangeIdaccountplanDetail = (txt) => {
        //console.log(value)
        this.setState({ value: txt })
    };
    onChangeCodeprovider = (value) => {
        this.setState({ codeprovider: value })
    }
    onChangeAsientoContable = (value) => {
        this.setState({ idaccountplan: value })
    }
    onChangeDetailinvoicepurchases = (e) => {
        this.setState({ detailinvoicepurchases: e.target.value })
    }
    onChangeDetailseatpurchases = (e) => {
        this.setState({ detailseatpurchases: e.target.value })
    }
    onChangeIdtypepayments = (e) => {
        this.setState({ idtypepayments: e.target.value })
    }
    onChangeIsavailablepurchase = (checked) => {
        console.log(`switch to ${checked}`);
        this.setState({ isavailablepurchase: checked });

    };
    onChangeNumberautorizationinvoicepurchases = (e) => {
        this.setState({ numberautorizationinvoicepurchases: e.target.value })
    }
    onChangeNumberinvoicepurchases = (e) => {
        this.setState({ numberinvoicepurchases: e.target.value })
    }
    onChangeDateDocumentPurchases = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ datedocumentpurchases: date })
    }
    //
    onChangeDatecreatedpurchasesDetail = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ datecreatedpurchasesDetail: date })
    };
    onChangeDateupdateddetailpurchasesDetail = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ dateupdateddetailpurchases: date })
    };
    onChangeDescriptiondetailpuchasesDetail = (e) => {
        this.setState({ descriptiondetailpuchases: e.target.value })
    }
    /*onChangeIdaccountplanDetail = (e) => {
        this.setState({ idaccountplan: e.target.value })
    }*/
    onChangeIsavailableDetail = (checked) => {
        console.log(`switch to ${checked}`);
        this.setState({ isavailableDetail: checked })
    };
    
    onChangeQuantitydetailpurchasesDetail = (e) => {
        this.setState({ quantitydetailpurchases: e.target.value })
    }
    onChangeValuetotaldetailpurchasesDetail = (e) => {
        this.setState({ valuetotaldetailpurchases: e.target.value })
    }
    onChangeValueunitarydetailpurchasesDetail = (e) => {
        this.setState({ valueunitarydetailpurchases: e.target.value })
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
            console.log("editar");
            await this.editInformation(this.state.codeprovider, this.state.datecreatedpurchases, this.state.datedocumentpurchases, this.state.detailinvoicepurchases, this.state.detailseatpurchases, this.state.idpurchases, this.state.idtypepayments, this.state.isavailablepurchase, this.state.ivainvoicepurchases, this.state.numberautorizationinvoicepurchases, this.state.numberinvoicepurchases, this.state.subtotalinvoicepurchases, this.state.totalpurchases);
            
            this.resetFields();
            this.setState({ disableControl: true });
            this.setState({ disableNuevo: false });
            this.setState({ disableEditar: true });
            this.setState({ disableGuardar: true });
            this.setState({ disableEliminar: true });
            this.setState({ disableCancelar: true });
            //await this.getInformation();
        }
        else {
            console.log("inserta");
            await this.insertInformation(this.state.codeprovider, this.state.datecreatedpurchases, this.state.datedocumentpurchases, this.state.detailinvoicepurchases, this.state.detailseatpurchases, this.state.idpurchases, this.state.idtypepayments, this.state.isavailablepurchase, this.state.ivainvoicepurchases, this.state.numberautorizationinvoicepurchases, this.state.numberinvoicepurchases, this.state.subtotalinvoicepurchases, this.state.totalpurchases);
            await this.getInformation();
            this.resetFields();
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
    fileData = () => {
        return (
            <div>
                <h2>File Details:</h2>
            </div>
        )
    };
    clickNuevoDocumento = () => {
        this.setState({ flatControl: 'nuevo' });
        if (this.state.flatNuevoDocumento === false) {
            this.setState({ flatNuevoDocumento: true });
        }
        else {
            this.setState({ flatNuevoDocumento: false });
        }
    }

    nuevoDocumento = () => {
        const { numberautorizationinvoicepurchases } = this.state;

        if (this.state.flatNuevoDocumento) {
            return (
                <div>
                    <Row>
                        <Col span={6}>
                            <h4 > Fecha Documento </h4>
                            <Form.Item label="">
                                < DatePicker
                                    ref="datedocumentpurchases"
                                    //selected={this.state.datedocumentpurchases}
                                    //disabled={this.state.datedocumentpurchases}
                                    //value={moment(this.state.datedocumentpurchases, 'YYYY-MM-DD')}
                                    //defaultValue={moment(Date, 'YYYY-MM-DD')}
                                    //onChange={this.onChangeDateDocumentPurchases}
                                    onChange={this.handleChangeDinamycDate.bind(this, "datedocumentpurchases")}
                                    value={moment(this.state.fields["datedocumentpurchases"], 'YYYY-MM-DD')}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["datedocumentpurchases"]}</span>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <h4 >Tipo pago </h4>
                            <Form.Item label="">
                                <Select style={{ width: 120 }}
                                    ref="idtypepayments"
                                    //onChange={this.handleChange}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "idtypepayments")}
                                    //value={this.state.idtypepayments || ''}
                                    value={this.state.fields["idtypepayments"] || ''}
                                    options={this.state.dataTypePayments}>
                                </Select>
                                <span style={{ color: "red" }}>{this.state.errors["idtypepayments"]}</span>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <h4 >Proveedor </h4>
                            <Form.Item label="">
                                <Select
                                    ref="codeprovider"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    //optionFilterProp="children"
                                    options={this.state.dataProviders}
                                    //onChange={this.onChangeCodeprovider}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "codeprovider")}
                                    value={this.state.fields["codeprovider"] || ''}
                                >

                                </Select>
                                <span style={{ color: "red" }}>{this.state.errors["codeprovider"]}</span>
                            </Form.Item>
                        </Col>
                        <Col span={6}>

                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <h4 >Número Autorización </h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.disableControl}
                                    ref="numberautorizationinvoicepurchases"
                                    //value={numberautorizationinvoicepurchases || ''}
                                    //onChange={this.onChangeNumberautorizationinvoicepurchases} 
                                    onChange={this.handleChangeDinamyc.bind(this, "numberautorizationinvoicepurchases")}
                                    value={this.state.fields["numberautorizationinvoicepurchases"]}
                                    pattern="[0-9]{0,13}"
                                />
                                <span style={{ color: "red" }}>{this.state.errors["numberautorizationinvoicepurchases"]}</span>
                            </Form.Item>

                        </Col>
                        <Col span={6}>
                            <h4 >Número Factura </h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.disableControl}
                                    value={this.state.fields["numberinvoicepurchases"] || ''}
                                    onChange={this.handleChangeDinamyc.bind(this, "numberinvoicepurchases")}

                                />
                                <span style={{ color: "red" }}>{this.state.errors["numberinvoicepurchases"]}</span>
                            </Form.Item>

                        </Col>
                        <Col span={6}>
                            {/*<h4 >Asiento </h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.disableControl}
                                    value={this.state.detailseatpurchases || ''}
                                    onChange={this.onChangeDetailseatpurchases} />
                            </Form.Item>*/}

                        </Col>
                        <Col span={6}>


                        </Col>

                    </Row>
                    <Row>
                        <Col span={20}>
                            <h4 >Detalle</h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.disableControl}
                                    //value={this.state.detailinvoicepurchases || ''}
                                    value={this.state.fields["detailinvoicepurchases"] || ''}
                                    //onChange={this.onChangeDetailinvoicepurchases} 
                                    onChange={this.handleChangeDinamyc.bind(this, "detailinvoicepurchases")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            {/*<h4 >Activo </h4>
                            <Form.Item label="" valuePropName="checked">
                                <Switch
                                    onChange={this.onChangeIsavailablepurchase}
                                    checked={this.state.isavailablepurchase}
                                //disabled={this.state.disableControl}
                                />
                            </Form.Item>*/}
                            
                            
                            
                        </Col>
                        <Col span={2}>

                        </Col>

                    </Row>
                    <Row>
                        <Col span={6}>
                        <h4 >Sub Total</h4>
                            <Form.Item label="">
                                <Input
                                    disabled={true}
                                    //onChange={this.onChangeSubtotalinvoicepurchases} 
                                    value={this.state.fields["subtotalinvoicepurchases"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "subtotalinvoicepurchases")}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <h4 >Iva</h4>
                            <Form.Item label="">
                                <Input
                                    disabled={true}
                                    value={this.state.fields["ivainvoicepurchases"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "ivainvoicepurchases")}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <h4 >Total</h4>
                            <Form.Item label="">
                                <Input
                                    disabled={true}
                                    value={this.state.fields["totalpurchases"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "totalpurchases")}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />

                    <Row>
                        <Col span={24}>
                            <h4 >Detalle Factura</h4>
                            <h4 >Cuenta Contable</h4>
                            <Form.Item label="">
                                <Select
                                    ref="idaccountplan"
                                    showSearch
                                    style={{ width: 602 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    options={this.state.dataCuentasContables}
                                    //onChange={this.onChangeAsientoContable}
                                    value={this.state.fields["idaccountplan"] || ''}
                                    onChange={this.handleChangeDinamycSelect.bind(this, "idaccountplan")}
                                ></Select>
                                <span style={{ color: "red" }}>{this.state.errors["idaccountplan"]}</span>
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <h4 >Detalle</h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.disableControl}
                                    //value={this.state.descriptiondetailpuchases || ''}
                                    //onChange={this.onChangeDescriptiondetailpuchasesDetail} 
                                    value={this.state.fields["descriptiondetailpuchases"] || ''}
                                    onChange={this.handleChangeDinamyc.bind(this, "descriptiondetailpuchases")}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["descriptiondetailpuchases"]}</span>
                            </Form.Item>
                        </Col>
                        <Col span={4}>

                            {/*<Form.Item >
                                <Input
                                    //disabled={this.state.disableControl}
                                    onChange={this.onChangeIdaccountplanDetail} />
                            </Form.Item>*/}
                            {/*<TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                value={this.state.idaccountplan}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={(txt)=>{this.onChangeIdaccountplanDetail(txt)}}
                                treeData={this.state.dataCuentasContables}
                            >
                                <TreeNode value="parent 1" title="parent 1">
                                    <TreeNode value="parent 1-0" title="parent 1-0">
                                        <TreeNode value="leaf1" title="leaf1" />
                                        <TreeNode value="leaf2" title="leaf2" />
                                    </TreeNode>
                                    <TreeNode value="parent 1-1" title="parent 1-1">
                                        <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
                                    </TreeNode>
                        </TreeNode>
                            </TreeSelect>*/}
                        </Col>
                        <Col span={4}>
                            <h4 >Iva</h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.quantitydetailpurchases}
                                    //onChange={this.onChangeQuantitydetailpurchasesDetail} 
                                    value={this.state.fields["ivadetailpurchases"] || this.state.valueIva}
                                    onChange={this.handleChangeDinamyc.bind(this, "ivadetailpurchases")}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["ivadetailpurchases"]}</span>
                            </Form.Item>

                        </Col>
                        <Col span={4}>
                            <h4 >Cantidad</h4>
                            <Form.Item label="">
                                <Input
                                    //disabled={this.state.quantitydetailpurchases}
                                    //onChange={this.onChangeQuantitydetailpurchasesDetail} 
                                    value={this.state.fields["quantitydetailpurchases"] || ''}
                                    onChange={this.handleChangeDinamyc.bind(this, "quantitydetailpurchases")}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["quantitydetailpurchases"]}</span>
                            </Form.Item>

                        </Col>
                        <Col span={4}>
                            <h4 >Valor Unitario </h4>
                            <Form.Item >
                                <Input
                                    //disabled={this.state.valueunitarydetailpurchases}
                                    onChange={this.onChangeValueunitarydetailpurchasesDetail}
                                    value={this.state.fields["valueunitarydetailpurchases"] || ''}
                                    onChange={this.handleChangeDinamyc.bind(this, "valueunitarydetailpurchases")}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["valueunitarydetailpurchases"]}</span>

                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <h4 >Total </h4>
                            <Form.Item >
                                <Input
                                    disabled={true}
                                    //onChange={this.onChangeValuetotaldetailpurchasesDetail} 
                                    value={this.state.fields["valuetotaldetailpurchases"] || ''}
                                    onChange={this.handleChangeDinamyc.bind(this, "valuetotaldetailpurchases")}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["valuetotaldetailpurchases"]}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button
                        onClick={() => this.contactSubmitDetail()}
                    //disabled={this.state.disableNuevo}
                    >+</Button>

                    <Table

                        columns={this.columnsDetail}
                        dataSource={this.state.dataDetail}
                        size="small"
                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}


                    />
                </div>
            )
        }
    };
    render() {
        const columns = [
            
            {
                title: 'Id',
                dataIndex: 'idpurchases',
                //render: (text) => <a>{text}</a>,
            },
            {
                title: 'Proveedor',
                dataIndex: 'codeprovider',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('codeprovider'),
            },
            {
                title: 'Creación',
                dataIndex: 'datecreatedpurchases',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('datecreatedpurchases'),
            },
            {
                title: 'Fecha Documento',
                dataIndex: 'datedocumentpurchases',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('datedocumentpurchases'),
            },
            {
                title: 'Detalle',
                dataIndex: 'detailinvoicepurchases',
                //render: (text) => <a>{text}</a>,
            },
            /*{
                title: 'detailseatpurchases',
                dataIndex: 'detailseatpurchases',
                render: (text) => <a>{text}</a>,
            },*/
            {
                title: 'Autorización',
                dataIndex: 'numberautorizationinvoicepurchases',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('numberautorizationinvoicepurchases'),
            },

            {
                title: 'Pago',
                dataIndex: 'idtypepayments',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('idtypepayments'),
            },
            /*{
                title: 'isavailablepurchase',
                dataIndex: 'isavailablepurchase',
                render: (text) => <a>{text}</a>,
            },*/
            {
                title: 'Numero Factura',
                dataIndex: 'numberinvoicepurchases',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('numberinvoicepurchases'),
            },
            {
                title: 'Iva',
                dataIndex: 'ivainvoicepurchases',
                //render: (text) => <a>{text}</a>,
            },


            {
                title: 'Subtotal',
                dataIndex: 'subtotalinvoicepurchases',
                //render: (text) => <a>{text}</a>,
            },
            {
                title: 'Total',
                dataIndex: 'totalpurchases',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('totalpurchases'),
            },
            {
                title: 'Eliminar',
                dataIndex: 'idpurchases',
                render: (text, record) => {
                    let control = ''
                    return <Button type="primary" size="small" shape="circle" icon={<DeleteFilled
                        onClick={() =>
                            this.eliminarFacturaCompra(text)
                        }
                    />} />
                },
                //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
            },
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { selectedOption } = this.state;
        return (
            <div>
                <Modal title={"Mensaje Alerta"}
                    visible={this.state.flatShowModalEliminarFactura}
                    onOk={this.handleOkEliminarFactura}
                    onCancel={this.handleCancelEliminarFactura}
                    width={400}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <h4>Esta seguro de eliminar la factura:?</h4>

                        </Col>
                    </Row>
                    <Divider />
                </Modal>
                <Modal title={"Mensaje Alerta"}
                    visible={this.state.flatShowModalEliminarFacturaDetalle}
                    onOk={this.handleOkEliminarFacturaDetalle}
                    onCancel={this.handleCancelEliminarFacturaDetalle}
                    width={400}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <h4>Esta seguro de eliminar el detalle:?</h4>

                        </Col>
                    </Row>
                    <Divider />
                </Modal>
                <Modal title={"Mensaje Alerta"}
                    visible={this.state.flatShowModalGuardarFactura}
                    onOk={this.handleOkGuardarFactura}
                    onCancel={this.handleCancelGuardarFactura}
                    width={400}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <h4>Esta seguro guardar la factura:?</h4>
                        </Col>
                    </Row>
                    <Divider />
                </Modal>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size="default"
                    className="ant-advanced-search-form"
                >
                    <Button onClick={() => this.clickNuevoDocumento()}>+ Nuevo Documento</Button>
                    <Divider/>
                   
                    <Table
                        className="ant-table"

                        rowSelection={{
                            type: 'radio',
                            ...rowSelection
                        }}
                        type={Radio}
                        columns={columns}
                        dataSource={this.state.data}
                        size="small"
                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}

                    />
                    <Divider />
                    
                    {this.nuevoDocumento()}
                    <Divider />
                    {/*<Form.Item label="idpurchases" >
                        <Input
                            disabled={this.state.disableControl}
                            onChange={this.onChangeIdpurchases} />
                    </Form.Item>*/}
                    <Row gutter={24}>
                        
                        <Col span={3}>
                            <Form.Item >
                                <Button onClick={() => this.contactSubmit()}
                                    icon={<SaveOutlined />}
                                    type="primary"
                                //disabled={this.state.disableGuardar}

                                >Guardar</Button>
                            </Form.Item>
                        </Col>
                        <Col span={3}>

                        </Col>
                        <Col span={2}>

                        </Col>
                    </Row>
                </Form>
                
            </div >
        );
    }
}
export default Purchases;
