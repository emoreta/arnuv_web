import React, { Component } from 'react';
class TipoCredito extends Component {
    state = {
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div><h2>template</h2></div>
        )

    }
};
export default TipoCredito;