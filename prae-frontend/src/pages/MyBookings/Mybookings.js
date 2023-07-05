import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwalWithMui, Toast } from '../../components/swal';
import OperationDropdown from '../../components/operationDropdown';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import PopperButton from '../../components/PopperButton/index';
import FloatButton from '../../components/FloatButton/index';
import api from '../../utils/api';

const CACHE_CURRENT_USER = "@current-User";

export function MyBookingList() {
    const navigate = useNavigate();
    const [booksData, setBooksData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [reload, setReload] = useState(true);
    const user = JSON.parse(localStorage.getItem(CACHE_CURRENT_USER));

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
                api.delete(`/books/${ids}`).then(() => {
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
    }, [navigate, reload]);

    const handleCancelReservation = async (id) => {
        try {
          const response = await api.patch(`/books/${id}`, { email: null });
          if (response.status === 200) {
            Toast.fire({
              title: "Sucesso!",
              text: "Reserva cancelada com sucesso",
              icon: "success",
            });
            setReload(!reload);
          } else {
            Toast.fire({
              title: "Erro ao cancelar reserva",
              text: "Ocorreu um erro ao cancelar a reserva do livro",
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
          Toast.fire({
            title: "Erro ao cancelar reserva",
            text: error.response.data.stacktrace,
            icon: "error",
          });
        }
      };

    useEffect(() => {
        api
            .get('/books')
            .then(response => {
                const updatedBooksData = response.data.map(book => {
                    const username = book.trocadoPor ? book.trocadoPor.username : "---";
                    return { ...book, username };
                });

                let filteredData = [];
                if (user.accessLevel === 'admin') {
                    filteredData = updatedBooksData.filter(book => book.email);
                } else {
                    filteredData = updatedBooksData.filter(
                        book => book.email === user.username
                    );
                }
                setBooksData(filteredData);

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
                        name: 'email',
                        label: 'Reservado por',
                        options: {
                            filter: true,
                            sort: true,
                            filterType: 'textField',
                        },
                    },
                    {
                        name: 'username',
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
                                const url = `/books/${filteredData[dataIndex]._id}/edit`;
                                const items = [{
                                    label: 'Cancelar Reserva',
                                    onclick: () => handleCancelReservation(filteredData[dataIndex]._id)
                                },];
                                if (user.accessLevel === 'admin') {
                                    items.push({
                                      label: 'Trocar Livro',
                                      onclick: () => navigate(url),
                                    });
                                  }
                                return <OperationDropdown items={items} />;
                            },
                        },
                    },
                ]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [user.accessLevel, reload]);

    async function onRowsDelete(rowsDeleted) {
        const ids = rowsDeleted.data.map(row => booksData[row.dataIndex]._id);
        await handleDelete(ids);
    }

    return (
        <>
            <ExpandableTable
                onRowsDelete={onRowsDelete}
                data={booksData}
                hideSelectable={true}
                columns={columns}
                title="Reservas"
            />
            {user.accessLevel === 'admin' && (
                <PopperButton>
                    <FloatButton url="/books" />
                </PopperButton>
            )}
        </>
    );
}
