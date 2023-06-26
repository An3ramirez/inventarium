import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import ProductForm from '../components/productsForm';
import ProductList from '../components/productsList';
import { ProductEnum } from '../types';
import { Company } from '../../company/types';
import axios from 'axios';

const ProductContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductEnum | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<ProductEnum[]>([]);
  const [loading, setLoading] = useState(false);
  const patchCompany = process.env.REACT_APP_DOMAIN + '/company';
  const domain = process.env.REACT_APP_DOMAIN + '/product';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchCompanies();
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
        const data = response.data.map((elem: any) => {
          const { company, ...data }: any = elem;
          return { ...data, company_id: company?.nit }
        });

        setProducts(data);
      })
      .catch((error) => {
        message.error('Error al obtener las empresas');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCompanies = () => {
    setLoading(true);
    axios
      .get(patchCompany, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        message.error('Error al obtener las empresas');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreate = (product: ProductEnum) => {
    setLoading(true);
    axios
      .post(domain, product, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((response) => {
        setProducts([...products, response.data]);
        message.success('Producto creada exitosamente');
      })
      .catch((error) => {
        message.error('Error al crear la empresa');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (product: ProductEnum) => {
    setLoading(true);
    axios
      .put(`${domain}/${product.id}`, product, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(() => {
        setProducts(products.map((c) => (c.id === product.id ? product : c)));
        message.success('Producto actualizada exitosamente');
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
        setProducts(products.filter((c) => c.id !== id));
        message.success('Producto eliminada exitosamente');
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

  const handleSave = (inventory: ProductEnum) => {
    if (selectedProduct) {
      handleUpdate({ ...inventory, id: selectedProduct.id });
      setSelectedProduct(null);
    } else {
      handleCreate(inventory);
    }
    setVisible(false);
  };

  return (
    <div>
      <ProductList
        products={products}
        onDownloadPDF={handleDownloadPDF}
        onCreate={() => setVisible(true)}
        onUpdate={(inventory) => {
          setSelectedProduct(inventory);
          setVisible(true);
        }}
        onDelete={handleDelete}
        loading={loading}
      />

      <ProductForm
        open={visible}
        onCancel={() => setVisible(false)}
        onSave={handleSave}
        initialValues={selectedProduct}
        loading={loading}
        companies={companies}
      />
    </div>
  );
};

export default ProductContainer;
