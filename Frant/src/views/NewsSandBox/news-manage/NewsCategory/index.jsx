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
      title: '栏目名称',
      dataIndex: 'title',
      width: 600,
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),
    },
    {
      title: '操作',
      render: (item) => {
        const deleteCatogory = () => {
          confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              axios.post('/api/deleteCategory', { id: item.id }).then(() => {
                setCategories(categories.filter(data => data.id !== item.id))
                notification.info({
                  message: '删除成功！',
                  placement: 'topRight',
                });
              })
            },
          });
        }
        return <Button danger onClick={deleteCatogory}>删除</Button>
      }
    }
  ]
  return (
    <Table dataSource={categories} columns={columns} rowKey={(item) => item.id} components={components}></Table>
  )
}
