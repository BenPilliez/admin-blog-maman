import React from "react"
import {connect} from "react-redux"
import {createPost, resetState, updatePost} from "../../../store/actions/postsActions"


const FormPost = (props) => {

}

const mapStateToProps = (state, ownProps) => {
    const post = state.request.data.find((item) => {
        return item.id === ownProps.postId
    })

    return{
        post: post,
        categories: state.categories.categories
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        create: (data) => dispatch(createPost(data)),
        update: (data,id) => dispatch(updatePost(data,id)),
        getCategories: () => dispatch(getCategories()),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost)
