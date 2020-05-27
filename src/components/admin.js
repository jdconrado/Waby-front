import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Header from './header'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

async function getInfo() {
    const url = 'http://127.0.0.1:8000/ingredientes/getall'
    const response = await fetch(url, {
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
        return res.json()
    }).then((dat) => { return dat.result });
    return response;
}
async function redirData(url = '', data = {}, type) {
    const nurl = 'http://127.0.0.1:8000/ingredientes/' + url
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
        body: data
    });
    return response.json();
}

export default function Admin() {
    const [update, setUpdate] = React.useState(0)
    const [Information, setInformation] = React.useState([]);
    const [deleteAlert, setDel] = React.useState(false);
    const [pDelet, setPDel] = React.useState([]);
    const handleAccept = () => {
        setDel(false);
        var js;
        pDelet.forEach(elemento => {
            js = JSON.stringify(elemento);
            redirData('eliminar/' + elemento.id, js, 'DELETE');
            setUpdate(update + 1);
        })
    }
    const handleClose = () => {
        setDel(false);
        setPDel([]);
    }
    useEffect(() => {
        getInfo().then((data) => {
            setInformation(data);
        })
    }, [update])
    const [columns, setState] = React.useState({
        columns: [
            { title: 'Ingrediente', field: 'nombre_ing' },
            { title: 'Stock', field: 'stock', type: 'numeric' },
            { title: 'Precio', field: 'precio', type: 'numeric' },
            { title: 'Tipo', field: 'tipo' },
        ]
    })
    const getId = (name) => {
        var id;
        Information.forEach(elemento => {
            if (elemento.nombre_ing == name) {
                id = elemento.id;
            }
        })
        return id;
    }

    return (
        <div style={{ flexGrow: 1 }} >
            <Header />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <MaterialTable
                title="Lista de Ingredientes"
                columns={columns.columns}
                data={Information}
                style={{ zIndex: 0 }}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                var obj = {};
                                obj.data = {}
                                obj.data = newData;
                                var js = JSON.stringify(obj);
                                redirData('crear', js, 'POST')
                                setUpdate(update + 1);
                                setInformation((prevState) => {
                                    const data = [...prevState];
                                    data.push(newData);
                                    return data;
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    var id = getId(oldData.nombre_ing);
                                    var obj = {};
                                    obj.data = {};
                                    obj.data = newData;
                                    obj.data.id = id;
                                    var js = JSON.stringify(obj);
                                    redirData('actualizar/' + id, js, 'PUT');
                                    setUpdate(update + 1);
                                    setInformation((prevState) => {
                                        const data = [...prevState];
                                        oldData.id = id;
                                        data[data.indexOf(oldData)] = newData;
                                        return data;
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                var id = getId(oldData.nombre_ing);
                                var obj = {};
                                obj.data = {};
                                obj.data.id = id;
                                obj.data.nombre_ing = oldData.nombre_ing;
                                obj.data.stock = oldData.stock;
                                obj.data.precio = oldData.precio;
                                obj.data.tipo = oldData.tipo;
                                var js = JSON.stringify(obj);
                                redirData('eliminar/' + id, js, 'DELETE');
                                setUpdate(update + 1);
                                setInformation((prevState) => {
                                    const data = [...prevState];
                                    oldData.id = id;
                                    data.splice(data.indexOf(obj.data), 1);
                                    return data;
                                });
                            }, 600);
                        }),
                }}
                options={{
                    exportButton: true,
                    selection: true,
                    actionsColumnIndex: -1
                }}
                actions={[
                    {
                        tooltip: 'Borrar todos los ingredientes seleccionados',
                        icon: 'delete',
                        onClick: (evt, data) => { setPDel(data); setDel(true); }
                    }
                ]}
            />
            <Dialog
                open={deleteAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"¡Cuidado!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vas a eliminar {pDelet.length} ingrediente(s).
                        <br />Si estas seguro, dale en aceptar!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                 </Button>
                    <Button onClick={handleAccept} color="primary" autoFocus>
                        Aceptar
                 </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}