import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import InventoryForm from '../components/inventoryForm';
import InventoryList from '../components/inventoryList';
import { Inventory } from '../types';
import axios from 'axios';

const InventoryContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está realizando una solicitud
  const domain = process.env.REACT_APP_DOMAIN + '/product';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(domain, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((response) => {
        setInventories(response.data);
      })
      .catch((error) => {
        message.error('Error al obtener las empresas');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreate = (inventory: Inventory) => {
    setLoading(true);
    axios
      .post(domain, inventory, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((response) => {
        setInventories([...inventories, response.data]);
        message.success('Empresa creada exitosamente');
      })
      .catch((error) => {
        message.error('Error al crear la empresa');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (inventory: Inventory) => {
    setLoading(true);
    axios
      .put(`${domain}/${inventory.id}`, inventory, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(() => {
        setInventories(inventories.map((c) => (c.id === inventory.id ? inventory : c)));
        message.success('Empresa actualizada exitosamente');
      })
      .catch((error) => {
        message.error('Error al actualizar la empresa');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    axios
      .delete(`${domain}/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(() => {
        setInventories(inventories.filter((c) => c.id !== id));
        message.success('Empresa eliminada exitosamente');
      })
      .catch((error) => {
        message.error('Error al eliminar la empresa');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownloadPDF = () => {
    setLoading(true);
    axios
      .get(domain + '/download', {
        headers: { 'Authorization': 'Bearer ' + token },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        message.error('Error al descargar el archivo');
        console.error('Error al descargar el archivo:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSave = (inventory: Inventory) => {
    if (selectedInventory) {
      handleUpdate({ ...inventory, id: selectedInventory.id });
      setSelectedInventory(null);
    } else {
      handleCreate(inventory);
    }
    setVisible(false);
  };

  return (
    <div>
      <InventoryList
        inventories={inventories}
        onDownloadPDF={handleDownloadPDF}
        onCreate={() => setVisible(true)}
        onUpdate={(inventory) => {
          setSelectedInventory(inventory);
          setVisible(true);
        }}
        onDelete={handleDelete}
        loading={loading}
      />

      <InventoryForm
        open={visible}
        onCancel={() => setVisible(false)}
        onSave={handleSave}
        initialValues={selectedInventory}
        loading={loading}
      />
    </div>
  );
};

export default InventoryContainer;
