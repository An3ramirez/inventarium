import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Inventory } from '../types';

interface CompanyFormProps {
  open: boolean;
  onCancel: () => void;
  onSave: (values: Inventory) => void;
  initialValues?: Inventory | null;
  loading: boolean;
}

const InventoryForm: React.FC<CompanyFormProps> = ({
  open,
  onCancel,
  onSave,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();
  const emptyCompany: Inventory = {
    id: 0,
    name: '',
    description: '',
    price: '',
    cantidad: '0',
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.setFieldsValue(emptyCompany);
    }
  }, [form, initialValues]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? 'Editar Producto' : 'Crear Producto'}
      open={open}
      onCancel={onCancel}
      onOk={handleSave}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={loading} disabled={loading}>
          Guardar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={initialValues ?? {}} style={{ maxWidth: 600 }}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="direccion" label="Dirección" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nit" label="NIT" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryForm;