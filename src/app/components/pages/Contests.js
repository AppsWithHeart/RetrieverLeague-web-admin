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
    Alert,
    Form,
} from "react-bootstrap";

import { getContests, addContest } from "../../actions/contests";


class Contests extends React.Component {


    constructor() {
        super();
        this.state = {
            contest: {
                name: "",
                location: "",
                date: "",
                tasks: [],
            },
            task: {
                name: "",
                maximumScore: "",
            }
        }
    }

    componentDidMount() {
        this.props.getContests();
    }

    render() {

        const { contest, task } = this.state;

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
                                onChange={(e) => this.setState({ contest: { ...contest, name: e.target.value } })}
                            />
                            <ControlLabel>Location</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Location"
                                value={this.state.contest.location}
                                onChange={(e) => this.setState({ contest: { ...contest, location: e.target.value } })}
                            />
                            <ControlLabel>Date</ControlLabel>
                            <Datetime
                                inputProps={{ disabled: true }}
                                onChange={(m) => this.setState({ contest: { ...contest, date: m.format() } })}
                            />
                            <ControlLabel>Tasks</ControlLabel>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Max Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderSelectedTasks()}
                                </tbody>
                            </Table>
                        </FormGroup>
                        <Form componentClass="fieldset" inline>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                value={this.state.task.name}
                                onChange={(e) => this.setState({ task: { ...task, name: e.target.value } })}
                            />
                            {'      '}
                            <ControlLabel>Maximum Score</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Maximum Score"
                                value={this.state.task.maximumScore}
                                onChange={(e) => this.setState({ task: { ...task, maximumScore: e.target.value } })}
                            />
                            {'     '}
                            <Button
                                bsStyle="success"
                                onClick={this.onAddTask}
                            >
                                +
                            </Button>
                        </Form>
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
                    <tr
                        key={contest.id}
                        onClick={() => {
                            this.onContestClick(contest.id)
                        }}
                    >
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

    renderSelectedTasks = () => {
        return this.state.contest.tasks.map((task, index) => {
            return (
                <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.maximumScore}</td>
                </tr>
            )
        })
    }

    onSubmit = () => {
        this.props.addContest(this.state.contest);
    }

    onContestClick = (contestId) => {
        this.props.history.push("/contests/" + contestId);
    }

    onAddTask = () => {
        const { task, contest } = this.state;
        this.setState({
            contest: {
                ...contest,
                tasks: [ ...contest.tasks, task ]
            },
            task: {
                name: "",
                maximumScore: "",
            }
        });
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