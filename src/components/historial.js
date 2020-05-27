import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from './header';
async function getInfo(url = '', type) {
    const nurl = 'http://127.0.0.1:8000/' + url
    const response = await fetch(nurl, {
        method: type, // *GET, POST, PUT, DELETE, etc.
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

export default function Historial(props) {
    const [Information, setInformation] = React.useState([]); //Pedidos
    const [Lista, setLista] = React.useState();
    const [Ingredientes, setIngredientes] = React.useState([]);
    useEffect(() => {

        let token = localStorage.getItem("id");
        getInfo('ingredientes/getall', 'GET').then((data) => {
            setIngredientes(data);
        })
        var li = {};
        if(props.admin){

            getInfo('pedidos/getall', 'GET').then((data) => {
                setInformation(data);
                var i=0;
                data.forEach(elemento => {
                    getInfo('ingredientes/getlista/' + elemento.id, 'GET').then((data) => {
                        li[i]=data;
                        i++;
                    }   )
                })
            })
            
            setLista(li);
            
        }else{
            getInfo('usuarios/getid/' + token, 'POST').then((data) => {
                getInfo('pedidos/getPedido/'+data, 'GET').then((data) => {
                    setInformation(data);
                    var i=0;
                    data.forEach(elemento => {
                        getInfo('ingredientes/getlista/' + elemento.id, 'GET').then((data) => {
                            li[i]=data;
                            i++;
                        }   )
                    })
                })
                
                setLista(li);

            })
        }
    }, [null])
    const getProp = (id, type) => {
        var name="";
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
                columns={[
                    { title: 'Fecha', field: 'fecha_creado' },
                    { title: 'Estado', field: 'estado' },
                    { title: 'Precio', field: 'precioTotal' }
                ]}
                style={{zIndex:-1}}
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