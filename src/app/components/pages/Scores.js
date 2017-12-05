/**
 * Created by uroszivaljevic on 12/3/17.
 */
import React from "react";
import { connect } from "react-redux";
import {
    Alert,
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
import { getTasks, postDogTasks } from "../../actions/tasks";

class Scores extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDogId: null,
            selectedContestId: null,
            tasks: {},
        };
    }

    componentDidMount() {
        this.props.getDogs();
        this.props.getContests();
    }

    render() {
        return (
            <Row>
                {this.renderLoadingIndicator()}
                <form>
                    <FormGroup
                    >
                        <Col md={5}>
                            <ControlLabel>Dog</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                onChange={(e) => this.setState({ selectedDogId: e.target.value })}
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
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTasks()}
                        </tbody>
                    </Table>
                </Col>
                <Button
                    bsSize="large"
                    bsStyle="success"
                    onClick={this.onSubmit}
                >
                    Submit
                </Button>
            </Row>
        );
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
                        <td>
                            <input
                                type="number"
                                min="0"
                                max={task.maximumScore.toString()}
                                onChange={(e) => this.setState({tasks: { ...this.state.tasks, [task.id]: e.target.value }})}
                            />
                            <span>/{task.maximumScore}</span>
                            </td>
                    </tr>
                );
            });
        }
        return null;
    }

    onSetDogAndContest = () => {
        this.setState({
            tasks: {},
        });
        this.props.getTasks(this.state.selectedContestId);
    }

    onSubmit = () => {
        const { tasks, selectedDogId, selectedContestId } = this.state;
        const dogTasks = Object.keys(tasks).map(taskKey => {
           return {
               taskId: taskKey,
               score: tasks[taskKey],
               dogId: selectedDogId,
           };
        });
        const result = dogTasks.reduce((prevScore, dogTask) => {
            return prevScore + parseInt(dogTask.score);
        }, 0);
        console.log(result);
        this.props.postDogTasks(dogTasks, selectedContestId, selectedDogId, result);
    }

}

const mapStateToProps = state => {
    return {
        dogs: state.dogs.dogs,
        contests: state.contests.contests,
        tasks: state.tasks.tasks,
        isLoading: state.dogs.isLoading || state.contests.isLoading || state.tasks.isLoading,
    }
}

export default connect(
    mapStateToProps,
    { getDogs, getContests, getTasks, postDogTasks }
)(Scores);