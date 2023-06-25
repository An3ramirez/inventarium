import React from 'react';
import { Table, Button, DividerProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, ApiFilled } from '@ant-design/icons';
import { Company } from '../types';
import { RolUser} from '../../login/types';

interface CompanyListProps {
  companies: Company[];
  onCreate: () => void;
  onUpdate: (empresa: Company) => void;
  onDelete: (nit: number) => void;
  loading: boolean;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onCreate,
  onUpdate,
  onDelete,
  loading,
}) => {
  const isAdmin: boolean = localStorage.getItem('rol_user') == RolUser.ADMIN_USER;
  console.log('is admin ', isAdmin);
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'legal_name',
      key: 'name',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'NIT',
      dataIndex: 'nit',
      key: 'nit',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
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
            disabled={loading || !isAdmin}
          >
            Editar
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(empresa.nit)}
            disabled={loading || !isAdmin}
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate} disabled={!isAdmin}>
          Crear Empresa
        </Button>
      </div>
      <Table columns={columns} dataSource={companies} rowKey="nit" />
    </div>
  );
};

export default CompanyList;
