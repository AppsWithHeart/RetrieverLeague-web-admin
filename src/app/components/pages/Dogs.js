/**
 * Created by uroszivaljevic on 9/30/17.
 */

import React from "react";
import {
    FormGroup,
    FormControl,
    Table,
    Col
} from "react-bootstrap";
import { connect } from "react-redux";

import { getDogs } from "../../actions/dogs";

class Dogs extends React.Component {

    componentDidMount() {
        this.props.getDogs();
    }

    render() {
        return (
            <Col md={9}>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Race</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderDogData()}
                    </tbody>
                </Table>
            </Col>
        )
    }

    renderDogData() {
        if (this.props.dogs) {
            return this.props.dogs.map(dog => {
                return (
                    <tr>
                        <td>{dog.name}</td>
                        <td>{dog.race}</td>
                    </tr>
                );
            });
        }
        return null;
    }

}

const mapStateToProps = state => {
    return {
        dogs: state.dogs
    }
};

export default connect(mapStateToProps, {getDogs})(Dogs);