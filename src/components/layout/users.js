import React from "react"
import ReuseTable from "../custom/table"
import {connect} from "react-redux"
import {CircularProgress} from "@material-ui/core"
import {usersList} from "../../store/actions/usersActions"
import moment from "moment"
import "moment/locale/fr"

class Users extends React.Component {

    componentDidMount() {
        this.props.loadUsers()
    }

    state = {
        query: null
    }

    handleQuery = (value) => {
         return this.setState({
            query: value
        })
    }

    render() {
        const {loading, list, loadError, pagination} = this.props
        const options = [
            {
                label: "id",
            },
            {
                label: "Roles",
                data: (row) => row.ROLES.join(',')
            },
            {
                label: 'Photo',
                data: (row) => row.avatar
            },
            {
                label: 'email'
            },
            {
                label: "Membre depuis",
                data: (row) => moment(row.createdAt).format('LL')
            }
        ]

        const usersList = loading ? <CircularProgress color={"primary"}/> : <ReuseTable pagination={pagination} handleQuery={this.handleQuery} options={options} rows={list}/>

        return (
            <div>
                {loadError ? <span>{loadError}</span> : usersList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        list: state.users.usersList,
        pagination: state.users.pagination,
        loadError: state.users.loadError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch(usersList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
