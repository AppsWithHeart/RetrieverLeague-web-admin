/**
 * Created by uroszivaljevic on 12/3/17.
 */
import React from "react";
import { connect } from "react-redux";
import {
    Col,
    FormControl,
    Row,
    ControlLabel,
    FormGroup,
    Button,
    Table,
} from "react-bootstrap";

import { getDogs } from "../../actions/dogs";
import { getContests } from "../../actions/contests";
import { getTasks } from "../../actions/tasks";

class Scores extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDogId: null,
            selectedContestId: null,
        };
    }

    componentDidMount() {
        this.props.getDogs();
        this.props.getContests();
    }

    render() {
        return (
            <Row>
                <form>
                    <FormGroup
                    >
                        <Col md={5}>
                            <ControlLabel>Dog</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                            >
                                {this.renderDogSelectOptions()}
                            </FormControl>
                        </Col>
                        <Col md={5}>
                            <ControlLabel>Contest</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                onChange={(e) => this.setState({ selectedContestId: e.target.value })}
                            >
                                {this.renderContestSelectOptions()}
                            </FormControl>
                        </Col>
                    </FormGroup>
                </form>
                <Col md={2}>
                    <Button
                        bsSize="large"
                        bsStyle="success"
                        onClick={this.onSetDogAndContest}
                    >
                        Set
                    </Button>
                </Col>
                <Col md={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Maximum Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTasks()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }

    renderDogSelectOptions = () => {
        if (this.props.dogs) {
            return this.props.dogs.map(dog => {
                return (
                    <option
                        value={dog.id}
                        key={dog.id}
                    >
                        {dog.name}
                    </option>
                );
            });
        }
        return null;
    }

    renderContestSelectOptions = () => {
        if (this.props.contests) {
            return this.props.contests.map(contest => {
                return (
                    <option
                        value={contest.id}
                        key={contest.id}
                    >
                        {contest.name}
                    </option>
                );
            });
        }
        return null;
    }

    renderTasks = () => {
        if (this.props.tasks) {
            return this.props.tasks.map(task => {
                return (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.maximumScore}</td>
                    </tr>
                );
            });
        }
        return null;
    }

    onSetDogAndContest = () => {
        this.props.getTasks(this.state.selectedContestId);
    }

}

const mapStateToProps = state => {
    return {
        dogs: state.dogs.dogs,
        contests: state.contests.contests,
        tasks: state.tasks.tasks,
    }
}

export default connect(
    mapStateToProps,
    { getDogs, getContests, getTasks }
)(Scores);