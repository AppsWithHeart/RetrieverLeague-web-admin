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
    Button,
    Alert
} from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import Datetime from "react-datetime";

import { getDogs, addDog } from "../../actions/dogs";
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
                leagueId: 0,
            }
        }
    }

    componentDidMount() {
        this.props.getDogs();
        this.props.getLeagues();
    }

    render() {

        const { dog } = this.state;

        return (
            <Row>
                <Col md={8}>
                    {this.renderLoadingIndicator()}
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
                                onChange={(e) => this.setState({dog: { ...dog, name: e.target.value }})}
                            />
                            <ControlLabel>Breed</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Breed"
                                value={this.state.dog.breed}
                                onChange={(e) => this.setState({dog: { ...dog, breed: e.target.value }})}
                            />
                            <ControlLabel>Owner Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Owner Name"
                                value={this.state.dog.ownerName}
                                onChange={(e) => this.setState({dog: { ...dog, ownerName: e.target.value }})}
                            />
                            <ControlLabel>Date of birth</ControlLabel>
                            <Datetime
                                inputProps={{disabled: true}}
                                onChange={(m) => this.setState({dog: { ...dog, dateOfBirth: m.format() }})}
                            />
                            <ControlLabel>League</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                value={this.state.dog.leagueId}
                                onChange={(e) => this.setState({dog: { ...dog, leagueId: e.target.value }})}
                            >
                                <option key={0} value={0}>Select a league</option>
                                {this.renderLeagueSelectOptions()}
                            </FormControl>
                        </FormGroup>
                    </form>
                    <Button
                        bsStyle="success"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
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

    renderLoadingIndicator = () => {
        if (this.props.isLoadingDogs) {
            return (
                <Alert bsStyle="info">
                    Loading...
                </Alert>
            )
        }
    }

    onSubmit = async () => {
        if (this.state.dog.leagueId !== 0) {
            try {
                await this.props.addDog(this.state.dog);
            } catch (error) {
                alert("Unable to add dog.")
            }
        } else {
            alert("Please select league.");
        }
    }

}

const mapStateToProps = state => {
    return {
        isLoadingDogs: state.dogs.isLoading,
        dogs: state.dogs.dogs,
        leagues: state.leagues.leagues,
    }
};

export default connect(
    mapStateToProps,
    {
        getDogs,
        getLeagues,
        addDog
    })(Dogs);