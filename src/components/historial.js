import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from './header';
async function getInfo(url = '', type, body) {
    const nurl = 'http://waby.tk/API/' + url
    const response = await fetch(nurl, {
        method: type, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: body
    }).then((res) => {
        if (typeof res == undefined) {
            var obj = "null"
            return JSON.stringify(obj);
        } else {
            return res.json();
        }
    }).then((dat) => { return dat });
    return response;
}

export default function Historial(props) {
    const [Information, setInformation] = React.useState([]); //Pedidos
    const [Lista, setLista] = React.useState();
    const [Ingredientes, setIngredientes] = React.useState([]);
    const [rowU, setRowU] = React.useState({});
    const [columns, setState] = React.useState([
        { title: 'Fecha', field: 'fecha_creado' },
        { title: 'Estado', field: 'estado' },
        { title: 'Precio', field: 'precioTotal' },
    ])
    useEffect(() => {
        let token = localStorage.getItem("id");
        getInfo('usuarios/getid/' + token, 'POST').then((data) => {
            let id = data.result;
            let isAdmin = data.admin
            getInfo('ingredientes/getall', 'GET').then((data) => {
                setIngredientes(data.result);
            })
            var li = {};
            if (isAdmin) {
                setState([
                    { title: 'Fecha', field: 'fecha_creado', editable: 'never' },
                    { title: 'Estado', field: 'estado' },
                    { title: 'Precio', field: 'precioTotal', editable: 'never' },
                    { title: 'user ID', field: 'userId', editable: 'never' }
                ])
                getInfo('pedidos/getall', 'GET').then((data) => {
                    setInformation(data.result);
                    var i = 0;
                    data.result.forEach(elemento => {
                        getInfo('ingredientes/getlista/' + elemento.id, 'GET').then((data) => {
                            li[i] = data.result;
                            i++;
                        })
                    })
                })

                setLista(li);
                setRowU({
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    var obj = {}
                                    obj.estado = newData.estado
                                    var js = JSON.stringify(obj);
                                    getInfo('pedidos/actualizar/' + newData.id, 'POST', js).then((data) => {
                                        update();
                                        setInformation((prevState) => {
                                            const data = [...prevState];
                                            data[data.indexOf(oldData)] = newData;
                                            return data;
                                        });
                                    });

                                }
                            }, 600);
                        }),
                })
            } else {
                getInfo('pedidos/getPedido/' + id, 'GET').then((data) => {
                    let info = [];
                    let tipo = props.staticContext;
                    data.result.forEach(elemento => {
                        if (tipo) {
                            if (elemento.estado != "Finalizado") {
                                info.push(elemento);
                            }
                        } else {    
                            if (elemento.estado == "Finalizado") {
                                info.push(elemento);
                            }
                        }
                    })
                    setInformation(info);
                    var i = 0;
                    data.result.forEach(elemento => {
                        getInfo('ingredientes/getlista/' + elemento.id, 'GET').then((data) => {
                            li[i] = data.result;
                            i++;
                        })
                    })
                })

                setLista(li);
            }
        });
    }, [null])
    const update = () => {
        getInfo('pedidos/getall', 'GET').then((data) => {
            setInformation(data.result)
        })
    }
    const getProp = (id, type) => {
        var name = "";
        Ingredientes.forEach(element => {
            if (element.id == id) {
                if (type == 0) {
                    name = element.nombre_ing;
                } else {
                    name = element.tipo
                }
            }
        })
        if (name.length == 0) {
            return "null";
        } else {
            return name;
        }
    }

    return (
        <div style={{ flexGrow: 1 }} >
            <Header />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <MaterialTable
                title="Historial"
                columns={columns}
                style={{ zIndex: 0 }}
                data={Information}
                editable={rowU}
                options={{
                    actionsColumnIndex: -1
                }}
                detailPanel={rowData => {
                    return (
                        <div>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ingredientes</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Tipo</TableCell>
                                        <TableCell align="right">Especificaciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Lista[rowData.tableData.id].map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {getProp(row.ingred, 0)}
                                            </TableCell>
                                            <TableCell align="right">{row.cantidad}</TableCell>
                                            <TableCell align="right">{getProp(row.ingred, 1)}</TableCell>
                                            <TableCell align="right">{rowData.especificaciones}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )
                }}
            />
        </div>);
}