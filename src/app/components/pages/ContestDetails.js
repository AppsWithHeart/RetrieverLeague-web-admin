/**
 * Created by uroszivaljevic on 11/5/17.
 */
import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import { getContest } from "../../actions/contests";

class ContestDetails extends React.Component {

    componentDidMount() {
        this.props.getContest(this.props.match.params.id);
    }

    render() {
        const { contest } = this.props;
        if (this.props.contest) {
            return (
                <div>
                    <h3>{contest.name}</h3>
                    <p>{contest.location}</p>
                    <p>{contest.date}</p>
                    <h4>Tasks</h4>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Max score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderTasks()}
                        </tbody>
                    </Table>
                </div>
            );
        }
        return null;
    }

    renderTasks() {
        return this.props.contest.tasks.map(task => {
            return (
                <tr>
                    <td>{task.name}</td>
                    <td>{task.maximumScore}</td>
                </tr>
            )
        })
    }
}

const mapStateToProps = state => {
    return {
        contest: state.contests.selectedContest,
    };
}

export default connect(mapStateToProps, { getContest })(ContestDetails);