import React from 'react';
import Admin from './admin';
import Historial from './historial';
import { List, ListItem, ListItemText, Menu, MenuItem, Grid } from '@material-ui/core'
import Header from './header';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            anchorEl: null
        }
        this.options = ["Seleccionar", "Pedidos", "Inventario"]
        this.handleClickListItem = this.handleClickListItem.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickListItem(e) {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleMenuItemClick(e, index) {
        this.setState({ selected: index, anchorEl: null });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    render() {
        let showComp = null;
        switch (this.state.selected) {
            case 1:
                showComp = <Historial />;
                break;
            case 2:
                showComp = <Admin />;
                break;
            default:
                showComp = null;
                break;
        }

        return (
            <div>
                <Header />
                <Grid container style={{ padding: "5%" }}>
                    <Grid item xs={12} spacing={3}>
                        <List component="nav" aria-label="Admin Options">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="admin-options"
                                aria-label="Seleccionado actualmente"
                                onClick={this.handleClickListItem}
                            >
                                <ListItemText primary="Seleccionado actualmente:" secondary={this.options[this.state.selected]} />
                            </ListItem>
                        </List>
                        <Menu
                            id="admin-options"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.options.map((option, index) => (
                                <MenuItem
                                    option={option}
                                    disabled={index === 0}
                                    selected={index === this.state.selected}
                                    onClick={(e) => this.handleMenuItemClick(e, index)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                    <Grid item xs={12}>
                        {showComp}
                    </Grid>
                </Grid>

            </div>
        );

    }

}

export default AdminPage;