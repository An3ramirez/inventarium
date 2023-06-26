import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
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
        price: null,
        quantity: null,
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

    const validatePrice = (rule: any, value: number, callback: Function) => {
        if (typeof value !== 'number' || isNaN(value)) {
            callback('El precio debe ser un número válido');
        } else {
            callback();
        }
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
                <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Descripción" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Precio" rules={[{ required: true, validator: validatePrice }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="quantity" label="Cantidad" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default InventoryForm;