import axios from 'axios';
import { useState, useEffect } from 'react';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import PopperButton from '../../components/PopperButton/index';
import FloatButton from '../../components/FloatButton/index';

export function UsersList() {
  const [booksData, setUsersData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/users')
      .then(response => {
        setUsersData(response.data);
        setColumns([
          {
            name: 'name',
            label: 'Nome',
            options: {
              filter: true,
              sort: true,
              filterType: "textField",
            }
          },
          {
            name: 'email',
            label: 'e-mail',
            options: {
              filter: true,
              sort: true,
              filterType: "textField",
            }
          },
          {
            name: 'accessLevel',
            label: 'Nivel de acesso',
            options: {
              filter: true,
              sort: true,
              filterType: "textField",
            }
          },
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ExpandableTable
        data={booksData}
        columns={columns}
        title="Lista de Usuários"
      />
      <PopperButton>
        <FloatButton url="/users" />
      </PopperButton>
    </>
  );
}
