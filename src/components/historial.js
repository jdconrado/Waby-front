import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

async function getInfo(url = '') {
    const nurl = 'http://127.0.0.1:8000/' + url
    const response = await fetch(nurl, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }).then((res) => {
        if (typeof res == undefined) {
            var obj = "null"
            return JSON.stringify(obj);
        } else {
            return res.json();
        }
    }).then((dat) => { return dat.result });
    return response;
}

export default function Historial() {
    const [Information, setInformation] = React.useState([]); //Pedidos
    const [Lista, setLista] = React.useState([]);
    const [Ingredientes, setIngredientes] = React.useState([]);
    useEffect(() => {
        getInfo('ingredientes/getall').then((data) => {
            setIngredientes(data);
        })
        var li = [];
        getInfo('pedidos/getall').then((data) => {
            setInformation(data);
            data.forEach(elemento => {
                getInfo('ingredientes/getlista/' + elemento.id).then((data) => {
                    li.push(data);
                })
            })
        })
        setLista(li);
    }, [null])
    const getProp = (id, type) => {
        var name;
        Ingredientes.forEach(element => {
            if (element.id == id) {
                if (type == 0) {
                    name = element.nombre_ing;
                }else{
                    name=element.tipo
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
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <MaterialTable
                title="Historial"
                columns={[
                    { title: 'Fecha', field: 'fecha_creado' },
                    { title: 'Estado', field: 'estado' },
                    { title: 'Precio', field: 'precioTotal' }
                ]}
                data={Information}
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
                                    {Lista[rowData.id - 1].map((row) => (
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