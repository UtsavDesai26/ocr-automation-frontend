import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import ReactDragListView from "react-drag-listview";
import PropTypes from "prop-types";

function AntdTable({ columns, dataSource, pagination, onChange }) {
  const [tableColumns, setTableColumns] = useState(columns);

  useEffect(() => {
    setTableColumns(columns);
  }, [columns]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      if (fromIndex < 0 || toIndex < 0) return;
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setTableColumns(newColumns); // Optional
    },
    nodeSelector: "th",
    handleSelector: ".dragHandler",
  };

  const customPagination = pagination
    ? {
        ...pagination,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        onChange: (page, pageSize) => {
          onChange({ page, pageSize });
        },
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }
    : false;

  const draggableColumns = tableColumns.map((col) => ({
    ...col,
    title: (
      <Tooltip title={col.title}>
        <div
          className={col.draggable === false ? "" : "dragHandler"}
          style={{ cursor: col.draggable === false ? "default" : "move" }}
        >
          {col.title}
        </div>
      </Tooltip>
    ),
    ellipsis: true,
  }));

  return (
    <ReactDragListView.DragColumn {...dragProps}>
      <Table
        size="small"
        columns={draggableColumns}
        dataSource={dataSource}
        pagination={customPagination}
        onChange={onChange}
        bordered
        scroll={{ x: "max-content", y: "50vh" }}
        className={dataSource?.length === 0 ? "no-data" : ""}
      />
    </ReactDragListView.DragColumn>
  );
}

AntdTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  onChange: PropTypes.func,
  onChangePageSize: PropTypes.func,
};

AntdTable.defaultProps = {
  pagination: null,
  onChange: () => {},
  onChangePageSize: () => {},
};

export default AntdTable;
