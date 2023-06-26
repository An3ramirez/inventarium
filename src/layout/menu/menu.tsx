import React, { useState } from 'react';
import {
  OrderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import './menu.css';
import { useNavigate } from 'react-router-dom';

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
  getItem('Inventario', '2', <OrderedListOutlined />)
];



const CustomMenu: React.FC = () => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onChange: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    switch (e.key) {
      case '1':
        navigate('/company-list');
        break;
      case '2':
        navigate('/inventory-list');
        break;  
      default:
        break;
    }
  };

  return (
    <div className='menu-container'>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onChange}
      />
    </div>
  );
};

export default CustomMenu;