import React, { useState } from 'react';
import {
  OrderedListOutlined,
  AuditOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './menu.css';

type MenuItem = Required<MenuProps>['items'][number];



function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Empresas', '1', <AuditOutlined />),
  getItem('Inventario', '2', <OrderedListOutlined />),
  getItem('cerrar sesión', '3', <AppstoreOutlined />)
];

const CustomMenu: React.FC = () => {
  let navigate = useNavigate();

  const onChange: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    switch (e.key) {
      case '1':
        navigate('/company-list');
        break;
      case '2':
        navigate('/inventory-list');
        break;
      case '3':
        localStorage.clear();
        navigate('/sign-in');
        break;
      default:
        break;
    }
  };

  return (
    <div className='menu-container'>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
        onClick={onChange}
      />
    </div>
  );
};

export default CustomMenu;