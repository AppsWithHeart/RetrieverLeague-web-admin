/**
 * Created by uroszivaljevic on 9/30/17.
 */

import React from "react";
import {
    FormGroup,
    FormControl,
    Table,
    Col,
    Row,
    ControlLabel,
    Button
} from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import Datetime from "react-datetime";

import { getDogs } from "../../actions/dogs";
import { getLeagues } from "../../actions/leagues";

class Dogs extends React.Component {

    constructor() {
        super();
        this.state = {
            dog: {
                name: "",
                breed: "",
                dateOfBirth: "",
                ownerName: "",
                leagueId: -1,
            }
        }
    }

    componentDidMount() {
        this.props.getDogs();
        this.props.getLeagues();
    }

    render() {
        return (
            <Row>
                <Col md={8}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Owner name</th>
                            <th>Date of birth</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderDogData()}
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}>
                    <h3>Add a dog</h3>
                    <form>
                        <FormGroup
                        >
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                value={this.state.dog.name}
                                onChange={(e) => this.setState({dog: { name: e.target.value }})}
                            />
                            <ControlLabel>Breed</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Breed"
                                value={this.state.dog.breed}
                                onChange={(e) => this.setState({dog: { breed: e.target.value }})}
                            />
                            <ControlLabel>Owner Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Owner Name"
                                value={this.state.dog.ownerName}
                                onChange={(e) => this.setState({dog: { ownerName: e.target.value }})}
                            />
                            <ControlLabel>Date of birth</ControlLabel>
                            <Datetime
                                onChange={(m) => this.setState({dog: { dateOfBirth: m.format() }})}
                            />
                            <ControlLabel>League</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                onChange={(e) => this.setState({dog: { leagueId: e.target.value }})}
                            >
                                {this.renderLeagueSelectOptions()}
                            </FormControl>
                        </FormGroup>
                    </form>
                    <Button bsStyle="success">Submit</Button>
                </Col>
            </Row>
        )
    }

    renderDogData = () => {
        if (this.props.dogs) {
            return this.props.dogs.map(dog => {
                return (
                    <tr key={dog.id}>
                        <td>{dog.name}</td>
                        <td>{dog.breed}</td>
                        <td>{dog.ownerName}</td>
                        <td>{moment(dog.dateOfBirth).format("DD.MM.YYYY")}</td>
                    </tr>
                );
            });
        }
        return null;
    }

    renderLeagueSelectOptions = () => {
        return this.props.leagues.map(league => {
            return (
                <option
                    value={league.id}
                    key={league.id}
                >
                    {league.name}
                </option>
            )
        })
    }

}

const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        leagues: state.leagues,
    }
};

export default connect(mapStateToProps, {getDogs, getLeagues})(Dogs);