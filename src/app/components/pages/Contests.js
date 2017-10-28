/**
 * Created by uroszivaljevic on 9/30/17.
 */

import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Datetime from "react-datetime";
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

import { getContests, addContest } from "../../actions/contests";


class Contests extends React.Component {


    constructor() {
        super();
        this.state = {
            contest: {
                name: "",
                location: "",
                date: ""
            }
        }
    }

    componentDidMount() {
        this.props.getContests();
    }

    render() {

        const { contest } = this.state;

        return (
            <Row>
                <Col md={8}>
                    {this.renderLoadingIndicator()}
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderContestsData()}
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}>
                    <h3>Add a contest</h3>
                    <form>
                        <FormGroup
                        >
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                value={this.state.contest.name}
                                onChange={(e) => this.setState({contest: { ...contest, name: e.target.value }})}
                            />
                            <ControlLabel>Location</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Location"
                                value={this.state.contest.location}
                                onChange={(e) => this.setState({contest: { ...contest, location: e.target.value }})}
                            />
                            <ControlLabel>Date</ControlLabel>
                            <Datetime
                                inputProps={{disabled: true}}
                                onChange={(m) => this.setState({contest: { ...contest, date: m.format() }})}
                            />
                            <ControlLabel>League</ControlLabel>
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

    renderContestsData = () => {
        if (this.props.contests) {
            return this.props.contests.map(contest => {
                return (
                    <tr key={contest.id}>
                        <td>{contest.name}</td>
                        <td>{contest.location}</td>
                        <td>{moment(contest.date).format("DD.MM.YYYY")}</td>
                    </tr>
                );
            });
        }
        return null;
    }

    renderLoadingIndicator = () => {
        if (this.props.isLoading) {
            return (
                <Alert bsStyle="info">
                    Loading...
                </Alert>
            )
        }
    }

    onSubmit = () => {
        this.props.addContest(this.state.contest);
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.contests.isLoading,
        contests: state.contests.contests
    };
}

export default connect(
    mapStateToProps,
    {
        getContests,
        addContest
    })
(Contests);