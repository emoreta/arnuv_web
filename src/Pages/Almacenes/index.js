import React, { Component } from 'react';
class Almacenes extends Component {
    state = {
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div><h2>ALMACENES</h2></div>
        )

    }
};
export default Almacenes;
