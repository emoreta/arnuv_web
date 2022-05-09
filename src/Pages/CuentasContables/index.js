import axios from 'axios';
import React, { Component } from 'react';
import classes from '../CuentasContables/index.css';
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
    TreeSelect, Divider, Row, Col, Dropdown, Menu
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';


import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item>
            1
        </Menu.Item>
        <Menu.Item>
            2
        </Menu.Item>
        <Menu.Item>
            3
        </Menu.Item>
        <Menu.Item>
            4
        </Menu.Item>
        <Menu.Item>
            5
        </Menu.Item>
    </Menu>
);

const { Option } = Select;

class Accountplan extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        balanceaccountplan: "",
        codeaccountplan: "",
        detailaccountplan: "",
        idaccountplan: 0,
        idchildrenaccountplan: 0,
        idparentaccountplan: 0,
        isavailableaccountplan: false,
        levelaccountplan: 0,
        disableControl: false,
        disableNuevo: false,
        disableEditar: false,
        disableGuardar: false,
        disableEliminar: false,
        disableCancelar: false,
        flagNuevo: false

    };


    handleChangeParent = (value) => {
        console.log(`selected ${value}`);
        this.setState({idparentaccountplan:value });
    }
    handleChangeChildren = (value) => {
        console.log(`selected ${value}`);
        this.setState({idchildrenaccountplan:value });
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
        await axios.get('https://localhost:44315/api/Accountplan/getAccountplan')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.idaccountplan,
                        "balanceaccountplan": row.balanceaccountplan,
                        "codeaccountplan": row.codeaccountplan,
                        "createdaccountplan": row.createdaccountplan,
                        "detailaccountplan": row.detailaccountplan,
                        "idaccountplan": row.idaccountplan,
                        "idchildrenaccountplan": row.idchildrenaccountplan,
                        "idparentaccountplan": row.idparentaccountplan,
                        "isavailableaccountplan": row.isavailableaccountplan,
                        "levelaccountplan": row.levelaccountplan,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (balanceaccountplan, codeaccountplan, createdaccountplan, detailaccountplan, idaccountplan, idchildrenaccountplan, idparentaccountplan, isavailableaccountplan, levelaccountplan) => {
        const param = {
            "balanceaccountplan": balanceaccountplan,
            "codeaccountplan": codeaccountplan,
            "createdaccountplan": createdaccountplan,
            "detailaccountplan": detailaccountplan,
            "idaccountplan": idaccountplan,
            "idchildrenaccountplan": idchildrenaccountplan,
            "idparentaccountplan": idparentaccountplan,
            "isavailableaccountplan": isavailableaccountplan,
            "levelaccountplan": levelaccountplan,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Accountplan/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (balanceaccountplan, codeaccountplan, createdaccountplan, detailaccountplan, idaccountplan, idchildrenaccountplan, idparentaccountplan, isavailableaccountplan, levelaccountplan) => {
        var today = new Date();
        const param = {
            "balanceaccountplan": balanceaccountplan,
            "codeaccountplan": codeaccountplan,
            "createdaccountplan": this.toIsoString(today),
            "detailaccountplan": detailaccountplan,
            "idaccountplan": idaccountplan,
            "idchildrenaccountplan": idchildrenaccountplan,
            "idparentaccountplan": idparentaccountplan,
            "isavailableaccountplan": isavailableaccountplan,
            "levelaccountplan": levelaccountplan,
        }
        await axios.post('https://localhost:44315/api/Accountplan/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
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
    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length > 1) {
            const lastSelectedRowIndex = [...selectedRowKeys].pop();
            this.setState({ selectedRowKeys: lastSelectedRowIndex });
        }
        this.setState({ selectedRowKeys });
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('value changed: ', selectedRows);
        this.setState({ balanceaccountplan: selectedRows[0].balanceaccountplan });
        this.setState({ codeaccountplan: selectedRows[0].codeaccountplan });
        this.setState({ createdaccountplan: selectedRows[0].createdaccountplan });
        this.setState({ detailaccountplan: selectedRows[0].detailaccountplan });
        this.setState({ idaccountplan: selectedRows[0].idaccountplan });
        this.setState({ idchildrenaccountplan: selectedRows[0].idchildrenaccountplan });
        this.setState({ idparentaccountplan: selectedRows[0].idparentaccountplan });
        this.setState({ isavailableaccountplan: selectedRows[0].isavailableaccountplan });
        this.setState({ levelaccountplan: selectedRows[0].levelaccountplan });
        this.setState({ disableNuevo: true });
        this.setState({ disableEditar: false });
        this.setState({ disableGuardar: true });
        this.setState({ disableEliminar: true });
        this.setState({ disableCancelar: false });
        this.setState({ flagNuevo: false });
        console.log('vcodigo ', this.state.codigo);
    };
    onChangeBalanceaccountplan = (e) => {
        this.setState({ balanceaccountplan: e.target.value })
    }
    onChangeCodeaccountplan = (e) => {
        this.setState({ codeaccountplan: e.target.value })
    }
    onChangeDetailaccountplan = (e) => {
        this.setState({ detailaccountplan: e.target.value })
    }
    onChangeIdaccountplan = (e) => {
        this.setState({ idaccountplan: e.target.value })
    }
    onChangeIdchildrenaccountplan = (e) => {
        this.setState({ idchildrenaccountplan: e.target.value })
    }
    onChangeIdparentaccountplan = (e) => {
        this.setState({ idparentaccountplan: e.target.value })
    }
    onChangeIsavailableaccountplan = (checked) => {
        console.log(`switch to ${checked}`);
    };
    onChangeLevelaccountplan = (e) => {
        this.setState({ levelaccountplan: e.target.value })
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
            await this.editInformation(this.state.balanceaccountplan, this.state.codeaccountplan, this.state.createdaccountplan, this.state.detailaccountplan, this.state.idaccountplan, this.state.idchildrenaccountplan, this.state.idparentaccountplan, this.state.isavailableaccountplan, this.state.levelaccountplan);
            this.getInformation();
            this.setState({ disableControl: true });
            this.setState({ disableNuevo: false });
            this.setState({ disableEditar: true });
            this.setState({ disableGuardar: true });
            this.setState({ disableEliminar: true });
            this.setState({ disableCancelar: true });
        }
        else {
            await this.insertInformation(this.state.balanceaccountplan, this.state.codeaccountplan, this.state.createdaccountplan, this.state.detailaccountplan, this.state.idaccountplan, this.state.idchildrenaccountplan, this.state.idparentaccountplan, this.state.isavailableaccountplan, this.state.levelaccountplan);
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
        const columns = [
            {
                title: 'Nivel',
                dataIndex: 'levelaccountplan',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('levelaccountplan'),
            },
            {
                title: 'Código',
                dataIndex: 'codeaccountplan',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('codeaccountplan'),
            },
            {
                title: 'Plan de cuentas',
                dataIndex: 'detailaccountplan',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('detailaccountplan'),
            },
            {
                title: 'Balance',
                dataIndex: 'balanceaccountplan',
                //render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('balanceaccountplan'),
            },

            /*{
                title: 'createdaccountplan',
                dataIndex: 'createdaccountplan',
                render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('createdaccountplan'),
            },
            
            {
                title: 'idaccountplan',
                dataIndex: 'idaccountplan',
                render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('idaccountplan'),
            },
            {
                title: 'idchildrenaccountplan',
                dataIndex: 'idchildrenaccountplan',
                render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('idchildrenaccountplan'),
            },
            {
                title: 'idparentaccountplan',
                dataIndex: 'idparentaccountplan',
                render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('idparentaccountplan'),
            },
            {
                title: 'isavailableaccountplan',
                dataIndex: 'isavailableaccountplan',
                render: (text) => <a>{text}</a>,
                ...this.getColumnSearchProps('isavailableaccountplan'),
            },*/

        ];

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

                    <Table
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
                    <Row gutter={24}>
                        <Col span={3}>
                            <Form.Item >
                                <Button
                                    onClick={() => this.clickNuevo()}
                                    disabled={this.state.disableNuevo}
                                    size="small"
                                >Nuevo</Button>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item >
                                <Button onClick={() => this.clickEditar()}
                                    disabled={this.state.disableEditar}
                                    size="small"
                                >Editar</Button>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item >
                                <Button onClick={() => this.clickGuardar()}
                                    disabled={this.state.disableGuardar}
                                    size="small"
                                >Guardar</Button>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item >
                                <Button
                                    disabled={this.state.disableEliminar}
                                    size="small"
                                >Eliminar</Button>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item >
                                <Button onClick={() => this.clickCancelar()}
                                    disabled={this.state.disableCancelar}
                                    size="small"
                                >Cancelar</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Nivel">
                        <Input
                            disabled={this.state.disableControl}
                            value={this.state.levelaccountplan || ''}
                            onChange={this.onChangeLevelaccountplan} />
                    </Form.Item>
                    <Form.Item label="Código">
                        <Input
                            disabled={this.state.disableControl}
                            value={this.state.codeaccountplan || ''}
                            onChange={this.onChangeCodeaccountplan} />
                    </Form.Item>

                    <Form.Item label="Plan de cuentas">
                        <Input
                            disabled={this.state.disableControl}
                            value={this.state.detailaccountplan || ''}
                            onChange={this.onChangeDetailaccountplan} />
                    </Form.Item>

                    <Form.Item label="Balance">
                        <Input
                            disabled={this.state.disableControl}
                            value={this.state.balanceaccountplan || ''}
                            onChange={this.onChangeBalanceaccountplan} />
                    </Form.Item>

                    {/*<Form.Item label="idaccountplan">
                        <Input
                            disabled={this.state.disableControl}
                            onChange={this.onChangeIdaccountplan} />
                    </Form.Item>*/}
                    <Form.Item label="Codigo Padre">
                        <Select style={{ width: 120 }} 
                        onChange={this.handleChangeParent} 
                        value={this.state.idparentaccountplan || ''}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            {/*<Option value="3" disabled>
                                3
                </Option>*/}
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                        {/*<Input
                            disabled={this.state.disableControl}
                            value={this.state.idparentaccountplan || ''}
                            onChange={this.onChangeIdparentaccountplan} />*/}
                    </Form.Item>
                    {/*<Form.Item label="Codigo Hijo">
                        <Input
                            disabled={this.state.disableControl}
                            value={this.state.idchildrenaccountplan || ''}
                            onChange={this.onChangeIdchildrenaccountplan} />
                        </Form.Item>*/}
                        <Form.Item label="Codigo Hijo">
                        <Select style={{ width: 120 }} 
                        onChange={this.handleChangeChildren} 
                        value={this.state.idchildrenaccountplan || ''}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            {/*<Option value="3" disabled>
                                3
                </Option>*/}
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                        {/*<Input
                            disabled={this.state.disableControl}
                            value={this.state.idparentaccountplan || ''}
                            onChange={this.onChangeIdparentaccountplan} />*/}
                    </Form.Item>

                    {/*<Form.Item label="Activo" valuePropName="checked">
                        <Switch
                            onChange={this.onChangeIsavailableaccountplan}
                            checked={this.state.isavailableaccountplan}
                            disabled={this.state.disableControl}
                        />
                        </Form.Item>*/}


                </Form>
            </div>
        );
    }
}
export default Accountplan;

