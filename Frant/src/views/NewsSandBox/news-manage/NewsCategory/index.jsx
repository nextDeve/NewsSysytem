import React, { useEffect, useState, useRef, useContext } from 'react'
import { Button, Table, Form, Input, Modal, notification } from 'antd'
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const EditableContext = React.createContext(null);
const { confirm } = Modal
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export default function NewsCategory() {
  let [categories, setCategories] = useState([])
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  useEffect(() => {
    axios.get('/api/getCategories').then((res) => {
      setCategories(res.data)
    })
  }, [])
  const handleSave = (value) => {
    setCategories(categories.map((item) => item.id === value.id ? value : item))
    axios.post('/api/updateCategory', value)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '????????????',
      dataIndex: 'title',
      width: 600,
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '????????????',
        handleSave: handleSave,
      }),
    },
    {
      title: '??????',
      render: (item) => {
        const deleteCatogory = () => {
          confirm({
            title: '?????????????????????',
            icon: <ExclamationCircleOutlined />,
            okText: '??????',
            cancelText: '??????',
            onOk() {
              axios.post('/api/deleteCategory', { id: item.id }).then(() => {
                setCategories(categories.filter(data => data.id !== item.id))
                notification.info({
                  message: '???????????????',
                  placement: 'topRight',
                });
              })
            },
          });
        }
        return <Button danger onClick={deleteCatogory}>??????</Button>
      }
    }
  ]
  return (
    <Table dataSource={categories} columns={columns} rowKey={(item) => item.id} components={components}></Table>
  )
}
