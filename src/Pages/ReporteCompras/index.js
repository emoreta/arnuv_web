import axios from 'axios';
import React, { Component, useRef } from "react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import moment from 'moment';
import 'moment/locale/zh-cn';


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
    TreeSelect, Divider, Row, Col, Modal, Tooltip
} from 'antd';
import { SearchOutlined, BarsOutlined, CloseOutlined, SaveOutlined, FileExcelOutlined } from '@ant-design/icons';
import { ThreeDRotation } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';
//import ReactExport from "react-export-excel";
//import {ReactExport} from "react-data-export";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";



const CrearPdfPrint = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>


            <ReporteCompras ref={componentRef} />
            <Button type="primary" size="small" onClick={handlePrint} shape="round" size="large">
                PDF
            </Button>

        </div>
    );
};
//const ExcelFile = ReactExport.ExcelFile;
//const ExcelSheet = ReactExport.ExcelSheet;
//const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ReporteCompras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: "",
            fechaFin: "",
            dataDetail: [],
            dataDetailId: [],
            generarExcel: false,
            sheet: {},
        }
    }

    componentDidMount() {
        var today = new Date();

        this.setState({ fechaInicio: this.toIsoString(today) });
        this.setState({ fechaFin: this.toIsoString(today) });

    };
    getSheetData(data, header) {
        var fields = Object.keys(data[0]);
        var sheetData = data.map(function (row) {
            return fields.map(function (fieldName) {
                return row[fieldName] ? row[fieldName] : "";
            });
        });
        sheetData.unshift(header);
        return sheetData;
    }

    saveAsExcel = async () => {
        /*var data = [
            { name: "John", city: "Seattle" },
            { name: "Mike", city: "Los Angeles" },
            { name: "Zach", city: "New York" }
        ];*/
        let header = ["ID", "TIPO PAGO", "PROVEEDOR", "FECHA", "NUMERO FACTURA", "NUMERO AUTORIZACION", "DETALLE", "IVA", "SUBTOTAL", "TOTAL"];
        let headerDetail = ["ID", "DESCRIPCIÓN", "IDACCOUNT", "IVA", "CANTIDAD", "VALOR UNITARIO", "TOTAL"];
        //= this.state.sheets;

        XlsxPopulate.fromBlankAsync().then(async (workbook) => {
            for (var i = 0; i < this.state.dataDetail.length; i++) {

                console.log(this.state.dataDetail[i].idpurchases)
                await this.getInformationDetailById(this.state.dataDetail[i].id);

                const newSheet1 = workbook.addSheet('Factura' + (i + 1) + '_' + this.state.dataDetail[i].numberinvoicepurchases);
                const sheetData = this.getSheetData(this.state.dataDetailId, headerDetail);
                const totalColumns = sheetData[0].length;
                newSheet1.cell("A1").value(sheetData);
                const range = newSheet1.usedRange();
                const endColumn = String.fromCharCode(64 + totalColumns);
                newSheet1.row(1).style("bold", true);
                newSheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
                range.style("border", true);

            }

            const sheet1 = workbook.sheet(0);
            const sheetData = this.getSheetData(this.state.dataDetail, header);
            const totalColumns = sheetData[0].length;

            sheet1.cell("A1").value(sheetData);
            const range = sheet1.usedRange();
            const endColumn = String.fromCharCode(64 + totalColumns);
            sheet1.row(1).style("bold", true);
            sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
            range.style("border", true);


            return workbook.outputAsync().then((res) => {
                saveAs(res, "ReporteComprasArnuv.xlsx");
            });
        });
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
    getCompras = async (fechaInicio, fechaFin) => {
        await axios.get('https://localhost:44315/api/Purchases/getPurchasesBetweenDate?' + 'fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin)
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "id": row.idpurchases,
                        "idtypepayments": row.idtypepayments,
                        "codeprovider": row.codeprovider,
                        //"datecreatedpurchases": row.datecreatedpurchases,
                        "datedocumentpurchases": row.datedocumentpurchases,
                        "numberinvoicepurchases": row.numberinvoicepurchases,
                        "numberautorizationinvoicepurchases": row.numberautorizationinvoicepurchases,
                        "detailinvoicepurchases": row.detailinvoicepurchases,
                        "ivainvoicepurchases": row.ivainvoicepurchases,
                        "subtotalinvoicepurchases": row.subtotalinvoicepurchases,
                        "totalpurchases": row.totalpurchases

                        //"detailseatpurchases": row.detailseatpurchases,
                        //"idpurchases": row.idpurchases,

                        //"isavailablepurchase": row.isavailablepurchase,
                    }
                })
                this.setState({ dataDetail: options });
                console.log('data detail', response.data);
            }
            )
    };
    getInformationDetailById = async (id) => {
        console.log('aqui');
        await axios.get('https://localhost:44315/api/Detailpurchases/getbyIdPurchase/' + id)
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.iddetailpurchases,
                        "descriptiondetailpuchases": row.descriptiondetailpuchases,
                        //"datecreatedpurchases": row.datecreatedpurchases,
                        "idaccountplan": row.idaccountplan,
                        "ivadetailpurchases": row.ivadetailpurchases,
                        "quantitydetailpurchases": row.quantitydetailpurchases,
                        "valueunitarydetailpurchases": row.valueunitarydetailpurchases,
                        "valuetotaldetailpurchases": row.valuetotaldetailpurchases,
                        "dateupdateddetailpurchases": row.dateupdateddetailpurchases,
                        "iddetailpurchases": row.iddetailpurchases,
                        "idpurchases": row.idpurchases,
                        "isavailable": row.isavailable,
                    }
                })
                this.setState({ dataDetailId: options });
                console.log('data detail compras', options);
            }
            )
    };
    onChangeFechaInicio = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ fechaInicio: dateString })
    };
    onChangeFechaFin = (date, dateString) => {
        console.log(dateString);
        this.setState({ fechaFin: dateString })
    };
    buscarCompras() {
        this.setState({ generarExcel: true });
        this.getCompras(this.state.fechaInicio, this.state.fechaFin);

    }

    /*nuevoDocumento = () => {
       console.log('aqui');
       //this.setState({generarExcel:true});
       if (this.state.generarExcel) {
           console.log('dentro');
           return (

              
           )
       }
   }*/


    render() {
        return (

            <div>

                <Row>
                    <Col span={6}>
                        <h4 > Fecha Inicio </h4>
                        <Form.Item label="">
                            < DatePicker
                                ref="fechaInicio"
                                //selected={this.state.datedocumentpurchases}
                                //disabled={this.state.datedocumentpurchases}
                                value={moment(this.state.fechaInicio, 'YYYY-MM-DD')}
                                //defaultValue={moment(Date, 'YYYY-MM-DD')}
                                onChange={this.onChangeFechaInicio}
                            //onChange={this.handleChangeDinamycDate.bind(this, "datedocumentpurchases")}
                            //value={moment(this.state.fields["datedocumentpurchases"], 'YYYY-MM-DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <h4 > Fecha Fin</h4>
                        <Form.Item label="">
                            < DatePicker
                                ref="fechaInicio"
                                //selected={this.state.datedocumentpurchases}
                                //disabled={this.state.datedocumentpurchases}
                                value={moment(this.state.fechaFin, 'YYYY-MM-DD')}
                                //defaultValue={moment(Date, 'YYYY-MM-DD')}
                                onChange={this.onChangeFechaFin}
                            //onChange={this.handleChangeDinamycDate.bind(this, "datedocumentpurchases")}
                            //value={moment(this.state.fields["datedocumentpurchases"], 'YYYY-MM-DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Buscar:">
                            <Tooltip title="Buscar">
                                <Button shape="circle" icon={<SearchOutlined />} onClick={() => this.buscarCompras()} />
                            </Tooltip>

                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        {/*<Button type="primary" size="small">
                            PDF
        </Button>*/}
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
                <table border="1">
                    <thead>
                        <th>ID</th>
                        <th>TIPO PAGO</th>
                        <th>PROVEEDOR</th>
                        <th>FECHA</th>
                        <th>NUMERO FACTURA</th>
                        <th>NUMERO AUTORIZACIÓN</th>
                        <th>DETALLE</th>
                        <th>IVA</th>
                        <th>SUBTOTAL</th>
                        <th>TOTAL</th>
                    </thead>
                    <tbody>

                        {this.state.dataDetail.map(function (item, i) {
                            console.log('test');
                            return <tr><td key={i}>{item.idpurchases}</td><td >{item.idtypepayments}</td><td >{item.codeprovider}</td><td >{item.datecreatedpurchases}</td>
                                <td >{item.numberinvoicepurchases}</td><td >{item.numberautorizationinvoicepurchases}</td><td >{item.detailinvoicepurchases}</td>
                                <td >{item.ivainvoicepurchases}</td><td >{item.subtotalinvoicepurchases}</td><td >{item.totalpurchases}</td></tr>
                        })}
                    </tbody>
                </table>
                <Button type="primary" size="small" onClick={() => this.saveAsExcel()} shape="round" size="large">
                    Excel
                </Button>
            </div >
        );
    }
}
export default CrearPdfPrint;
