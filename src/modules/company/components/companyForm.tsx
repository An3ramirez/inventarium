import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Company } from '../types';

interface CompanyFormProps {
  open: boolean;
  onCancel: () => void;
  onSave: (values: Company) => void;
  initialValues?: Company | null;
  loading: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  open,
  onCancel,
  onSave,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();
  const emptyCompany: Company = {
    nit: null,
    legal_name: '',
    address: '',
    phone: ''
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
      title={initialValues ? 'Editar Empresa' : 'Crear Empresa'}
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
        <Form.Item name="legal_name" label="Nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nit" label="NIT" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Teléfono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyForm;