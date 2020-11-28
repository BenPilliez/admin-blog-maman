import React from "react"
import {connect} from "react-redux"
import {listCategories} from "../../store/actions/categoriesActions"
import ReuseTable from "../custom/table"
import {CircularProgress} from "@material-ui/core"

class Categories extends React.Component {

    state = {
        query: {}
    }

    handleQuery = (value) => {
        return this.setState({query:value})
    }

    componentDidMount() {
        this.props.loadCategories()
    }

    render() {

        const {loading, list, loadError, pagination} = this.props
        console.log(this.state)

        const options = [
            {
                label: 'Nom Categorie',
                data: (row) => row.name
            }
        ]
        const usersList = loading ? <CircularProgress color={"primary"}/> :
            <ReuseTable handleQuery={this.handleQuery} pagination={pagination} options={options} rows={list}/>
        return (
            <div>
                {loadError ? <span>{loadError}</span> : usersList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.categories.loading,
        list: state.categories.categories,
        pagination: state.categories.pagination,
        loadError: state.categories.loadError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(listCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
