import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, ApiFilled } from '@ant-design/icons';
import { Inventory } from '../types';

interface InventoryListProps {
  inventories: Inventory[];
  onCreate: () => void;
  onUpdate: (empresa: Inventory) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const InventoryList: React.FC<InventoryListProps> = ({
  inventories,
  onCreate,
  onUpdate,
  onDelete,
  loading,
}) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'name',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'address',
    },
    {
      title: 'NIT',
      dataIndex: 'nit',
      key: 'nit',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'tel',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, empresa: any) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onUpdate(empresa)}
            style={{ marginRight: 8 }}
            disabled={loading}
          >
            Editar
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(empresa.id)}
            disabled={loading}
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Crear Producto
        </Button>
      </div>
      <Table columns={columns} dataSource={inventories} rowKey="id" />
    </div>
  );
};

export default InventoryList;
