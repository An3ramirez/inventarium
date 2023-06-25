import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import CompanyForm from '../components/companyForm';
import CompanyList from '../components/companyList';
import { Company } from '../types';

const CompanyContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está realizando una solicitud
  const domain = process.env.REACT_APP_DOMAIN;
  console.log(domain);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    setLoading(true);
    axios
      .get(domain + '/company', {
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

  const handleCreate = (company: Company) => {
    setLoading(true);
    
    axios
      .post(domain + '/company', company, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((response) => {
        setCompanies([...companies, response.data]);
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

  const handleUpdate = (company: Company) => {
    setLoading(true);
    axios
      .put(`${domain}/company/${company.id}`, company, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(() => {
        setCompanies(companies.map((c) => (c.id === company.id ? company : c)));
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
      .delete(`${domain}/company/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(() => {
        setCompanies(companies.filter((c) => c.id !== id));
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

  const handleSave = (company: Company) => {
    if (selectedCompany) {
      handleUpdate({ ...company, id: selectedCompany.id });
      setSelectedCompany(null);
    } else {
      handleCreate(company);
    }
    setVisible(false);
  };

  return (
    <div>
      <CompanyList
        companies={companies}
        onCreate={() => setVisible(true)}
        onUpdate={(company) => {
          setSelectedCompany(company);
          setVisible(true);
        }}
        onDelete={handleDelete}
        loading={loading}
      />

      <CompanyForm
        open={visible}
        onCancel={() => setVisible(false)}
        onSave={handleSave}
        initialValues={selectedCompany}
        loading={loading}
      />
    </div>
  );
};

export default CompanyContainer;
