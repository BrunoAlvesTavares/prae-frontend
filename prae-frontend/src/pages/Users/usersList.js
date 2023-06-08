import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { SwalWithMui, Toast } from '../../components/swal';
import { useNavigate } from 'react-router-dom';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import PopperButton from '../../components/PopperButton/index';
import FloatButton from '../../components/FloatButton/index';

export function UsersList() {
  const navigate = useNavigate();
  const [userData, setUsersData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [reload, setReload] = useState(true);

  const handleDelete = useCallback(async (ids) => {
    SwalWithMui.fire({
      title: "Você tem certeza?",
      text: "Esta ação removerá o(s) usuário(s) selecionado(s). Ela não poderá ser desfeita",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonColor: "#EF6C00",
      confirmButtonText: "Sim, remover",
      denyButtonColor: "#EF6C00",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3333/users/${ids}`).then(() => {
          setReload(!reload);
          Toast.fire({
            title: "Sucesso!",
            text: "usuários(s) removido(s) com sucesso",
            icon: "success",
          });
        }).catch(err => {
          Toast.fire({
            title: "Erro ao deletar",
            text: err.response.data.stacktrace,
            icon: "error",
          });
        });
      } else {
        navigate("/users");
        SwalWithMui.fire({
          title: "Operação cancelada",
          text: "Nenhum usuário foi removido",
          icon: "info",
        });
      }
    });
  }, []);

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

  async function onRowsDelete(rowsDeleted) {
    const ids = rowsDeleted.data.map(row => userData[row.dataIndex]._id);
    await handleDelete(ids);
  }

  return (
    <>
      <ExpandableTable
        onRowsDelete={onRowsDelete}
        data={userData}
        columns={columns}
        title="Lista de Usuários"
      />
      <PopperButton>
        <FloatButton url="/users" />
      </PopperButton>
    </>
  );
}
