import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';
import { ProductEnum } from '../types';
import { Company } from '../../company/types';

interface ProductFormProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: ProductEnum) => void;
    initialValues?: ProductEnum | null;
    companies: Company[];
    loading: boolean;
}

const { Option } = Select;

const ProductForm: React.FC<ProductFormProps> = ({
    open,
    onCancel,
    onSave,
    initialValues,
    companies,
    loading,
}) => {
    const [form] = Form.useForm();
    const emptyProduct: ProductEnum = {
        id: 0,
        company_id: null,
        name: '',
        description: '',
        price: null,
        quantity: null,
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.setFieldsValue(emptyProduct);
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
    console.log('initial: ', initialValues);

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
                <Form.Item name="company_id" label="Empresa" rules={[{ required: true, message: 'Seleccione una empresa' }]}>
                    <Select placeholder="Seleccione una empresa" disabled={initialValues != null}>
                        {companies.map((compnay) => (
                            <Option key={compnay.nit} value={compnay.nit}>{compnay.legal_name}</Option>
                        ))}
                    </Select>
                </Form.Item>
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

export default ProductForm;