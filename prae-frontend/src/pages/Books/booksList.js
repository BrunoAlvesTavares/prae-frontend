import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalWithMui, Toast } from '../../components/swal';
import OperationDropdown from '../../components/operationDropdown';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import PopperButton from '../../components/PopperButton/index';
import FloatButton from '../../components/FloatButton/index';

export function BooksList() {
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [reload, setReload] = useState(true);

  const handleDelete = useCallback(async (ids) => {
    SwalWithMui.fire({
      title: "Você tem certeza?",
      text: "Esta ação removerá o(s) livro(s) selecionado(s). Ela não poderá ser desfeita",
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
        axios.delete(`http://localhost:3333/books/${ids}`).then(() => {
          setReload(!reload);
          Toast.fire({
            title: "Sucesso!",
            text: "Livro(s) removido(s) com sucesso",
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
        navigate("/books");
        SwalWithMui.fire({
          title: "Operação cancelada",
          text: "Nenhum livro foi removido",
          icon: "info",
        });
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3333/books')
      .then(response => {
        const updatedBooksData = response.data.map(book => {
          const email = book.trocadoPor ? book.trocadoPor.email : "Livro não trocado";
          return { ...book, category: book.category.join(", "), email };
        })        
        setBooksData(updatedBooksData);
        setColumns([
          {
            name: 'title',
            label: 'Título',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'author',
            label: 'Autor',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'category',
            label: 'Categorias',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'state',
            label: 'Condição',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'email',
            label: 'Trocado Por',
            options: {
              filter: true,
              sort: true,
              filterType: "textField",
            }
          },
          {
            name: '_id',
            label: 'Operações',
            options: {
              filter: false,
              sort: false,
              customBodyRenderLite: dataIndex => {
                const url = `/books/${response.data[dataIndex]._id}/edit`;
                const items = [
                  {
                    label: 'Trocar Livro',
                    onclick: () => navigate(url),
                  },
                ];
                return <OperationDropdown items={items} />;
              },
            },
          },
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [reload]);
  

  async function onRowsDelete(rowsDeleted) {
    const ids = rowsDeleted.data.map(row => booksData[row.dataIndex]._id);
    await handleDelete(ids);
  }

  return (
    <>
      <ExpandableTable
        onRowsDelete={onRowsDelete}
        data={booksData}
        columns={columns}
        title="Lista de Livros"
      />
      <PopperButton>
        <FloatButton url="/books" />
      </PopperButton>
    </>
  );
}
