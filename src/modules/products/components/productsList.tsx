import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { ProductEnum } from '../types';
import {checkAdmin} from '../../../utils/constants';

interface ProductListProps {
  products: ProductEnum[];
  onDownloadPDF: () => void;
  onCreate: () => void;
  onUpdate: (product: ProductEnum) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onDownloadPDF,
  onCreate,
  onUpdate,
  onDelete,
  loading,
}) => {
  let rolUser = localStorage.getItem('rol_user');
  let asAdminRol = checkAdmin(rolUser);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, product: any) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onUpdate(product)}
            style={{ marginRight: 8 }}
            disabled={loading || !asAdminRol}
          >
            Editar
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(product.id)}
            disabled={loading || !asAdminRol}
            loading={loading}
            danger
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  
  
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="link" icon={<DownloadOutlined />} onClick={onDownloadPDF}>
          Descargar PDF
        </Button>

        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate} disabled={!asAdminRol}>
          Crear Producto
        </Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </div>
  );
};

export default ProductList;
